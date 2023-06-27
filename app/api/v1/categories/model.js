const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = Schema(
  {
    name: {
      type: String,
      minlength: [3, "Minimum character name length is 3 characters"],
      maxLength: [20, "Maximum character name length is 20 characters"],
      required: [true, "Categories name is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema);
