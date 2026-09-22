const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const { validationResult, matchedData } = require("express-validator");

function getSignUpForm(req, res) {
  res.render("signUp");
}

async function postSignUpForm(req, res, next) {

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  const data = matchedData(req);
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      await db.postSignUpForm(data, hashedPassword);
      res.redirect("/users/login");
    } catch (error) {
      return next(error);
    }
  }
  
function getLoginForm(req, res) {
    console.log("hii login form");
    res.render("login");
}

module.exports = {
  getSignUpForm,
  postSignUpForm,
  getLoginForm,
};
