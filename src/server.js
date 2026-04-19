const app = require('./app');
const connectDB = require('./config/db');
const env = require('./config/env');
const { initSocket } = require('./socket');
const os = require('os'); // استيراد موديل os

// دالة لجلب الـ IP الداخلي للجهاز
const getLocalExternalIP = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // بنبحث عن IPv4 ويكون مش internal (عشان نتخطى 127.0.0.1)
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
};

const startServer = async () => {
  await connectDB();
  const server = app.listen(env.PORT, '0.0.0.0', () => { // '0.0.0.0' بتسمح للجهاز يستقبل اتصالات من بره الـ localhost
    const ip = getLocalExternalIP();
    console.log(`🚀 Server running on:`);
    console.log(`   🏠 Local:   http://localhost:${env.PORT}`);
    console.log(`   🌐 Network: http://${ip}:${env.PORT}`);
  });
  initSocket(server);
};

startServer();