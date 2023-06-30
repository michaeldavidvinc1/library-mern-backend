const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let returnSchema = Schema(
  {
    borrow: {
      type: mongoose.Types.ObjectId,
      ref: "Borrowing",
      required: true,
    },
    return_date: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Late", "On Time"],
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = model("Return", returnSchema);
