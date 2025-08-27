import express from "express";
import generateImage from "../controllers/ImageController.js";
import userAuth from "../middlewares/Auth.js";

const router = express.Router();

// POST /api/image/generate-image
router.post("/generate-image", userAuth, generateImage);

export default router;
