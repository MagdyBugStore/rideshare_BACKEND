const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./modules/auth/auth.routes');
const captainRoutes = require('./modules/captain/captain.routes');
const tripRoutes = require('./modules/trip/trip.routes');
const reviewRoutes = require('./modules/review/review.routes');
const adminRoutes = require('./modules/admin/admin.routes');
const errorHandler = require('./middlewares/error.middleware');
const passengerRoutes = require('./modules/passenger/passenger.routes');
const fareRoutes = require('./modules/fare/fare.routes');
const seedRoutes = require('./modules/seed/seed.routes');
const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/captain', captainRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/passenger', passengerRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/captain', captainRoutes);
app.use('/api/fares', fareRoutes);
app.use('/api/seed', seedRoutes);

app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

app.use(errorHandler);

module.exports = app;