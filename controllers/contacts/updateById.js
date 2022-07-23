const { Contact } = require("../../models/contact");
const createError = require("../../helpers/createError");

const updateById = async (req, res) => {
 const { contactId } = req.params;
 const result = await Contact.findByIdAndUpdate(contactId, req.body, {
  new: true,
 });
 if (!result) {
  throw createError(404, `Not found ${contactId}`);
 }
 res.status(200).json(result);
};

module.exports = updateById;
