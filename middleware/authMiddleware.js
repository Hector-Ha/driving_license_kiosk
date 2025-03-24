module.exports = {
  // Check if user is authenticated
  isAuthenticated: (req, res, next) => {
    if (req.session.userId) {
      return next();
    }
    req.flash("error", "Please log in to access this page");
    res.redirect("/login");
  },

  // Check if user is a driver
  isDriver: (req, res, next) => {
    if (req.session.userId && req.session.userType === "Driver") {
      return next();
    }
    req.flash("error", "Access denied. Only drivers can access this page");
    res.redirect("/");
  },

  // Check if user is an examiner
  isExaminer: (req, res, next) => {
    if (req.session.userId && req.session.userType === "Examiner") {
      return next();
    }
    req.flash("error", "Access denied. Only examiners can access this page");
    res.redirect("/");
  },

  // Check if user is an admin
  isAdmin: (req, res, next) => {
    if (req.session.userId && req.session.userType === "Admin") {
      return next();
    }
    req.flash("error", "Access denied. Only admins can access this page");
    res.redirect("/");
  },

  // Make user data available to all views
  setLocals: (req, res, next) => {
    res.locals.isAuthenticated = !!req.session.userId;
    res.locals.userType = req.session.userType || null;
    res.locals.currentUser = req.session.userId || null;
    res.locals.flashMessages = req.flash();
    next();
  },
};
