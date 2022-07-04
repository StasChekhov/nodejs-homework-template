const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { validation, isValidId } = require("../../middlewares");

const { addSchema, updateFavoriteSchema } = require("../../models/contacts");

router.get("/", ctrlWrapper(ctrl.getAllContact));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", validation(addSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById));

router.put(
 "/:contactId",
 isValidId,
 validation(addSchema),
 ctrlWrapper(ctrl.updateById)
);

router.patch(
 "/:contactId/favorite",
 isValidId,
 validation(updateFavoriteSchema),
 ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
