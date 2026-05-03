const admin = require('firebase-admin');
const logger = require('./logger');

let _initialized = false;

const initFirebase = () => {
  if (_initialized) return;

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!serviceAccountJson) {
    logger.warn('[Firebase] FIREBASE_SERVICE_ACCOUNT_JSON not set — push notifications disabled');
    return;
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountJson);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    _initialized = true;
    logger.info('[Firebase] Admin SDK initialized');
  } catch (err) {
    logger.error('[Firebase] Failed to initialize Admin SDK', err);
  }
};

const getMessaging = () => {
  if (!_initialized) return null;
  return admin.messaging();
};

module.exports = { initFirebase, getMessaging };
