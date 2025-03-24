const User = require("../models/user");

module.exports = (req, res) => {
  res.render("login", {
    error: req.flash("error")[0] || false,
    success: req.flash("success")[0] || false,
  });
};
