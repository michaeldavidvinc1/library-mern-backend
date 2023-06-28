const {
  signupMember,
  activateMember,
} = require("../../../services/mongoose/member");
const { StatusCodes } = require("http-status-codes");

const signup = async (req, res, next) => {
  try {
    const result = await signupMember(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const activateAccount = async (req, res, next) => {
  try {
    const result = await activateMember(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  activateAccount,
};
