const Member = require("../../../app/api/v1/member/model");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../../errors");
const { createTokenMember, createJWT } = require("../../utils");
const { otpMail } = require("../mail");

const signupMember = async (req) => {
  const { name, email, password, address, phoneNumber } = req.body;

  // jika email dan status tidak aktif
  let result = await Member.findOne({
    email,
    status: "tidak aktif",
  });

  if (result) {
    result.name = name;
    result.email = email;
    result.password = password;
    result.address = address;
    result.phoneNumber = phoneNumber;
    result.otp = Math.floor(Math.random() * 9999);
    await result.save();
  } else {
    result = await Member.create({
      name,
      email,
      password,
      address,
      phoneNumber,
      otp: Math.floor(Math.random() * 9999),
    });
  }
  await otpMail(email, result);

  delete result._doc.password;
  delete result._doc.otp;

  return result;
};

const activateMember = async (req) => {
  const { otp, email } = req.body;
  const check = await Member.findOne({
    email,
  });

  if (!check) throw new NotFoundError("Partisipan belum terdaftar");

  if (check && check.otp !== otp) throw new BadRequestError("Kode otp salah");

  const result = await Member.findByIdAndUpdate(
    check._id,
    {
      status: "aktif",
    },
    { new: true }
  );

  delete result._doc.password;

  return result;
};

module.exports = {
  signupMember,
  activateMember,
};
