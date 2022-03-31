//middleware not for manual route

module.exports = {
    ensureAuth: function (req, res, next) {
      //if successful login
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    },
    ensureGuest: function (req, res, next) {
      // if logged in the user see dashboard page, not login page
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/dashboard');
      }
    },
  }