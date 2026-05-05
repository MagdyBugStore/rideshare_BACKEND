const https = require('https');
const { RecentSearch, SavedPlace } = require('./place.model');
const {
  autocompleteCache, placeDetailsCache, nearbyCache, reverseCache,
  autocompleteKey, placeDetailsKey, nearbyKey, reverseKey,
} = require('../../utils/api-cache.util');

// ── Google API helper ─────────────────────────────────────────────────

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let raw = '';
      res.on('data', (chunk) => { raw += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(raw)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function googleKey() {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) throw new Error('GOOGLE_MAPS_API_KEY not configured');
  return key;
}

// ── Autocomplete ──────────────────────────────────────────────────────
// Cache: 1 h TTL, coarse 1.1 km location grid, Arabic-normalised query key.

const autocomplete = async (input, lat, lng) => {
  const cacheKey = autocompleteKey(input, lat, lng);
  const hit = autocompleteCache.get(cacheKey);
  if (hit) return hit;

  const params = new URLSearchParams({
    input,
    key:      googleKey(),
    language: 'ar',
  });
  if (lat && lng) {
    params.set('location', `${lat},${lng}`);
    params.set('radius', '50000');
  }

  const data = await httpsGet(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`
  );

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    throw new Error(`Google Autocomplete: ${data.status}`);
  }

  const result = (data.predictions ?? []).map((p) => ({
    placeId:       p.place_id,
    mainText:      p.structured_formatting?.main_text      ?? p.description,
    secondaryText: p.structured_formatting?.secondary_text ?? '',
  }));

  autocompleteCache.set(cacheKey, result);
  return result;
};

// ── Place details ─────────────────────────────────────────────────────
// Cache: 24 h TTL, keyed by stable place_id.

const getDetails = async (placeId) => {
  const cacheKey = placeDetailsKey(placeId);
  const hit = placeDetailsCache.get(cacheKey);
  if (hit) return hit;

  const params = new URLSearchParams({
    place_id: placeId,
    fields:   'geometry,formatted_address,name',
    key:      googleKey(),
    language: 'ar',
  });

  const data = await httpsGet(
    `https://maps.googleapis.com/maps/api/place/details/json?${params}`
  );

  if (data.status !== 'OK') throw new Error(`Google Place Details: ${data.status}`);

  const loc = data.result.geometry?.location;
  const result = {
    lat:     loc?.lat,
    lng:     loc?.lng,
    address: data.result.formatted_address ?? data.result.name,
  };

  placeDetailsCache.set(cacheKey, result);
  return result;
};

// ── Nearby search ─────────────────────────────────────────────────────
// Cache: 10 min TTL, 1.1 km coordinate grid.

const nearbySearch = async (lat, lng, radius = 1500, limit = 10) => {
  const cacheKey = nearbyKey(lat, lng, radius, limit);
  const hit = nearbyCache.get(cacheKey);
  if (hit) return hit;

  const params = new URLSearchParams({
    location: `${lat},${lng}`,
    radius:   String(radius),
    key:      googleKey(),
    language: 'ar',
  });

  const data = await httpsGet(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`
  );

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    throw new Error(`Google Nearby Search: ${data.status}`);
  }

  const result = (data.results ?? []).slice(0, limit).map((p) => ({
    placeId:       p.place_id,
    mainText:      p.name,
    secondaryText: p.vicinity ?? '',
    lat:           p.geometry?.location?.lat,
    lng:           p.geometry?.location?.lng,
  }));

  nearbyCache.set(cacheKey, result);
  return result;
};

// ── Reverse geocode ───────────────────────────────────────────────────
// Cache: 24 h TTL, ~11 m coordinate grid.

const reverseGeocode = async (lat, lng) => {
  const cacheKey = reverseKey(lat, lng);
  const hit = reverseCache.get(cacheKey);
  if (hit) return hit;

  const params = new URLSearchParams({
    latlng:      `${lat},${lng}`,
    key:         googleKey(),
    language:    'ar',
    result_type: 'street_address|route|neighborhood|locality',
  });

  const data = await httpsGet(
    `https://maps.googleapis.com/maps/api/geocode/json?${params}`
  );

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    throw new Error(`Google Geocode: ${data.status}`);
  }

  const result = { address: data.results?.[0]?.formatted_address ?? '' };
  reverseCache.set(cacheKey, result);
  return result;
};

// ── Recent searches (DB) ──────────────────────────────────────────────

const getRecentSearches = (userId) =>
  RecentSearch.find({ userId }).sort({ createdAt: -1 }).limit(10).lean();

const saveRecentSearch = async (userId, { placeId, mainText, secondaryText = '' }) => {
  await RecentSearch.findOneAndUpdate(
    { userId, placeId },
    { userId, placeId, mainText, secondaryText },
    { upsert: true, new: true, timestamps: true }
  );
  // Trim to 10 most recent
  const overflow = await RecentSearch.find({ userId })
    .sort({ createdAt: -1 })
    .skip(10)
    .select('_id');
  if (overflow.length) {
    await RecentSearch.deleteMany({ _id: { $in: overflow.map((r) => r._id) } });
  }
};

// ── Saved places (DB) ─────────────────────────────────────────────────

const getSavedPlaces = (userId) => SavedPlace.find({ userId }).lean();

const saveSavedPlace = (userId, { type, mainText, secondaryText = '', lat, lng }) =>
  SavedPlace.findOneAndUpdate(
    { userId, type },
    { userId, type, mainText, secondaryText, lat, lng },
    { upsert: true, new: true }
  );

module.exports = {
  autocomplete,
  getDetails,
  nearbySearch,
  reverseGeocode,
  getRecentSearches,
  saveRecentSearch,
  getSavedPlaces,
  saveSavedPlace,
};
