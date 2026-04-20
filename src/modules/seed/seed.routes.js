const express = require('express');
const router = express.Router();
const controller = require('./seed.controller');

// يمكن الوصول بدون مصادقة للسهولة في التطوير، أو يمكن إضافة middleware إذا أردت
router.get('/', controller.runSeeder);

module.exports = router;