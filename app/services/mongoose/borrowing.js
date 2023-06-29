const Borrow = require("../../api/v1/borrowiing/model");
const { BadRequestError, NotFoundError } = require("../../errors");
const { checkingBook } = require("./books");

const getAllBorrow = async (req) => {
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

const borrowBook = async (req) => {
  const { book } = req.body;

  const borrow_date = new Date();
  const expired_date = new Date();
  expired_date.setDate(expired_date.getDate() + 7);

  // console.log(currentDate);

  const checkBorrowMember = await Borrow.find({ member: req.member.id });

  const pendingData = checkBorrowMember.filter(
    (item) => item.status === "Pending"
  );

  if (pendingData.length === 0) {
    const result = await Borrow.create({
      member: req.member.id,
      book,
      borrow_date: borrow_date,
      expired_date: expired_date,
    });
    return result;
  } else {
    if (pendingData[0].status === "Pending") {
      throw new BadRequestError("Cannot borrow another book");
    }
  }
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
  getAllBorrow,
  approveBorrow,
  borrowBook,
  cancelBorrow,
};
