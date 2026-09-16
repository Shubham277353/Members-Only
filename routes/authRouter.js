const { Router } = require("express");
const usersController = require("../controllers/usersController");
const authRouter = Router();

authRouter.post("/sign-up", usersController.postSignUpForm );

module.exports = authRouter;