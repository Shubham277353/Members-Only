const { body } = require("express-validator");
const db = require("../db/queries");


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
        .withMessage("Invalid email")
        .custom( async value => {
            const user = await db.getUsersByEmail(value);

            if(user){
                throw new Error("Email already in use");
            }
        }),

    body("password")
        .notEmpty()
        .withMessage("Password can't be empty")
        .isLength({ min: 8, max: 100 })
        .withMessage("Password must be at least 8 and max 100 characters"),

    body("confirmPassword").custom( (value, {req}) => {
        return value === req.body.password;
    }).withMessage("password does not match.")
];

module.exports = formValidator;