const { Router } = require("express");
const authController = require("../controllers/authController");
const formValidator = require("../middlewares/validation");
const passport = require("passport");
const authRouter = Router();

authRouter.get("/sign-up", authController.getSignUpForm );
authRouter.post("/sign-up", formValidator, authController.postSignUpForm );
authRouter.get("/login", authController.getLoginForm );
authRouter.post("/login", formValidator,
    passport.authenticate("local",{
        successRedirect: "/",
        failureRedirect: "/",
        failureMessage: true,
    })
);
authRouter.get("/membership", authController.getMembershipPage )

module.exports = authRouter;