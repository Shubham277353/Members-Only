const { Router } = require("express");
const usersController = require("../controllers/usersController");
const authRouter = Router();

authRouter.get("/sign-up", usersController.getSignUpForm );
authRouter.get("/login", usersController.getLoginForm );
authRouter.post("/sign-up", usersController.postSignUpForm );

module.exports = authRouter;