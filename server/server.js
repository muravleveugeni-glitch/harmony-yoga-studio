require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// === Middleware ===
app.use(cors());
app.use(express.json());

// Защита от спама на критичных эндпоинтах
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { error: 'Слишком много запросов, попробуйте позже' }
});

// === API роуты ===
app.use('/api/classes', require('./routes/classes'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/contact', apiLimiter, require('./routes/contact'));
app.use('/api/bookings', apiLimiter, require('./routes/bookings'));
app.use('/api/payments', require('./routes/payments'));

// === Статические файлы (public/index.html) ===
app.use(express.static(path.join(__dirname, '..', 'public')));

// Любые не-API запросы отдают index.html (для будущих SPA-роутов)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// === Глобальный обработчик ошибок ===
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// === Запуск (без блокировки MongoDB) ===
const PORT = process.env.PORT || 5000;

// Пробуем подключиться к БД, но сервер запускаем в любом случае
connectDB().catch(err => {
  console.warn('⚠️ MongoDB не подключена:', err.message);
  console.warn('   API будет недоступен. Настройте MONGO_URI в .env');
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
  console.log(`   Статика: http://localhost:${PORT}`);
});
