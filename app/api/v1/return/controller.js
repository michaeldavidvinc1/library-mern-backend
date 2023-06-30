const { StatusCodes } = require("http-status-codes");
const {
  returnBook,
  getAllReturn,
} = require("../../../services/mongoose/return");

const index = async (req, res, next) => {
  try {
    const result = await getAllReturn(req);
    res.status(StatusCodes.OK).json({
      data: { return: result.data, pages: result.pages, total: result.total },
    });
  } catch (err) {
    next(err);
  }
};

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
  index,
};
