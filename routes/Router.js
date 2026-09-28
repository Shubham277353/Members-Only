const {Router} = require("express");
const userController = require("../controllers/usersController");
const userRouter = Router();

userRouter.get("/home", userController.getHomePage);

module.exports = userRouter;

