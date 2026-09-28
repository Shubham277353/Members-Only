const { Router } = require("express");
const usersController = require("../controllers/usersController");
const formValidator = require("../middlewares/validation");
const authRouter = Router();

authRouter.get("/sign-up", usersController.getSignUpForm );
authRouter.get("/login", usersController.getLoginForm );
authRouter.post("/sign-up", formValidator, usersController.postSignUpForm );
authRouter.get("/membership", usersController.getMembershipPage )

module.exports = authRouter;