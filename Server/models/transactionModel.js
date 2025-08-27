import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: { type: String, required: true },
    amount: { type: Number, required: true },
    credits: { type: Number, required: true },
    payment: { type: Boolean, default: false },
    orderId: { type: String },
    paymentId: { type: String },
    // Removed "date" since timestamps already handles createdAt/updatedAt
  },
  { timestamps: true }
);

const Transaction =
  mongoose.models["Transaction"] ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
