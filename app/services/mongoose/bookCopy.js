const BookCopy = require("../../api/v1/bookCopy/model");
const { NotFoundError, BadRequestError } = require("../../errors");

const changeStatusBook = async (id) => {
  const checkBook = await BookCopy.findOne({
    _id: id,
  });

  if (checkBook.status === "Available") {
    checkBook.status = "Not Available";
  } else {
    checkBook.status = "Available";
  }

  await checkBook.save();

  return checkBook;
};

const getAllBookCopy = async (req) => {
  const { id } = req.params;
  const result = await BookCopy.find({
    book: id,
    status: "Available",
  }).populate({
    path: "book",
    select: "_id title",
  });
  return result;
};

module.exports = {
  changeStatusBook,
  getAllBookCopy,
};
