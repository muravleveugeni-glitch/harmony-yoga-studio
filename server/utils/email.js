const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendContactEmail = async (name, phone, message) => {
  if (!process.env.EMAIL_USER) return;
  
  await transporter.sendMail({
    from: `"Harmony Yoga" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `Новая заявка от ${name}`,
    html: `
      <h2>Новое обращение с сайта</h2>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Сообщение:</strong><br>${message || '—'}</p>
    `
  });
};

exports.sendBookingEmail = async (clientName, clientPhone, classTitle) => {
  if (!process.env.EMAIL_USER) return;
  
  await transporter.sendMail({
    from: `"Harmony Yoga" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `Новая запись: ${classTitle}`,
    html: `
      <h2>Новая запись на занятие</h2>
      <p><strong>Занятие:</strong> ${classTitle}</p>
      <p><strong>Клиент:</strong> ${clientName}</p>
      <p><strong>Телефон:</strong> ${clientPhone}</p>
    `
  });
};
