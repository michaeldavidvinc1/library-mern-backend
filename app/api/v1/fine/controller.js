const { StatusCodes } = require("http-status-codes");
const { getAllFine, paying } = require("../../../services/mongoose/fine");

const index = async (req, res, next) => {
  try {
    const result = await getAllFine(req);
    res.status(StatusCodes.OK).json({
      data: { result: result.data, pages: result.pages, total: result.total },
    });
  } catch (err) {
    next(err);
  }
};

const pay = async (req, res, next) => {
  try {
    const result = await paying(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  index,
  pay,
};
