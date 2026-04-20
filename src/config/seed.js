// src/config/seed.js
const mongoose = require('mongoose');
const User = require('../modules/user/user.model');
const Captain = require('../modules/captain/captain.model');

const seedTestCaptain = async () => {
  try {
    // تأكد من وجود مستخدم اختباري
    let testUser = await User.findOne({ email: 'test@wasalni.com' });
    if (!testUser) {
      testUser = await User.create({
        name: 'كابتن تجريبي',
        email: 'test@wasalni.com',
        role: 'captain',
        googleId: 'test-google-id-' + Date.now(),
      });
    }

    let testCaptain = await Captain.findOne({ userId: testUser._id });
    if (!testCaptain) {
      testCaptain = await Captain.create({
        userId: testUser._id,
        vehicleType: 'car',
        vehicleModel: 'تويوتا كورولا',
        plateNumber: 'تجربة ' + Date.now().toString().slice(-5),
        status: 'approved',
        isOnline: true,
        location: { type: 'Point', coordinates: [31.2357, 30.0444] },
      });
    } else {
      // تأكد من أن الكابتن موافق عليه ومتصل
      if (testCaptain.status !== 'approved') {
        testCaptain.status = 'approved';
        await testCaptain.save();
      }
      testCaptain.isOnline = true;
      await testCaptain.save();
    }
    
    // حفظ معرف الكابتن في متغير بيئة مؤقت لاستخدامه في mock
    process.env.TEST_CAPTAIN_ID = testCaptain._id.toString();
    
    return testCaptain;
  } catch (error) {
    console.error('❌ Error seeding test captain:', error);
  }
};

module.exports = seedTestCaptain;