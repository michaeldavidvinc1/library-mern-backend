const Users = require("../../api/v1/user/model");
const { BadRequestError } = require("../../errors");

const createUsers = async (req) => {
  const { name, email, confirmPassword, password } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password dan Konfirmasi password tidak cocok");
  }

  const result = await Users.create({
    name,
    email,
    password,
  });

  return result;
};

const getAllUsers = async (req) => {
  const result = await Users.find();

  return result;
};

module.exports = { createUsers, getAllUsers };
