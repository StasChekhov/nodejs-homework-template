const { isValidObjectId } = require("mongoose");
const { createError } = require("../helpers");

const isValidId = (req, res, next) => {
 const { id } = req.params;
 const result = isValidObjectId(id);
 if (!result) {
  next(createError(404, "Invalid id"));
  return;
 }
 next();
};

module.exports = isValidId;
