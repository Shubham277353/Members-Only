const { Router } = require("express");
const authController = require("../controllers/authController");
const validator = require("../middlewares/validation");
const passport = require("passport");
const authRouter = Router();

authRouter.get("/sign-up", authController.getSignUpForm);
authRouter.post(
  "/sign-up",
  validator.signUpValidator,
  authController.postSignUpForm,
);
authRouter.get("/login", authController.getLoginForm);
authRouter.post(
  "/login",
  validator.loginValidator,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureMessage: true,
  }),
);
authRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
});

authRouter.get("/membership", authController.getMembershipPage);
authRouter.post(
  "/membership",
  validator.membershipValidator,
  authController.postMembershipPage,
);

module.exports = authRouter;