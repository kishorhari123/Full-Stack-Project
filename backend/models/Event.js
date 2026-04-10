const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true, trim: true },
    seats: { type: Number, required: true, min: 1 },
    icon: { type: String, default: "🎪" },
    category: { type: String, default: "Other" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Event", eventSchema);
