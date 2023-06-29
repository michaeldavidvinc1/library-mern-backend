const { StatusCodes } = require("http-status-codes");
const {
  getAllBorrow,
  borrowBook,
  approveBorrow,
  cancelBorrow,
} = require("../../../services/mongoose/borrowing");

const index = async (req, res, next) => {
  try {
    const result = await getAllBorrow(req);
    res.status(StatusCodes.OK).json({
      data: { borrow: result.data, pages: result.pages, total: result.total },
    });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await borrowBook(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const approve = async (req, res, next) => {
  try {
    const result = await approveBorrow(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const canceled = async (req, res, next) => {
  try {
    const result = await cancelBorrow(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  index,
  create,
  approve,
  canceled,
};
