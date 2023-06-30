const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let borrowingSchema = Schema(
  {
    member: {
      type: mongoose.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    book_copy: {
      type: mongoose.Types.ObjectId,
      ref: "Bookcopy",
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
