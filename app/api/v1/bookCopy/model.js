const mongoose = require("mongoose");

const BookCopySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    book: {
      type: mongoose.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Not Available"],
      default: "Available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookCopy", BookCopySchema);
