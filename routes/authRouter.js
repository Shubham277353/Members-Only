const { Router } = require("express");
const authController = require("../controllers/authController");
const validator = require("../middlewares/validation");
const passport = require("passport");
const authRouter = Router();

authRouter.get("/sign-up", authController.getSignUpForm );
authRouter.post("/sign-up", validator.signUpValidator, authController.postSignUpForm );
authRouter.get("/login", authController.getLoginForm );
authRouter.post("/login", validator.loginValidator,
    passport.authenticate("local",{
        successRedirect: "/",
        failureRedirect: "/",
        failureMessage: true,
    })
);

authRouter.get("/membership", authController.getMembershipPage )

module.exports = authRouter;