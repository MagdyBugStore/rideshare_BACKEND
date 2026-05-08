/**
 * Shared caching layer for all Google Maps API proxy calls.
 *
 * Why LRU + TTL instead of plain Map:
 *   - TTL prevents stale data from serving outdated places / routes.
 *   - LRU cap keeps memory bounded even under heavy traffic.
 *
 * Scaling note: this is process-local. If you ever run multiple server
 * instances, replace LruCache with a Redis adapter that exposes the same
 * get / set interface — no changes to the service files needed.
 */

// ── LRU cache with per-entry TTL ──────────────────────────────────────────────

class LruCache {
  /**
   * @param {object} opts
   * @param {number} opts.maxSize   Max entries before LRU eviction (default 1000)
   * @param {number} opts.ttlMs    Time-to-live in ms for every entry
   */
  constructor({ maxSize = 1000, ttlMs }) {
    this._maxSize = maxSize;
    this._ttlMs = ttlMs;
    this._map = new Map(); // insertion-order Map → oldest entry is first
  }

  /** Returns the cached value, or undefined on miss / expiry. */
  get(key) {
    const entry = this._map.get(key);
    if (!entry) return undefined;

    if (entry.expiresAt < Date.now()) {
      this._map.delete(key);
      return undefined;
    }

    // LRU: re-insert to move to the "most-recently-used" tail
    this._map.delete(key);
    this._map.set(key, entry);
    return entry.value;
  }

  /** Stores value under key, evicting the LRU entry if at capacity. */
  set(key, value) {
    if (this._map.size >= this._maxSize && !this._map.has(key)) {
      // Evict oldest (first) entry
      this._map.delete(this._map.keys().next().value);
    }
    // Delete first so re-insert always goes to the tail
    this._map.delete(key);
    this._map.set(key, { value, expiresAt: Date.now() + this._ttlMs });
  }

  get size() { return this._map.size; }

  clear() { this._map.clear(); }
}

// ── Key normalisation helpers ─────────────────────────────────────────────────

const _MIN = 60_000;
const _HOUR = 60 * _MIN;
const _DAY = 24 * _HOUR;

/**
 * Normalise a free-text search query so that minor variations map to the
 * same cache key.
 *
 * Handles:
 *   - Leading / trailing / duplicate whitespace
 *   - ASCII case folding
 *   - Arabic tatweel (ـ) removal
 *   - Arabic alef-family normalisation (أإآٱ → ا)
 *   - Arabic tashkeel (diacritics) removal
 *   - Arabic taa-marbuta (ة → ه) and alef-maqsura (ى → ي) normalisation
 */
function normalizeQuery(text) {
  if (!text) return '';
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/ـ/g, '')                          // tatweel
    .replace(/[أإآٱ]/g, 'ا')                         // alef variants
    .replace(/[ً-ٟؐ-ؚ]/g, '')    // tashkeel / diacritics
    .replace(/ة/g, 'ه')                              // taa marbuta
    .replace(/ى/g, 'ي');                             // alef maqsura
}

/**
 * Snap a lat/lng pair to a coordinate grid so that nearby points share
 * a cache key.
 *
 * precision = 4 → ~11 m grid  (reverse geocode, route origins/dests)
 * precision = 2 → ~1.1 km grid (autocomplete location bias, nearby search)
 */
function snapLatLng(lat, lng, precision = 4) {
  const f = 10 ** precision;
  return `${Math.round(lat * f) / f},${Math.round(lng * f) / f}`;
}

// ── Pre-configured cache instances ────────────────────────────────────────────

/** Autocomplete suggestions — moderate TTL, coarse location grid */
const autocompleteCache = new LruCache({ maxSize: 2000, ttlMs: 999 * _DAY });

/** Place details by place_id — very stable data, long TTL */
const placeDetailsCache = new LruCache({ maxSize: 2000, ttlMs: 999 * _DAY });

/** Nearby search results — location-sensitive, short TTL */
const nearbyCache = new LruCache({ maxSize: 300, ttlMs: 999 * _DAY });

/** Reverse geocode — stable results, long TTL, fine grid */
const reverseCache = new LruCache({ maxSize: 2000, ttlMs: 999 * _DAY });

/** Route polylines — semi-stable, medium TTL */
const polylineCache = new LruCache({ maxSize: 500, ttlMs: 999 * _DAY });

// /** Autocomplete suggestions — moderate TTL, coarse location grid */
// const autocompleteCache = new LruCache({ maxSize: 2000,  ttlMs: 24 * _HOUR });

// /** Place details by place_id — very stable data, long TTL */
// const placeDetailsCache = new LruCache({ maxSize: 2000, ttlMs: 24 * _HOUR });

// /** Nearby search results — location-sensitive, short TTL */
// const nearbyCache       = new LruCache({ maxSize: 300,  ttlMs: 10 * _MIN });

// /** Reverse geocode — stable results, long TTL, fine grid */
// const reverseCache      = new LruCache({ maxSize: 2000, ttlMs: 24 * _HOUR });

// /** Route polylines — semi-stable, medium TTL */
// const polylineCache     = new LruCache({ maxSize: 500,  ttlMs: 10 * _MIN });

// ── Key builders ──────────────────────────────────────────────────────────────

/**
 * @param {string} input   Raw user query
 * @param {number|null} lat  Nullable location bias latitude
 * @param {number|null} lng  Nullable location bias longitude
 */
function autocompleteKey(input, lat, lng) {
  const loc = (lat != null && lng != null) ? `@${snapLatLng(lat, lng, 2)}` : '';
  return `ac:${normalizeQuery(input)}${loc}`;
}

/** @param {string} placeId */
const placeDetailsKey = (placeId) => `pd:${placeId}`;

/**
 * @param {number} lat
 * @param {number} lng
 * @param {number} radius  in metres
 * @param {number} limit
 */
const nearbyKey = (lat, lng, radius, limit) =>
  `nb:${snapLatLng(lat, lng, 2)}:r${radius}:l${limit}`;

/**
 * @param {number} lat
 * @param {number} lng
 */
const reverseKey = (lat, lng) => `rv:${snapLatLng(lat, lng, 4)}`;

/**
 * @param {number} originLat
 * @param {number} originLng
 * @param {number} destLat
 * @param {number} destLng
 */
const polylineKey = (originLat, originLng, destLat, destLng) =>
  `pl:${snapLatLng(originLat, originLng, 4)}->${snapLatLng(destLat, destLng, 4)}`;

// ── Exports ───────────────────────────────────────────────────────────────────

module.exports = {
  LruCache,
  normalizeQuery,
  snapLatLng,
  // cache instances
  autocompleteCache,
  placeDetailsCache,
  nearbyCache,
  reverseCache,
  polylineCache,
  // key builders
  autocompleteKey,
  placeDetailsKey,
  nearbyKey,
  reverseKey,
  polylineKey,
  // TTL constants (re-exported for tests / config)
  TTL: { MIN: _MIN, HOUR: _HOUR, DAY: _DAY },
};
