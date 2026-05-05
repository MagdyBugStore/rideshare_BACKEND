const Notification = require('./notification.model');
const { sendSuccess } = require('../../utils/response.util');

const getNotifications = async (req, res, next) => {
  try {
    const items = await Notification.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();
    sendSuccess(res, items);
  } catch (err) { next(err); }
};

const markAllRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { userId: req.user.id, isRead: false },
      { $set: { isRead: true } }
    );
    sendSuccess(res, null, 'Marked all as read');
  } catch (err) { next(err); }
};

module.exports = { getNotifications, markAllRead };
