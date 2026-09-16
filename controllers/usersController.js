const bcrypt = require("bcryptjs");
const db = require("../db/queries");

function getSignUpForm(req, res) {
  res.render("signUp");
}

async function postSignUpForm(req, res, next) {
    console.log("hii");
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.postSignUpForm(req.body, hashedPassword);
    res.redirect("/users/login");
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getSignUpForm,
  postSignUpForm,
};
