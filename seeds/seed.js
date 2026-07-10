require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Class = require('../server/models/Class');
const Post = require('../server/models/Post');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔗 MongoDB подключен');

    await Class.deleteMany({});
    await Post.deleteMany({});

    // === Расписание ===
    await Class.insertMany([
      {
        title: 'Утренняя хатха',
        description: 'Мягкое пробуждение тела. Классические асаны, дыхание, релаксация.',
        day: 'Пн / Ср / Пт',
        time: '07:30 – 09:00',
        level: 'Все уровни',
        instructor: 'Анна Соколова',
        image: 'https://image.qwenlm.ai/public_source/2c28601d-66bf-4eff-a367-42f94eabf125/1a77a46ce-72a2-49a6-bdce-b81d6102abdf.png',
        maxSeats: 10, bookedSeats: 3
      },
      {
        title: 'Виньяса-флоу',
        description: 'Динамичная практика. Плавные переходы между асанами в ритме дыхания.',
        day: 'Вт / Чт',
        time: '19:00 – 20:30',
        level: 'Средний',
        instructor: 'Михаил Руднев',
        image: 'https://image.qwenlm.ai/public_source/2c28601d-66bf-4eff-a367-42f94eabf125/1a77a46ce-72a2-49a6-bdce-b81d6102abdf.png',
        maxSeats: 10, bookedSeats: 6
      },
      {
        title: 'Инь-йога',
        description: 'Глубокая работа с фасциями. Удержание поз 3–5 минут.',
        day: 'Ср',
        time: '20:00 – 21:30',
        level: 'Все уровни',
        instructor: 'Елена Корнеева',
        image: 'https://image.qwenlm.ai/public_source/2c28601d-66bf-4eff-a367-42f94eabf125/1a77a46ce-72a2-49a6-bdce-b81d6102abdf.png',
        maxSeats: 10, bookedSeats: 2
      },
      {
        title: 'Медитация и пранаяма',
        description: 'Дыхательные техники и практики осознанности.',
        day: 'Сб',
        time: '10:00 – 11:00',
        level: 'Все уровни',
        instructor: 'Дмитрий Белов',
        image: 'https://image.qwenlm.ai/public_source/2c28601d-66bf-4eff-a367-42f94eabf125/1a77a46ce-72a2-49a6-bdce-b81d6102abdf.png',
        maxSeats: 12, bookedSeats: 5
      }
    ]);

    // === Блог ===
    await Post.insertMany([
      {
        title: 'Польза хатха-йоги для начинающих',
        excerpt: 'Хатха-йога — идеальная отправная точка. В отличие от динамичных стилей, она делает акцент на статичных позах.',
        content: '<p>Хатха-йога — идеальная отправная точка для новичков...</p><h3>С чего начать?</h3><p>Первое занятие может показаться сложным, но помните: йога — не соревнование.</p><ul><li>Начните с 2-3 занятий в неделю</li><li>Используйте props (блоки, ремни)</li><li>Фокусируйтесь на дыхании</li></ul>',
        image: 'https://image.qwenlm.ai/public_source/2c28601d-66bf-4eff-a367-42f94eabf125/180180e41-e72b-49a6-a130-970a2154b331.png'
      },
      {
        title: 'Как медитация меняет мозг',
        excerpt: 'Нейробиологи показали, как медитация влияет на мозг. МРТ фиксирует изменения уже после 8 недель практики.',
        content: '<p>За последние два десятилетия нейробиологи показали...</p><h3>Что происходит?</h3><p>Медитация увеличивает плотность серого вещества в гиппокампе.</p>',
        image: 'https://image.qwenlm.ai/public_source/2c28601d-66bf-4eff-a367-42f94eabf125/180180e41-e72b-49a6-a130-970a2154b331.png'
      },
      {
        title: 'Инь-йога перед сном',
        excerpt: 'Медитативная практика с удержанием поз 3-5 минут. Идеальна для вечера.',
        content: '<p>Инь-йога — медитативная практика...</p><h3>Три позы для отдыха</h3><p><strong>Поза ребёнка</strong> — 3-5 минут.</p>',
        image: 'https://image.qwenlm.ai/public_source/2c28601d-66bf-4eff-a367-42f94eabf125/180180e41-e72b-49a6-a130-970a2154b331.png'
      },
      {
        title: 'Пранаяма: дыхание как основа практики',
        excerpt: 'Пранаяма — искусство управления дыханием. Дыхание — мост между телом и умом.',
        content: '<p>Пранаяма — искусство управления дыханием...</p><h3>Три техники</h3><p><strong>4-7-8</strong> — вдох 4, задержка 7, выдох 8.</p>',
        image: 'https://image.qwenlm.ai/public_source/2c28601d-66bf-4eff-a367-42f94eabf125/180180e41-e72b-49a6-a130-970a2154b331.png'
      }
    ]);

    console.log('✅ Демо-данные загружены');
    process.exit(0);
  } catch (err) {
    console.error('❌ Ошибка:', err);
    process.exit(1);
  }
};

seedData();
