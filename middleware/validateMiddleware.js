module.exports = (req, res, next) => {
  const { fName, lName, licenseNumber, age, dob } = req.body;
  const carDetails = {
    make: req.body["carDetails.make"],
    model: req.body["carDetails.model"],
    year: req.body["carDetails.year"],
    plateNumber: req.body["carDetails.plateNumber"],
  };

  // Validate license number format
  if (!licenseNumber || !licenseNumber.match(/^[A-Za-z0-9]{8}$/)) {
    return res.render("G2", {
      error: "License number must be exactly 8 alphanumeric characters",
      success: false,
      formData: req.body,
      user: null,
      licenseNumber: req.body.licenseNumber || "",
    });
  }

  // Validate age
  if (!age || isNaN(age) || parseInt(age) < 16) {
    return res.render("G2", {
      error: "You must be at least 16 years old to apply",
      success: false,
      formData: req.body,
      user: null,
      licenseNumber: req.body.licenseNumber || "",
    });
  }

  // Validate car details
  if (
    !carDetails.make ||
    !carDetails.model ||
    !carDetails.year ||
    !carDetails.plateNumber
  ) {
    return res.render("G2", {
      error: "All car details fields are required",
      success: false,
      formData: req.body,
      user: null,
      licenseNumber: req.body.licenseNumber || "",
    });
  }

  // Validate plate number format
  if (!carDetails.plateNumber.match(/^[A-Za-z0-9]{2,8}$/)) {
    return res.render("G2", {
      error: "Plate number must be 2-8 alphanumeric characters",
      success: false,
      formData: req.body,
      user: null,
      licenseNumber: req.body.licenseNumber || "",
    });
  }

  // Validate car year
  const carYear = parseInt(carDetails.year);
  const currentYear = new Date().getFullYear();
  if (isNaN(carYear) || carYear < 1900 || carYear > currentYear) {
    return res.render("G2", {
      error: `Please enter a valid year between 1900 and ${currentYear}`,
      success: false,
      formData: req.body,
      user: null,
      licenseNumber: req.body.licenseNumber || "",
    });
  }

  next();
};
