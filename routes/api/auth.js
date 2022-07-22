const express = require("express");

const ctrl = require("../../controllers/users");

const { ctrlWrapper } = require("../../helpers");

const { validation, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(schemas.signup), ctrlWrapper(ctrl.signup));
router.post("/login", validation(schemas.login), ctrlWrapper(ctrl.login));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));
router.patch(
 "/avatars",
 authenticate,
 upload.single("avatar"),
 ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
