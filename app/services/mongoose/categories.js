const Categories = require("../../api/v1/categories/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllCategories = async (req) => {
  const { keyword, limit = 10, page = 1 } = req.query;
  let condition = {};

  if (keyword) {
    condition = { ...condition, name: { $regex: keyword, $options: "i" } };
  }

  const result = await Categories.find(condition)
    .limit(limit)
    .skip(limit * (page - 1));

  const count = await Categories.countDocuments(condition);

  return { data: result, pages: Math.ceil(count / limit), total: count };
};

const getOneCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`ID ${id} is not found`);

  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;

  const check = await Categories.findOne({
    name,
  });

  if (check) throw new BadRequestError("Cannot duplicated Category Name");

  const result = await Categories.create({
    name,
  });
  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const check = await Categories.findOne({
    name,
    _id: { $ne: id },
  });

  if (check) throw new NotFoundError("Cannot duplicated Category Name");

  const result = await Categories.findByIdAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`ID ${id} Category is not found`);

  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;
  const result = await Categories.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`ID ${id} Category is not found`);

  await result.deleteOne();

  return result;
};

const checkingCategories = async (id) => {
  const result = await Categories.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`ID ${id} Category is not found`);

  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingCategories,
};
