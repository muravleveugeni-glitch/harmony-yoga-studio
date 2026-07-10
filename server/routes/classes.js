const express = require('express');
const router = express.Router();
const Class = require('../models/Class');

// GET /api/classes
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find().sort({ day: 1, time: 1 });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;
