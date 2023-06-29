const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let borrowingSchema = Schema(
  {
    member: {
      type: mongoose.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    book: {
      type: mongoose.Types.ObjectId,
      ref: "BookCopy",
      required: true,
    },
    borrow_date: {
      type: Date,
    },
    expired_date: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Approve", "Pending", "Canceled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = model("Borrowing", borrowingSchema);
