const { StatusCodes } = require("http-status-codes");
const { createUsers } = require("../../../services/mongoose/user");

const create = async (req, res, next) => {
  try {
    const result = await createUsers(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
};
