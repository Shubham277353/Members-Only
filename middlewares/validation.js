const { body } = require("express-validator");
const db = require("../db/queries");

const signUpValidator = [
  body("firstName").trim().notEmpty().withMessage("First Name can't be empty").escape(),

  body("lastName").trim().notEmpty().withMessage("Last Name can't be empty").escape(),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email can't be empty")
    .isEmail()
    .withMessage("Invalid email")
    .escape()
    .custom(async (value) => {
      const user = await db.getUsersByEmail(value);

      if (user) {
        throw new Error("Email already in use");
      }
    }),

  body("password")
    .notEmpty()
    .withMessage("Password can't be empty")
    .isLength({ min: 8, max: 100 })
    .withMessage("Password must be at least 8 and max 100 characters"),

  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("password does not match.")
,
];

const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email can't be empty")
    .isEmail()
    .withMessage("Invalid email")
    .escape(),

  body("password")
    .notEmpty()
    .withMessage("Password can't be empty")
    .isLength({ min: 8, max: 100 })
    .withMessage("Password must be at least 8 and max 100 characters")
 ,
];

const membershipValidator = [
  body("passcode")
    .trim()
    .notEmpty()
    .withMessage("Passcode can't be empty")
    .isAlpha()
    .withMessage("Incorrect passcode :)")
    .escape(),
];

const newFormValidator = [
body('title')
    .trim()
    .notEmpty()
    .withMessage("Please enter a valid title.")
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters long.'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage("Please enter a valid message.")
    .isLength({ min: 20, max: 1000 })
    .withMessage('Message must be at least 20 and maximum 1000 characters long.'),
];

module.exports = {
  signUpValidator,
  loginValidator,
  membershipValidator,
  newFormValidator,
};
