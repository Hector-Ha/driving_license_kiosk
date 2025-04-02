const User = require("../models/user");

// Show login form
exports.getLogin = (req, res) => {
  // Get flash messages
  const errorMsg = req.flash("error")[0] || null;
  const successMsg = req.flash("success")[0] || null;

  // Log them after retrieval but before rendering
  console.log("Login page - Flash error:", errorMsg);
  console.log("Login page - Flash success:", successMsg);

  // Render with retrieved messages
  res.render("login", {
    error: errorMsg,
    success: successMsg,
  });
};

// Process login
exports.postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate inputs
    if (!username || !password) {
      req.flash("error", "Username and password are required");
      return res.redirect("/login");
    }

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      req.flash("error", "Invalid username or password");
      console.log("Just set flash error:", req.flash("error"));
      return res.redirect("/login");
    }

    // Validate password
    const isValid = await user.validatePassword(password);
    if (!isValid) {
      req.flash("error", "Invalid username or password");
      return res.redirect("/login");
    }

    // Set session
    req.session.userId = user._id;
    req.session.userType = user.userType;
    req.session.username = user.username;

    // Redirect to dashboard
    res.redirect("/");
  } catch (error) {
    console.error("Login error:", error);
    req.flash("error", "An error occurred during login");
    res.redirect("/login");
  }
};

// Show signup form
exports.getSignup = (req, res) => {
  res.render("signup", {
    error: req.flash("error"),
  });
};

// Process signup
exports.postSignup = async (req, res) => {
  try {
    const { username, password, confirmPassword, userType } = req.body;

    // Validate inputs
    if (!username || !password || !confirmPassword || !userType) {
      req.flash("error", "All fields are required");
      return res.redirect("/signup");
    }

    if (password !== confirmPassword) {
      req.flash("error", "Passwords do not match");
      return res.redirect("/signup");
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      req.flash("error", "Username already exists");
      return res.redirect("/signup");
    }

    // Create new user
    const newUser = new User({
      username,
      password,
      userType,
    });

    await newUser.save();
    req.flash("success", "Registration successful. Please log in.");
    res.redirect("/login");
  } catch (error) {
    console.error("Signup error:", error);
    req.flash("error", "An error occurred during registration");
    res.redirect("/signup");
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
