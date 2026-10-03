const { validationResult } = require("express-validator");

function validationHandler(req, res, next) {
  const errors = validationResult(req);
  const path = req.path;

  if (errors.isEmpty()) {
    return next();
  }

  res.status(400).redirect(`${path}`,{
    errors: errors.array(),
  });
}

module.exports = validationHandler;
