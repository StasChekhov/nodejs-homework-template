const { Contact } = require("../../models/contacts");
const createError = require("../../helpers/createError");

const removeById = async (req, res, next) => {
 const { contactId } = req.params;
 const result = await Contact.findByIdAndRemove(contactId);
 if (!result) {
  throw createError(404, `Not found ${contactId}`);
 }
 res.json({ message: "Contact deleted" });
};

module.exports = removeById;
