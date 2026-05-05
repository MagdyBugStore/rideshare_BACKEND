const https = require('https');
const { polylineCache, polylineKey } = require('../../utils/api-cache.util');

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

// ── Route polyline ────────────────────────────────────────────────────
// Cache: 10 min TTL, ~11 m coordinate grid on origin + destination.

const getPolyline = async (originLat, originLng, destLat, destLng) => {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) throw new Error('GOOGLE_MAPS_API_KEY not configured');

  const cacheKey = polylineKey(originLat, originLng, destLat, destLng);
  const hit = polylineCache.get(cacheKey);
  if (hit) return hit;

  const params = new URLSearchParams({
    origin:      `${originLat},${originLng}`,
    destination: `${destLat},${destLng}`,
    key,
    language: 'ar',
  });

  const data = await httpsGet(
    `https://maps.googleapis.com/maps/api/directions/json?${params}`
  );

  if (data.status !== 'OK') throw new Error(`Google Directions: ${data.status}`);

  const route = data.routes?.[0];
  const leg   = route?.legs?.[0];

  const result = {
    encodedPolyline: route?.overview_polyline?.points ?? '',
    distanceKm:      leg ? Math.round((leg.distance.value / 1000) * 100) / 100 : 0,
    durationMins:    leg ? Math.ceil(leg.duration.value / 60) : 0,
  };

  polylineCache.set(cacheKey, result);
  return result;
};

module.exports = { getPolyline };
