const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const { validationResult, matchedData } = require("express-validator");
const messageRouter = require("../routes/messages");

async function getSignUpForm(req, res) {
    const result = await db.getAllMessages();
  res.render("signUp", { users: result, authenticatedUser: req.user});
}

async function postSignUpForm(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const data = matchedData(req);
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    await db.postSignUpForm(data, hashedPassword);
    res.redirect("/auth/login");
  } catch (error) {
    return next(error);
  }
}

async function getLoginForm(req, res) {
  const message = req.session.messages?.[0];
  const result = await db.getAllMessages();
  res.render("login",{message, users: result, authenticatedUser: req.user});
}

async function getMembershipPage(req, res) {
  if(!req.isAuthenticated){
    return res.status(404).render("error", {message: "user not logged in!"});
  }
  const result = await db.getAllMessages();
  res.render("membership", { users: result, authenticatedUser: req.user});
}

async function postMembershipPage(req, res){
    if(!req.isAuthenticated){
    return res.status(404).render("error", {message: "user not logged in!"});
  }
  console.log("Hii member sigining up...");
  const passcode = req.body.passcode;
  const userId = req.user.id;
  console.log(req.user);
  if(passcode == process.env.MEMBERSHIP_PASSCODE){
    await db.setMembershipStatus(userId);
    res.redirect("/");
  } else{
    res.redirect("/error")
  }
}

module.exports = {
  getSignUpForm,
  postSignUpForm,
  getLoginForm,
  getMembershipPage,
  postMembershipPage,
};
