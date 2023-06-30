const Return = require("../../../app/api/v1/return/model");
const Borrow = require("../../../app/api/v1/borrowiing/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllReturn = async (req) => {
  const { limit = 10, page = 1, startDate, endDate } = req.query;
  let condition = {};

  if (startDate && endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59);
    condition = {
      ...condition,
      date: {
        $gte: start,
        $lt: end,
      },
    };
  }

  const result = await Borrow.find(condition)
    .limit(limit)
    .skip(limit * (page - 1));

  const count = await Borrow.countDocuments();

  return { data: result, pages: Math.ceil(count / limit), total: count };
};

const returnBook = async (req) => {
  const { id } = req.params;
  const checkBorrow = await Borrow.findOne({ _id: id });

  let status = "On Time";

  const return_date = new Date();

  if (return_date > checkBorrow.expired_date) {
    status = "Late";
  }

  const result = await Return.create({
    borrow: id,
    return_date: return_date,
    status: status,
  });

  return result;
};

const approveBorrow = async (req) => {
  const { id } = req.params;
  const checkBorrow = await Borrow.findOne({
    _id: id,
  });

  if (checkBorrow.status === "Pending") {
    checkBorrow.status = "Approve";
  }
  await checkBorrow.save();

  return checkBorrow;
};

const cancelBorrow = async (req) => {
  const { id } = req.params;
  const checkBorrow = await Borrow.findOne({
    _id: id,
  });

  if (checkBorrow.status === "Pending") {
    checkBorrow.status = "Canceled";
  }
  await checkBorrow.save();

  return checkBorrow;
};

module.exports = {
  approveBorrow,
  returnBook,
  cancelBorrow,
};
