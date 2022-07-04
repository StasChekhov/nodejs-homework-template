const { Contact } = require("../../models/contacts");

const getAllContact = async (req, res) => {
 const result = await Contact.find({}, "-createdAt -updatedAt");
 res.json(result);
};

module.exports = getAllContact;
