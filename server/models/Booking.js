const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  clientName: { type: String, required: true, trim: true },
  clientPhone: { type: String, required: true, trim: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'confirmed' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
