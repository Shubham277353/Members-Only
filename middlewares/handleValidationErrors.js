const { validationResult } = require("express-validator");

function validationHandler(view) {
  return (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }
    console.log("validation handler here");
    return res.render(view, {
      errors: errors.mapped(),
      data: req.body,
      authenticatedUser: req.user,
    });
  };
}

module.exports = validationHandler;