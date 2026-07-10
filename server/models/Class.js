const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  day: { type: String, required: true },
  time: { type: String, required: true },
  level: { type: String, default: 'Все уровни' },
  instructor: { type: String, default: '' },
  image: { type: String, default: '' },
  maxSeats: { type: Number, default: 10 },
  bookedSeats: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
