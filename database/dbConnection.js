const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.5opdt.mongodb.net/orebo?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};
module.exports = dbConnection;
