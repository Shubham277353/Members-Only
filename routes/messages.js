const { Router } = require("express");
const validator = require("../middlewares/validation");
const messageRouter = Router();
const messageController = require("../controllers/messageController");
const ensureAuthenticated = require("../middlewares/loginCheck");
const ensureMembership = require("../middlewares/memberCheck");
const validationHandler = require("../middlewares/handleValidationErrors");

messageRouter.get(
  "/create_new",
  ensureAuthenticated,
  ensureMembership,
  messageController.getNewMessageForm,
);
messageRouter.post(
  "/create_new",
  ensureAuthenticated,
  ensureMembership,
  validator.newFormValidator,
  validationHandler,
  messageController.postNewMessageForm,
);

module.exports = messageRouter;
