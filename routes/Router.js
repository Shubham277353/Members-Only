const {Router} = require("express");
const { getSignUpForm } = require("../controllers/usersController");
const userRouter = Router();

userRouter.get("/users/sign-up", getSignUpForm );

module.exports = userRouter;

