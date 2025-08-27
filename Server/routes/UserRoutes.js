import express from "express";
import {
  registerUser,
  loginUser,
  userCredits,
  paymentRazorpay,
  verifyRazorpay,
} from "../controllers/UserController.js";
import userAuth from "../middlewares/Auth.js";

const userRouter = express.Router();

// Public routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Protected routes
userRouter.get("/credits", userAuth, userCredits);
userRouter.post("/payment/razor", userAuth, paymentRazorpay);
userRouter.post("/payment/verify", userAuth, verifyRazorpay);

export default userRouter;
