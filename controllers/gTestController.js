const User = require("../models/user");

module.exports = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/login");
    }

    // Check if the user has completed G2
    if (!user.isProfileComplete) {
      req.flash("error", "Please complete your G2 information first");
      return res.redirect("/G2-Test");
    }

    // Render the G page with user data
    res.render("G", {
      user,
      error: req.flash("error")[0] || false,
      success: req.flash("success")[0] || false,
      message: req.flash("message")[0] || "",
      licenseNumber: user.displayLicenseNumber,
    });
  } catch (error) {
    console.error("G page error:", error);
    req.flash("error", "An error occurred");
    res.redirect("/");
  }
};
