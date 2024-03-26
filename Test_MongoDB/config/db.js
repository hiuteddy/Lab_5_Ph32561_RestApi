const mongoose = require('mongoose');

// Chuỗi kết nối MongoDB
const local = 'mongodb://127.0.0.1:27017/Mydatabase';

// Kết nối với MongoDB
const connect = async () => {
  try {
    await mongoose.connect(local, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

module.exports = { connect };
