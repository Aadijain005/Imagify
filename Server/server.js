import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import UserRouter from "./routes/UserRoutes.js";
import imageRouter from "./routes/ImageRoutes.js";

const PORT = process.env.PORT || 4000;
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/user", UserRouter);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => res.send("API working"));

// Connect DB and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Failed to connect to DB:", error);
    process.exit(1); // exit process if DB fails
  }
};

startServer();
