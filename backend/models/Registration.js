const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    contact: { type: String, required: true },
    city: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 1 },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Registration", registrationSchema);
