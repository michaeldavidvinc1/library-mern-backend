const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let fineSchema = Schema(
  {
    return: {
      type: mongoose.Types.ObjectId,
      ref: "Return",
      required: true,
    },
    member: {
      type: mongoose.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Paid Off", "No Paid Off"],
      default: "No Paid Off",
    },
  },
  { timestamps: true }
);

module.exports = model("Fine", fineSchema);
