const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const { validationResult, matchedData } = require("express-validator");
const { use } = require("passport");

function getSignUpForm(req, res) {
  res.render("signUp");
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

function getLoginForm(req, res) {
  const message = req.session.messages?.[0];
  res.render("login",{message});
}

function getMembershipPage(req, res) {
  res.render("membership");
}

async function postMembershipPage(req, res){
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
