const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const userSchema = Schema(
 {
  password: {
   type: String,
   required: [true, "Password is required"],
  },
  email: {
   type: String,
   required: [true, "Email is required"],
   unique: true,
   match: emailRegexp,
  },
  subscription: {
   type: String,
   enum: ["starter", "pro", "business"],
   default: "starter",
  },
  token: {
   type: String,
   default: null,
  },
  avatarURL: {
   type: String,
   required: true,
  },
 },
 { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const signup = Joi.object({
 password: Joi.string().required(),
 email: Joi.string().pattern(emailRegexp).required(),
 subscription: Joi.string().required(),
 token: Joi.string().required(),
});

const login = Joi.object({
 password: Joi.string().required(),
 email: Joi.string().pattern(emailRegexp).required(),
 subscription: Joi.string().required(),
 token: Joi.string().required(),
});

const schemas = {
 signup,
 login,
};

module.exports = {
 User,
 schemas,
};
