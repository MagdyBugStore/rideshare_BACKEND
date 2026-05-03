const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error.middleware');

// Routes
const authRoutes      = require('./modules/auth/auth.routes');
const captainRoutes   = require('./modules/captain/captain.routes');
const tripRoutes      = require('./modules/trip/trip.routes');
const reviewRoutes    = require('./modules/review/review.routes');
const adminRoutes     = require('./modules/admin/admin.routes');
const passengerRoutes = require('./modules/passenger/passenger.routes');
const fareRoutes         = require('./modules/fare/fare.routes');
const notificationRoutes = require('./modules/notification/notification.routes');
const seedRoutes         = require('./modules/seed/seed.routes');

const app = express();

// ── Global middlewares ────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') ?? '*',
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

// ── Routes ────────────────────────────────────────────────────────────
app.use('/api/auth',      authRoutes);
app.use('/api/captain',   captainRoutes);
app.use('/api/trips',     tripRoutes);
app.use('/api/reviews',   reviewRoutes);
app.use('/api/admin',     adminRoutes);
app.use('/api/passenger', passengerRoutes);
app.use('/api/fares',         fareRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/seed',          seedRoutes);

app.get('/health', (_req, res) => res.json({ status: 'OK', timestamp: new Date().toISOString() }));

// ── Error handler (must be last) ──────────────────────────────────────
app.use(errorHandler);

module.exports = app;
