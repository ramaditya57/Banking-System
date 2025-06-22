require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/account');
const adminRoutes = require('./routes/admin');
const customerRoutes = require('./routes/customer');
const officialRoutes = require('./routes/official');
const loanRoutes = require('./routes/loan');

const errorHandler = require('./middlewares/errorHandler');
const { logger } = require('./middlewares/logger');

const app = express(); // ✅ define app before use()

// ✅ Middleware setup
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error(err));

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/admin', adminRoutes);
// app.use('/api/customer', customerRoutes);
app.use('/api/official', officialRoutes);
app.use('/api/customer', require('./routes/customer'));
app.use('/api/loan', loanRoutes);

// ✅ Global Error Handler
app.use(errorHandler);

// ✅ Start Server
app.listen(process.env.PORT || 5000, () => {
  logger.info(`🚀 Server started on http://localhost:${process.env.PORT}`);
});
