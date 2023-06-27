const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 3,
      maxlength: 50,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    publisher: {
      type: String,
      required: [true, "Publisher is required"],
    },
    quantity: {
      type: Number,
      default: 1,
    },
    publication_date: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
