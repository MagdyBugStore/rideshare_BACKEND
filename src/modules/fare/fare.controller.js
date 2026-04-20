// src/modules/fare/fare.controller.js
const { sendSuccess } = require('../../utils/response.util');

// تعريفات الأسعار الافتراضية (يمكن تخزينها في قاعدة البيانات لاحقًا)
const DEFAULT_FARES = {
  car: {
    baseFare: 10,
    perKmFare: 7,
    currency: 'ج.م',
    description: 'سيارة'
  },
  motorcycle: {
    baseFare: 8,
    perKmFare: 5,
    currency: 'ج.م',
    description: 'دراجة نارية'
  },
  tukutuk: {
    baseFare: 7,
    perKmFare: 4,
    currency: 'ج.م',
    description: 'توك توك'
  },
  alt_tukutuk: {
    baseFare: 6,
    perKmFare: 4,
    currency: 'ج.م',
    description: 'بديل توك توك'
  }
};

const getFares = async (req, res, next) => {
  try {
    // في المستقبل يمكن جلب الأسعار من قاعدة البيانات
    sendSuccess(res, DEFAULT_FARES, 'Fares retrieved successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFares
};