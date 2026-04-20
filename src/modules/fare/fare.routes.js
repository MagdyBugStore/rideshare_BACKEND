// src/modules/fare/fare.routes.js
const express = require('express');
const router = express.Router();
const controller = require('./fare.controller');

// لا يحتاج مصادقة لأنه بيانات عامة
router.get('/', controller.getFares);

module.exports = router;