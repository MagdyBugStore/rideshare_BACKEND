const User = require('../user/user.model');
const { isUserOnline } = require('../../socket');
const { getMessaging } = require('../../config/firebase');
const logger = require('../../config/logger');

const MAX_FCM_TOKENS = 5;

// Register or refresh a device token for a user.
const registerToken = async (userId, token) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  // Deduplicate
  if (user.fcmTokens.includes(token)) return;

  user.fcmTokens.push(token);
  // FIFO: keep latest MAX_FCM_TOKENS
  if (user.fcmTokens.length > MAX_FCM_TOKENS) {
    user.fcmTokens = user.fcmTokens.slice(-MAX_FCM_TOKENS);
  }
  await user.save();
};

const removeToken = async (userId, token) => {
  await User.findByIdAndUpdate(userId, { $pull: { fcmTokens: token } });
};

// Smart notify: socket if online, FCM push if offline.
const notify = async (userId, { title, body, data = {} }) => {
  const userIdStr = userId.toString();

  if (isUserOnline(userIdStr)) {
    // User has an active socket — they'll get the realtime event. Skip FCM.
    return;
  }

  const messaging = getMessaging();
  if (!messaging) return;

  const user = await User.findById(userId).select('fcmTokens');
  if (!user || user.fcmTokens.length === 0) return;

  const message = {
    notification: { title, body },
    data: Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, String(v)])
    ),
    android: {
      priority: 'high',
      notification: { sound: 'default', channelId: 'wasalni_trips' },
    },
    apns: {
      payload: { aps: { sound: 'default', badge: 1 } },
    },
    tokens: user.fcmTokens,
  };

  try {
    const res = await messaging.sendEachForMulticast(message);
    // Remove stale tokens (invalid / unregistered)
    const staleToks = res.responses
      .map((r, i) => (!r.success && _isTokenError(r.error?.code) ? user.fcmTokens[i] : null))
      .filter(Boolean);
    if (staleToks.length) {
      await User.findByIdAndUpdate(userId, { $pull: { fcmTokens: { $in: staleToks } } });
    }
    logger.info(`[Notify] ${userId} pushed: ${res.successCount}/${user.fcmTokens.length}`);
  } catch (err) {
    logger.error('[Notify] FCM error', err);
  }
};

const _isTokenError = (code) =>
  ['messaging/invalid-registration-token',
   'messaging/registration-token-not-registered'].includes(code);

module.exports = { registerToken, removeToken, notify };
