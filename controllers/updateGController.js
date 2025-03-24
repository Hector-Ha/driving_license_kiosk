const User = require("../models/user");

module.exports = async (req, res) => {
  try {
    // Get the current user
    const user = await User.findById(req.session.userId);
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/login");
    }

    const { make, model, year, plateNumber } = req.body;

    // Validate inputs
    if (!make || !model || !year || !plateNumber) {
      req.flash("error", "All car fields are required");
      return res.redirect("/G-Test");
    }

    // Update car details
    user.carDetails = { make, model, year, plateNumber };
    await user.save();

    req.flash("success", "Car information updated successfully");
    res.redirect("/G-Test");
  } catch (error) {
    console.error("Update error:", error);
    req.flash("error", "Error updating information");
    res.redirect("/G-Test");
  }
};
