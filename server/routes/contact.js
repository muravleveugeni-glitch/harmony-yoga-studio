const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { sendContactEmail } = require('../utils/email');

// POST /api/contact
router.post('/',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Имя: минимум 2 символа'),
    body('phone').trim().notEmpty().withMessage('Телефон обязателен'),
    body('message').optional().trim()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, phone, message } = req.body;
      const contact = await Contact.create({ name, phone, message });
      
      // Пытаемся отправить email, но даже при ошибке сохраняем заявку
      sendContactEmail(name, phone, message).catch(err => {
        console.error('Ошибка отправки email:', err);
      });

      res.status(201).json({ success: true, message: 'Заявка принята' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }
);

module.exports = router;
