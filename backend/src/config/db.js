const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('[✅ MongoDB] Connected successfully');
  } catch (err) {
    console.error('[❌ MongoDB] Connection error:', err.message);
    process.exit(1); // Exit app if DB fails
  }
};

module.exports = connectDB;
