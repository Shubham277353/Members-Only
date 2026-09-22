const { body } = require("express-validator");

const formValidator = [
    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("First Name can't be empty"),

    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Last Name can't be empty"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email can't be empty")
        .isEmail()
        .withMessage("Invalid email"),

    body("password")
        .notEmpty()
        .withMessage("Password can't be empty")
        .isLength({ min: 8, max: 100 })
        .withMessage("Password must be at least 8 and max 100 characters")
];

module.exports = formValidator;