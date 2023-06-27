const { StatusCodes } = require("http-status-codes");
const {
  getAllBooks,
  createBook,
  getOneBook,
  updateBook,
  deleteBook,
} = require("../../../services/mongoose/books");

const index = async (req, res, next) => {
  try {
    const result = await getAllBooks(req);

    res.status(StatusCodes.OK).json({
      data: { book: result.book, pages: result.pages, total: result.total },
    });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneBook(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createBook(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateBook(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteBook(req);
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
  find,
  update,
  destroy,
};
