const app = require('./app');
const connectDB = require('./config/db');
const env = require('./config/env');
const { initSocket } = require('./socket');

const startServer = async () => {
  await connectDB();
  const server = app.listen(env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
  });
  initSocket(server);
};

startServer();