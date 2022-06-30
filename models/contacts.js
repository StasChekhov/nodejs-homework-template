const fs = require("fs").promises;
const path = require("path");
var ObjectID = require("bson-objectid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
 try {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
 } catch (error) {
  console.error(error);
 }
};

const getContactById = async (contactId) => {
 const contact = await listContacts();
 const result = contact.find((item) => item.id === contactId);
 return result;
};

const removeContact = async (contactId) => {
 const contact = await listContacts();
 const idx = contact.findIndex((item) => item.id === contactId);
 if (idx === -1) {
  return null;
 }
 const [removeContact] = contact.splice(idx, 1);
 await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
 return removeContact;
};

const addContact = async (name, email, phone) => {
 const contact = await listContacts();
 const newContact = { id: ObjectID(), name, email, phone };
 contact.push(newContact);
 await fs.writeFile(contactsPath, JSON.stringify(contact));
 return newContact;
};

const updateContact = async (contactId, body) => {
 try {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
   return null;
  }
  contacts[index] = { ...body, contactId };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
 } catch (error) {
  console.error(error);
 }
};

module.exports = {
 listContacts,
 getContactById,
 removeContact,
 addContact,
 updateContact,
};
