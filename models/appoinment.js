const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  isTimeSlotAvailable: { type: Boolean, default: true },
  user: { type: Schema.Types.ObjectId, ref: "user", default: null },
});

// Create a compound index to prevent duplicate time slots
appointmentSchema.index({ date: 1, time: 1 }, { unique: true });

const Appointment = mongoose.model("appointment", appointmentSchema);

module.exports = Appointment;
