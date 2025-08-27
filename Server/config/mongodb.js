import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/imagify`, {});

    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

// Log once (not inside function to avoid duplicate listeners)
mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
});

export default connectDB;
