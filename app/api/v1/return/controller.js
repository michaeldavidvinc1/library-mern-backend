const { StatusCodes } = require("http-status-codes");
const { returnBook } = require("../../../services/mongoose/return");

const backBook = async (req, res, next) => {
  try {
    const result = await returnBook(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  backBook,
};
