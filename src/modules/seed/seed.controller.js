const User = require('../user/user.model');
const Captain = require('../captain/captain.model');
const Trip = require('../trip/trip.model');
const { sendSuccess, sendError } = require('../../utils/response.util');

const MOCK_CAPTAINS_COUNT = 15;
const MOCK_TRIPS_COUNT = 5;
const MOCK_DOMAIN = 'wasalni.dev'; // لتمييز البيانات التجريبية

const runSeeder = async (req, res, next) => {
  if (process.env.NODE_ENV !== 'development') {
    return sendError(res, 'Seeder is only allowed in development environment', 403);
  }

  try {
    // 1️⃣ حذف البيانات التجريبية القديمة
    const mockUsers = await User.find({ email: { $regex: MOCK_DOMAIN, $options: 'i' } });
    const mockUserIds = mockUsers.map(u => u._id);
    
    if (mockUserIds.length > 0) {
      // حذف الرحلات المرتبطة بهؤلاء المستخدمين (كركاب أو كباتن)
      const mockCaptains = await Captain.find({ userId: { $in: mockUserIds } });
      const mockCaptainIds = mockCaptains.map(c => c._id);
      
      await Trip.deleteMany({
        $or: [
          { passengerId: { $in: mockUserIds } },
          { captainId: { $in: mockCaptainIds } }
        ]
      });
      
      // حذف الكباتن
      await Captain.deleteMany({ userId: { $in: mockUserIds } });
      
      // حذف المستخدمين
      await User.deleteMany({ _id: { $in: mockUserIds } });
      
      console.log(`🧹 Cleaned up ${mockUserIds.length} mock users and their data.`);
    }

    let createdUsers = 0;
    let createdCaptains = 0;
    let createdTrips = 0;

    // 2️⃣ إنشاء الكباتن
    const captainIds = [];
    for (let i = 0; i < MOCK_CAPTAINS_COUNT; i++) {
      const email = `mockcaptain${i}@${MOCK_DOMAIN}`;
      
      const user = await User.create({
        name: `كابتن تجريبي ${i + 1}`,
        email,
        role: 'captain',
        googleId: `mock-google-${i}-${Date.now()}`,
      });
      createdUsers++;

      const vehicleTypes = ['car', 'motorcycle', 'tukutuk', 'alt_tukutuk'];
      const colors = ['أبيض', 'أسود', 'فضي', 'أحمر', 'أزرق'];
      const models = ['تويوتا كورولا', 'هيونداي i10', 'كيا سبورتاج', 'شيفروليه أوبترا'];
      const plates = ['أ ب ج', 'د هـ و', 'ز ح ط', 'ي ك ل'];

      const baseLat = 30.1385919;
      const baseLng = 31.7839276;
      const randomLat = baseLat + (Math.random() - 0.5) * 0.1;
      const randomLng = baseLng + (Math.random() - 0.5) * 0.1;

      const captain = await Captain.create({
        userId: user._id,
        vehicleType: vehicleTypes[i % vehicleTypes.length],
        vehicleModel: models[i % models.length],
        plateNumber: `${plates[i % plates.length]} ${i + 100}`,
        status: 'approved',
        isOnline: true,
        location: {
          type: 'Point',
          coordinates: [randomLng, randomLat]
        },
        rating: 4.0 + Math.random() * 1.0,
        totalTrips: Math.floor(Math.random() * 500),
        documents: {
          nationalId: 'mock-url',
          driverLicense: 'mock-url',
          vehicleLicense: 'mock-url'
        }
      });
      createdCaptains++;
      captainIds.push(captain._id);
    }

    // 3️⃣ إنشاء راكب تجريبي
    const passengerEmail = `passenger@${MOCK_DOMAIN}`;
    let passenger = await User.findOne({ email: passengerEmail });
    if (!passenger) {
      passenger = await User.create({
        name: 'راكب تجريبي',
        email: passengerEmail,
        role: 'passenger',
        googleId: `mock-passenger-${Date.now()}`,
      });
      createdUsers++;
    }

    // 4️⃣ إنشاء رحلات تجريبية
    const statuses = ['pending', 'active', 'ended', 'cancelled'];
    for (let i = 0; i < MOCK_TRIPS_COUNT; i++) {
      const randomCaptainId = captainIds[Math.floor(Math.random() * captainIds.length)];
      const captain = await Captain.findById(randomCaptainId);
      const status = statuses[i % statuses.length];
      
      const startLat = 30.0444 + (Math.random() - 0.5) * 0.05;
      const startLng = 31.2357 + (Math.random() - 0.5) * 0.05;
      const distance = status === 'ended' ? (1 + Math.random() * 10) : 0;
      
      const tripData = {
        passengerId: passenger._id,
        captainId: captain._id,
        status: status,
        startLocation: {
          lat: startLat,
          lng: startLng,
          address: `عنوان وهمي ${i+1}`
        },
        distanceKm: distance,
        totalFare: distance > 0 ? Math.round(10 + (distance - 1) * 7) : 0,
        passengerConfirmedStart: status === 'active' || status === 'ended',
        captainConfirmedStart: status === 'active' || status === 'ended',
        startedAt: status === 'active' || status === 'ended' ? new Date(Date.now() - 1000 * 60 * 5) : undefined,
        endedAt: status === 'ended' ? new Date() : undefined,
        endRequestedBy: status === 'active' ? (Math.random() > 0.5 ? 'passenger' : 'captain') : undefined,
      };
      
      await Trip.create(tripData);
      createdTrips++;
    }

    sendSuccess(res, {
      message: `Seeding completed. Created ${createdUsers} users, ${createdCaptains} captains, and ${createdTrips} trips.`,
      summary: {
        captains: MOCK_CAPTAINS_COUNT,
        trips: MOCK_TRIPS_COUNT
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { runSeeder };