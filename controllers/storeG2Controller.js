const User = require("../models/user");

module.exports = async (req, res) => {
  try {
    // Find the current user
    const user = await User.findById(req.session.userId);
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/login");
    }

    // Update user data
    user.fName = req.body.fName;
    user.lName = req.body.lName;
    user.age = req.body.age;
    user.dob = req.body.dob;
    user.licenseNumberPlain = req.body.licenseNumber;
    user.carDetails = {
      make: req.body["carDetails.make"],
      model: req.body["carDetails.model"],
      year: req.body["carDetails.year"],
      plateNumber: req.body["carDetails.plateNumber"],
    };

    // Save the updated user
    await user.save();

    req.flash("success", "G2 information updated successfully");
    res.redirect("/G2-Test");
  } catch (error) {
    console.error("Error updating G2 information:", error);
    req.flash("error", "An error occurred while saving your information");
    res.redirect("/G2-Test");
  }
};
