# 🧘 Harmony Yoga Studio

Fullstack-сайт студии йоги: расписание, блог, запись на занятия, приём платежей через Stripe.

## 📋 Требования

- Node.js ≥ 18
- MongoDB (локальная или [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Аккаунт [Stripe](https://stripe.com) для приёма платежей (опционально)
- SMTP-сервер для отправки писем (Gmail, Mailgun, Yandex)

## ⚡ Быстрый старт

### 1. Установка зависимостей
```bash
npm install
```

### 2. Настройка окружения
```bash
cp .env.example .env
```

Откройте `.env` и заполните обязательные поля:
- `MONGO_URI` — ссылка на MongoDB
- `STRIPE_SECRET_KEY` — секретный ключ Stripe
- `EMAIL_USER` и `EMAIL_PASS` — для отправки заявок

### 3. Инициализация базы данных
```bash
npm run seed
```

### 4. Запуск сервера
```bash
npm run dev
```

Откройте http://localhost:5000

## 📝 API Эндпоинты

| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/classes` | Список занятий |
| POST | `/api/bookings` | Запись на занятие |
| GET | `/api/posts` | Статьи блога |
| POST | `/api/contact` | Контактная форма |
| POST | `/api/payments/create-checkout-session` | Stripe Checkout |
