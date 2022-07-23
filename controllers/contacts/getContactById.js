const { Contact } = require("../../models/contact");
const createError = require("../../helpers/createError");

const getContactById = async (req, res) => {
 const { contactId } = req.params;
 const result = await Contact.findById(contactId);
 if (!result) {
  throw createError(404, `Not found ${contactId}`);
 }
 res.json(result);
};

module.exports = getContactById;
