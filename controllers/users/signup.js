const { User } = require("../../models/user");

const bcrypt = require("bcryptjs");

const { createError, sendMail } = require("../../helpers");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const signup = async (req, res) => {
 const { email, password } = req.body;
 const user = await User.findOne({ email });
 if (user) {
  throw createError(409, "Email is already used by another user");
 }

 const hashPassword = await bcrypt.hash(password, 10);
 const avatarURL = gravatar.url(email);
 const verificationToken = uuidv4();
 const result = await User.create({
  ...req.body,
  password: hashPassword,
  avatarURL,
  verificationToken,
 });
 const mail = {
  to: email,
  subject: "Підтвердження реєстрації",
  html: `<a target="_blank" href="localhost:3000/api/auth/verify/${verificationToken}"> Натисніть для підтвердження email</a>`,
 };
 await sendMail(mail);
 res.status(201).json({
  user: {
   email: result.email,
   password: result.password,
  },
 });
};

module.exports = signup;
