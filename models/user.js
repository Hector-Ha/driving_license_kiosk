const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: {
    type: String,
    required: true,
    enum: ["Driver", "Examiner", "Admin"],
  },
  fName: { type: String, default: "default" },
  lName: { type: String, default: "default" },
  licenseNumber: String, // The hashed version for security
  licenseNumberPlain: { type: String, default: "default" }, // Plain version for lookups and display
  age: { type: Number, default: 0 },
  dob: { type: Date, default: Date.now },
  carDetails: {
    make: { type: String, default: "default" },
    model: { type: String, default: "default" },
    year: { type: Number, default: 0 },
    plateNumber: { type: String, default: "default" },
  },
  appointmentId: {
    type: Schema.Types.ObjectId,
    ref: "appointment",
    default: null,
  },
});

// Virtual for displaying the license number
userSchema.virtual("displayLicenseNumber").get(function () {
  return this.licenseNumberPlain || "default";
});

// Add a virtual property to check if profile is complete
userSchema.virtual("isProfileComplete").get(function () {
  return (
    this.fName !== "default" &&
    this.lName !== "default" &&
    this.licenseNumberPlain !== "default" &&
    this.age > 0 &&
    this.carDetails.make !== "default" &&
    this.carDetails.model !== "default" &&
    this.carDetails.year > 0 &&
    this.carDetails.plateNumber !== "default"
  );
});

userSchema.pre("save", async function (next) {
  const user = this;

  // Only hash the password if it has been modified or is new
  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    } catch (error) {
      return next(error);
    }
  }

  // Only hash license number if it's modified and not default
  if (
    user.licenseNumberPlain !== "default" &&
    user.isModified("licenseNumberPlain")
  ) {
    try {
      // Store the uppercase version for lookups
      user.licenseNumberPlain = user.licenseNumberPlain.toUpperCase();

      // Hash the license number
      const salt = await bcrypt.genSalt(10);
      user.licenseNumber = await bcrypt.hash(user.licenseNumberPlain, salt);
    } catch (error) {
      return next(error);
    }
  }

  next();
});

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Static method to find user by license number
userSchema.statics.findByLicenseNumber = async function (licenseNumber) {
  if (!licenseNumber) {
    return null;
  }

  const upperCaseLicense = licenseNumber.toUpperCase();
  return await this.findOne({ licenseNumberPlain: upperCaseLicense });
};

// Make virtuals available when converting to JSON/objects
userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

const User = mongoose.model("user", userSchema);

module.exports = User;
