const User = require("../models/user");

module.exports = async (req, res) => {
  try {
    const licenseNumber = req.body.licenseNumber;

    // Use the static method to find user by plain license number
    const user = await User.findByLicenseNumber(licenseNumber);

    if (!user) {
      return res.render("G", {
        error: "No user found with this license number",
        formData: req.body,
        user: null,
        licenseNumber: req.body.licenseNumber,
      });
    }

    // Include the display license number in the render context
    res.render("G", {
      user,
      error: false,
      licenseNumber: user.displayLicenseNumber, // Use the virtual for display
      message: "",
    });
  } catch (error) {
    console.error("Lookup error:", error);
    res.render("G", {
      error: "Error processing your request",
      formData: req.body,
      user: null,
      licenseNumber: req.body.licenseNumber || "",
    });
  }
};
