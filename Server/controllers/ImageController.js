import axios from "axios";
import UserModel from "../models/UserModel.js";
import FormData from "form-data";
import mongoose from "mongoose";

const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.user?.id || req.user?._id; // ✅ safer user ID check

    if (!userId || !prompt) {
      return res.status(400).json({
        success: false,
        message: "Missing details",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.creditBalance <= 0) {
      return res.status(403).json({
        success: false,
        message: "No credit balance",
        creditBalance: user.creditBalance,
      });
    }

    // ✅ Prepare form data for ClipDrop API
    const formData = new FormData();
    formData.append("prompt", prompt);

    const response = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer", // ensures binary data
      }
    );

    // ✅ Convert binary to Base64
    const base64Image = Buffer.from(response.data).toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    // ✅ Deduct 1 credit and save
    user.creditBalance -= 1;
    await user.save();

    return res.json({
      success: true,
      message: "Image generated",
      resultImage,
      creditBalance: user.creditBalance,
      user,
    });
  } catch (error) {
    console.error("Image generation error:", error.response?.data || error);

    return res.status(500).json({
      success: false,
      message:
        error.response?.data?.message || "Server error during image generation",
    });
  }
};

export default generateImage;
