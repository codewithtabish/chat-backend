const mongoose = require('mongoose');

 async function connectToMongoDB() {
  try {
    // Connection URI

    // Connect to MongoDB
    await mongoose.connect(process.env.DB_URL);

    // Check for successful connection
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

connectToMongoDB()



// module.exports = connectToMongoDB;
