const { validationResult } = require("express-validator");

function validationHandler(view) {
  return (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).render(view, {
      errors: errors.mapped(),
      data: req.body,
      authenticatedUser: req.user,
    });
  };
}

module.exports = validationHandler;