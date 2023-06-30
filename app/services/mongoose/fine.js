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

module.exports = {
  getAllFine,
  createFine,
};
