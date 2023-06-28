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

const signinMember = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const result = await Member.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  if (result.status === "tidak aktif") {
    throw new UnauthorizedError("Akun anda belum aktif");
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const token = createJWT({ payload: createTokenMember(result) });

  return { token: token, data: result };
};

module.exports = {
  signupMember,
  activateMember,
  signinMember,
};
