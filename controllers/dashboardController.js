const User = require("../models/user");

module.exports = async (req, res) => {
  try {
    // Check if user is logged in
    if (req.session.userId) {
      const user = await User.findById(req.session.userId);
      return res.render("dashboard", {
        user,
        isAuthenticated: true,
        userType: req.session.userType,
        username: req.session.username,
        error: req.flash("error")[0] || false,
        success: req.flash("success")[0] || false,
      });
    }

    // If not logged in
    res.render("dashboard", {
      isAuthenticated: false,
      error: req.flash("error")[0] || false,
      success: req.flash("success")[0] || false,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.render("dashboard", {
      isAuthenticated: !!req.session.userId,
      error: "An error occurred",
      success: false,
    });
  }
};
