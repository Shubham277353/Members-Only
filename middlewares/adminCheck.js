function ensureAdmin(req, res, next) {
  if (req.user.isadmin) {
    return next(); 
  }
  res.redirect('/error');
}

module.exports = ensureAdmin;