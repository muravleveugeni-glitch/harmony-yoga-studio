const { body } = require('express-validator');

exports.validateContact = [
  body('name').trim().isLength({ min: 2 }).withMessage('Имя: минимум 2 символа'),
  body('phone').trim().notEmpty().withMessage('Телефон обязателен'),
  body('message').optional().trim()
];

exports.validateBooking = [
  body('classId').isMongoId().withMessage('Неверный ID занятия'),
  body('clientName').trim().isLength({ min: 2 }).withMessage('Имя: минимум 2 символа'),
  body('clientPhone').trim().notEmpty().withMessage('Телефон обязателен')
];

exports.handleErrors = (req, res, next) => {
  const { validationResult } = require('express-validator');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
