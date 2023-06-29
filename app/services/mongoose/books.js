const Books = require("../../api/v1/book/model");
const BookCopy = require("../../api/v1/bookCopy/model");
const { checkingCategories } = require("./categories");
const { NotFoundError, BadRequestError } = require("../../errors");
const { generateRandomString } = require("../../utils/generateRandomString");
const { checkingImage } = require("./image");

const getAllBooks = async (req) => {
  const { keyword, category, limit = 10, page = 1 } = req.query;
  let condition = {};

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: "i" } };
  }

  if (category) {
    condition = { ...condition, category: category };
  }

  const result = await Books.find(condition)
    .populate({ path: "category", select: "_id name" })
    .populate({
      path: "image",
      select: "_id name",
    })
    .limit(limit)
    .skip(limit * (page - 1));

  const count = await Books.countDocuments(condition);

  return { book: result, pages: Math.ceil(count / limit), total: count };
};

const getOneBook = async (req) => {
  const { id } = req.params;

  const result = await Books.findOne({
    _id: id,
  }).populate({ path: "category", select: "_id name" });

  if (!result) throw new NotFoundError(`ID ${id} is not found`);

  return result;
};

const createBook = async (req) => {
  const {
    title,
    image,
    category,
    author,
    publisher,
    quantity,
    publication_date,
  } = req.body;

  await checkingImage(image);
  await checkingCategories(category);

  const result = await Books.create({
    title,
    image,
    category,
    author,
    publisher,
    quantity,
    publication_date,
  });

  for (let i = 0; i < quantity; i++) {
    await BookCopy.create({
      slug: generateRandomString(10),
      book: result._id,
      status: "Available",
    });
  }

  return result;
};

const updateBook = async (req) => {
  const { id } = req.params;
  const { title, category, author, publisher, quantity, publication_date } =
    req.body;

  await checkingCategories(category);

  const result = await Books.findByIdAndUpdate(
    { _id: id },
    { title, category, author, publisher, quantity, publication_date },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`ID ${id} is not found`);

  return result;
};

const deleteBook = async (req) => {
  const { id } = req.params;
  const result = await Books.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`ID ${id} is not found`);

  await result.deleteOne();

  return result;
};

const checkingBook = async (id) => {
  const result = await Books.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`ID ${id} is not found`);

  return result;
};

module.exports = {
  getAllBooks,
  createBook,
  getOneBook,
  updateBook,
  deleteBook,
  checkingBook,
};
