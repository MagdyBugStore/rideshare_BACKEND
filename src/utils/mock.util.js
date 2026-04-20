const mongoose = require('mongoose');

// دالة لتوليد أرقام شبه عشوائية مع بذرة ثابتة
const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const generateMockDrivers = (centerLat, centerLng) => {
  const drivers = [];
  const names = [
    'أحمد محمد', 'محمود علي', 'كريم حسن', 'سامر عبدالله',
    'يوسف إبراهيم', 'إسلام خالد', 'محمد سعيد', 'عمر أحمد'
  ];
  const phones = [
    '01012345678', '01123456789', '01234567890', '01098765432',
    '01111223344', '01099887766', '01234561234', '01056789012'
  ];
  const plates = [
    'س ص ع 1234', 'ط ج ب 5678', 'أ ب ج 9876', 'م ن ح 5432',
    'ل أ ر 1122', 'ي ب ع 3344', 'س ط ر 5566', 'ع م ن 7788'
  ];
  const vehicleModels = [
    'هيونداي i10', 'تويوتا كورولا', 'كيا سبورتاج', 'شيفروليه أوبترا',
    'نيسان صني', 'مرسيدس E200', 'بي إم دبليو X5', 'سوزوكي سويفت'
  ];
  const vehicleColors = ['أبيض', 'أسود', 'فضي', 'أحمر', 'أزرق', 'رمادي', 'بيج'];
  const vehicleTypes = ['car', 'motorcycle', 'tukutuk', 'alt_tukutuk'];
  const statuses = ['available', 'busy', 'delivering'];

  for (let i = 0; i < 15; i++) {
    const seed = i * 42;
    const latOffset = (seededRandom(seed) - 0.5) * 0.04;
    const lngOffset = (seededRandom(seed + 1) - 0.5) * 0.04;

    const vehicleType = vehicleTypes[Math.floor(seededRandom(seed + 2) * vehicleTypes.length)];
    const status = statuses[Math.floor(seededRandom(seed + 3) * statuses.length)];
    const rating = 3.5 + seededRandom(seed + 4) * 1.5;
    const totalTrips = Math.floor(seededRandom(seed + 5) * 300) + 10;

    drivers.push({
      captain_id: new mongoose.Types.ObjectId().toString(), // ObjectId صالح
      name: names[i % names.length],
      phone: phones[i % phones.length],
      vehicle_type: vehicleType,
      vehicle_model: vehicleModels[i % vehicleModels.length],
      vehicle_color: vehicleColors[i % vehicleColors.length],
      plate_number: plates[i % plates.length],
      lat: centerLat + latOffset,
      lng: centerLng + lngOffset,
      status: status,
      rating: parseFloat(rating.toFixed(1)),
      total_trips: totalTrips,
    });
  }
  return drivers;
};

module.exports = { generateMockDrivers };