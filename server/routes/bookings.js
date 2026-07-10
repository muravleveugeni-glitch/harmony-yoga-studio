const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const Class = require('../models/Class');
const { sendBookingEmail } = require('../utils/email');

// POST /api/bookings
router.post('/',
  [
    body('classId').isMongoId().withMessage('Неверный ID занятия'),
    body('clientName').trim().isLength({ min: 2 }).withMessage('Имя: минимум 2 символа'),
    body('clientPhone').trim().notEmpty().withMessage('Телефон обязателен')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { classId, clientName, clientPhone } = req.body;
      const yogaClass = await Class.findById(classId);

      if (!yogaClass) {
        return res.status(404).json({ error: 'Занятие не найдено' });
      }

      if (yogaClass.bookedSeats >= yogaClass.maxSeats) {
        return res.status(400).json({ error: 'Мест больше нет' });
      }

      const booking = await Booking.create({ classId, clientName, clientPhone });
      yogaClass.bookedSeats += 1;
      await yogaClass.save();

      // Отправляем email асинхронно, не блокируя ответ
      sendBookingEmail(clientName, clientPhone, yogaClass.title).catch(console.error);

      res.status(201).json({ success: true, booking });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка записи' });
    }
  }
);

module.exports = router;
