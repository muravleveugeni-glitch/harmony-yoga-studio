const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB подключен');
  } catch (err) {
    console.warn('⚠️ MongoDB не подключена:', err.message);
    console.warn('   API будет недоступен. Настройте MONGO_URI в .env');
  }
};

module.exports = connectDB;
