const User = require("../models/user");

module.exports = async (req, res) => {
  try {
    // Get the current user
    const user = await User.findById(req.session.userId);
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/login");
    }

    // Render the G2 page with user data
    res.render("G2", {
      user,
      error: req.flash("error")[0] || false,
      success: req.flash("success")[0] || false,
      formData: {
        fName: user.fName !== "default" ? user.fName : "",
        lName: user.lName !== "default" ? user.lName : "",
        age: user.age > 0 ? user.age : "",
        dob: user.dob,
        licenseNumber:
          user.licenseNumberPlain !== "default" ? user.licenseNumberPlain : "",
        "carDetails.make":
          user.carDetails.make !== "default" ? user.carDetails.make : "",
        "carDetails.model":
          user.carDetails.model !== "default" ? user.carDetails.model : "",
        "carDetails.year": user.carDetails.year > 0 ? user.carDetails.year : "",
        "carDetails.plateNumber":
          user.carDetails.plateNumber !== "default"
            ? user.carDetails.plateNumber
            : "",
      },
    });
  } catch (error) {
    console.error("G2 page error:", error);
    req.flash("error", "An error occurred");
    res.redirect("/");
  }
};
