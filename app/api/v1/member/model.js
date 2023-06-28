const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const bcrypt = require("bcryptjs");

let memberSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name harus di isi"],
    },
    email: {
      type: String,
      required: [true, "Email harus di isi"],
    },
    password: {
      type: String,
      required: [true, "Password harus di isi"],
      minLength: 6,
    },
    address: {
      type: String,
      required: [true, "Address harus di isi"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Address harus di isi"],
    },
    status: {
      type: String,
      enum: ["aktif", "tidak aktif"],
      default: "tidak aktif",
    },
    otp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

memberSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

memberSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = model("Member", memberSchema);
