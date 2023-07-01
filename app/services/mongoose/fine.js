const Fine = require("../../api/v1/fine/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllFine = async (req) => {
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

  const result = await Fine.find(condition)
    .populate({ path: "member", select: "_id name" })
    .limit(limit)
    .skip(limit * (page - 1));

  const count = await Fine.countDocuments();

  return { data: result, pages: Math.ceil(count / limit), total: count };
};

const createFine = async (id, member, amount) => {
  const result = await Fine.create({
    return: id,
    member: member,
    amount: amount,
  });
  return result;
};

const paying = async (req) => {
  const { id } = req.params;

  const checkFine = await Fine.findOne({
    _id: id,
  });

  if (checkFine.status === "No Paid Off") {
    checkFine.status = "Paid Off";
  }
  await checkFine.save();

  return checkFine;
};

module.exports = {
  getAllFine,
  createFine,
  paying,
};
