const { validationResult } = require("express-validator");

function validationHandler(view) {
  return (req, res, next) => {
    const errors = validationResult(req);
    const message = req.session.messages?.[0];

    if (errors.isEmpty()) {
      return next();
    }
    console.log("validation handler here");
    return res.render(view, {
      message: message,
      errors: errors.mapped(),
      data: req.body,
      authenticatedUser: req.user,
    });
  };
}

module.exports = validationHandler;