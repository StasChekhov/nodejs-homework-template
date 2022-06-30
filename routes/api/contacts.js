const express = require("express");
const Joi = require("joi");
const router = express.Router();

const contacts = require("../../models/contacts");

const contactsAddSchema = Joi.object({
 name: Joi.string().required(),
 email: Joi.string().required(),
 number: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
 try {
  const result = await contacts.listContacts();
  res.json(result);
 } catch (error) {
  next(error);
 }
});

router.get("/:contactId", async (req, res, next) => {
 try {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
   const error = new Error("Not found");
   error.status = 404;
   throw error;
   // res.status(404).json({
   //  message: "Not Found",
   // });
   // return;
  }
  res.json(contact);
 } catch (error) {
  next(error);
 }
});

router.post("/", async (req, res, next) => {
 try {
  const { error } = contactsAddSchema.validate(req.body);
  if (error) {
   error.status = 400;
   error.message = "Missing required name field";
   throw error;
  }

  const { name, email, phone } = req.body;
  const newContact = await contacts.addContact(name, email, phone);
  res.status(201).json(newContact);
 } catch (error) {
  next(error);
 }
});

router.delete("/:contactId", async (req, res, next) => {
 try {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
   const error = new Error(`Contact ${contactId} not found`);
   error.status = 404;
   throw error;
  }
  res.json({
   message: "Contact deleted",
  });
 } catch (error) {
  next(error);
 }
});

router.put("/:contactId", async (req, res, next) => {
 try {
  const { error } = contactsAddSchema.validate(req.body);
  if (error) {
   error.status = 400;
   error.message = "Missing required name field";
   throw error;
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);

  if (!result) {
   const error = new Error(`Contact ${contactId} not found`);
   error.status = 404;
   throw error;
  }
  res.json(result);
 } catch (error) {
  next(error);
 }
});

module.exports = router;
