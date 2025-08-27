import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    creditBalance: { type: Number, default: 5 },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError in dev/hot reload
const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
