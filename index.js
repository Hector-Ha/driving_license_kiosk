process.noDeprecation = true;

const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const flash = require("connect-flash");

// Models
const User = require("./models/user.js");

// Controllers
const dashboardController = require("./controllers/dashboardController.js");
const g2TestController = require("./controllers/g2TestController.js");
const storeG2Controller = require("./controllers/storeG2Controller.js");
const gTestController = require("./controllers/gTestController.js");
const searchGController = require("./controllers/searchGController.js");
const updateGController = require("./controllers/updateGController.js");

// Auth controllers
const authController = require("./controllers/authController.js");

// Middleware
const validateMiddleware = require("./middleware/validateMiddleware.js");
const authMiddleware = require("./middleware/authMiddleware.js");

// Initialize Express App
const app = new express();

// View Templating engine
app.set("view engine", "ejs");

// Setting folder for Static files
app.use(express.static("public"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "DriveTestSecretKey",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// Use the setLocals middleware to make user data available to all views
app.use(authMiddleware.setLocals);

// Database Configuration
const MONGODB_URI =
  "mongodb+srv://admin:admin@fullstackprogrammingass.88zj2.mongodb.net/";

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Public routes
app.get("/", dashboardController);
app.get("/login", authController.getLogin);
app.post("/login", authController.postLogin);
app.get("/signup", authController.getSignup);
app.post("/signup", authController.postSignup);
app.get("/logout", authController.logout);

// Protected routes - Driver only
app.get("/G2-Test", authMiddleware.isDriver, g2TestController);
app.post(
  "/G2-Test/Store",
  authMiddleware.isDriver,
  validateMiddleware,
  storeG2Controller
);
app.get("/G-Test", authMiddleware.isDriver, gTestController);
app.post("/G-Test/Search", authMiddleware.isDriver, searchGController);
app.post("/G-Test/Update", authMiddleware.isDriver, updateGController);

// 404 handler
app.use((req, res) => res.render("notfound"));

// Port number
app.listen(3000, () => {
  console.log("App is running at port 3000");
});
