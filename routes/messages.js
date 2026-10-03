const {Router}  = require("express");
const messageRouter = Router();
const messageController = require("../controllers/messageController");

messageRouter.get("/create_new", messageController.getNewMessageForm);

module.exports = messageRouter;