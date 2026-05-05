const https = require('https');

// In-memory route cache (5 min TTL)
const _cache  = new Map();
const TTL_MS  = 5 * 60 * 1000;

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

const getPolyline = async (originLat, originLng, destLat, destLng) => {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) throw new Error('GOOGLE_MAPS_API_KEY not configured');

  const cacheKey = `${originLat},${originLng}->${destLat},${destLng}`;
  const hit = _cache.get(cacheKey);
  if (hit && hit.expiresAt > Date.now()) return hit.data;

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

  _cache.set(cacheKey, { data: result, expiresAt: Date.now() + TTL_MS });
  return result;
};

module.exports = { getPolyline };
