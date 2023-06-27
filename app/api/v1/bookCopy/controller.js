const { StatusCodes } = require("http-status-codes");
const { getAllBookCopy } = require("../../../services/mongoose/bookCopy");

const index = async (req, res, next) => {
  try {
    const result = await getAllBookCopy(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { index };
