const Return = require("../../../app/api/v1/return/model");
const Borrow = require("../../../app/api/v1/borrowiing/model");
const { BadRequestError, NotFoundError } = require("../../errors");
const { changeStatusBook } = require("./bookCopy");
const { createFine } = require("./fine");

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

  const result = await Return.find(condition)
    .populate({ path: "borrow", select: "_id expired_date" })
    .limit(limit)
    .skip(limit * (page - 1));

  const count = await Return.countDocuments();

  return { data: result, pages: Math.ceil(count / limit), total: count };
};

const returnBook = async (req) => {
  const { id } = req.params;
  const checkBorrow = await Borrow.findOne({ _id: id });

  await changeStatusBook(checkBorrow.book);
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

  const timeDifference = return_date - checkBorrow.expired_date;
  const daysPassed = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

  if (result.status === "Late") {
    await createFine(result._id, checkBorrow.member, daysPassed * 10000);
  }

  return result;
};

module.exports = {
  getAllReturn,
  returnBook,
};
