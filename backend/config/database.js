const mongoose = require('mongoose');

require('dotenv').config();
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI
    const conn = await mongoose.connect(mongoURI);
    
    console.log(`✅ MongoDB Connected successfully!!`);

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  }
};

module.exports = connectDB;