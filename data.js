/*
  ЗМІСТ ПРЕЗЕНТАЦІЇ
  ─────────────────
  Тут лише текст — дизайн і логіка в style.css / app.js.

  Як заповнити лаби:
    desc  — «Опис вразливості» зі звіту (1–2 речення читаються найкраще).
    steps — кроки «Покрокового виконання». Кожен крок:
              { t: 'текст кроку', f: [номери рисунків] }
            f — номери рисунків зі звіту (assets/fig-NN.png). Можна кілька: f: [17, 18].
            Порожній t показує підказку «вставте текст кроку».
            Кроків може бути більше чи менше — просто додайте/видаліть рядки.
    captions (нижче) — підписи рисунків: 12: 'Рисунок 12 – ...'. Необов’язково.

  У тексті можна використовувати <code>...</code> для шляхів і параметрів.
*/

window.REPORT = {
  meta: {
    course: 'Безпека веб-додатків',
    lab: 'Лабораторна робота №5',
    topic: 'Уразливості контролю доступу: несанкціонований доступ до функцій, зміна ролей та ідентифікаторів користувачів, обхід перевірок',
    author: 'Дзяман Наталія',
    group: 'КБ-307',
    teacher: 'Побережник В. О.',
    teacherTitle: 'д.філ., ст. викл. каф. ЗІ',
    org: 'НУ «Львівська політехніка» · ІКТА · кафедра ЗІ',
    city: 'Львів — 2026',
    goal: 'Практичне дослідження уразливостей контролю доступу вебзастосунків: виявлення несанкціонованого доступу до адміністративних функцій, маніпуляції ролями, підміни ідентифікаторів користувачів та обходу перевірок авторизації.'
  },

  // Підписи рисунків: номер → текст. Порожньо = «Рисунок N».
  captions: {},

  labs: [
    {
      uk: 'Незахищений адмін-функціонал',
      en: 'Unprotected admin functionality',
      kind: 'v',
      url: 'https://portswigger.net/web-security/access-control/lab-unprotected-admin-functionality',
      desc: '',
      steps: [
        { t: '', f: [1] },
        { t: '', f: [2] },
        { t: '', f: [3] },
        { t: '', f: [4] },
        { t: '', f: [5] }
      ]
    },
    {
      uk: 'Адмін-функціонал з непередбачуваним URL',
      en: 'Unprotected admin functionality with unpredictable URL',
      kind: 'v',
      url: 'https://portswigger.net/web-security/access-control/lab-unprotected-admin-functionality-with-unpredictable-url',
      desc: '',
      steps: [
        { t: '', f: [6] },
        { t: '', f: [7] },
        { t: '', f: [8] },
        { t: '', f: [9] }
      ]
    },
    {
      uk: 'Роль користувача в параметрі запиту',
      en: 'User role controlled by request parameter',
      kind: 'v',
      url: 'https://portswigger.net/web-security/access-control/lab-user-role-controlled-by-request-parameter',
      desc: '',
      steps: [
        { t: '', f: [10] },
        { t: '', f: [11] },
        { t: '', f: [12] },
        { t: '', f: [13] },
        { t: '', f: [14] },
        { t: '', f: [15] },
        { t: '', f: [16] },
        { t: '', f: [17, 18] },
        { t: '', f: [19] },
        { t: '', f: [20] }
      ]
    },
    {
      uk: 'Роль змінюється в профілі користувача',
      en: 'User role can be modified in user profile',
      kind: 'v',
      url: 'https://portswigger.net/web-security/access-control/lab-user-role-can-be-modified-in-user-profile',
      desc: '',
      steps: [
        { t: '', f: [21] },
        { t: '', f: [22] },
        { t: '', f: [23] },
        { t: '', f: [24] },
        { t: '', f: [25] },
        { t: '', f: [26] }
      ]
    },
    {
      uk: 'ID користувача в параметрі запиту',
      en: 'User ID controlled by request parameter',
      kind: 'h',
      url: 'https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter',
      desc: '',
      steps: [
        { t: '', f: [27] },
        { t: '', f: [28] },
        { t: '', f: [29] },
        { t: '', f: [30] },
        { t: '', f: [31] }
      ]
    },
    {
      uk: 'ID користувача — непередбачувані GUID',
      en: 'User ID controlled by request parameter, with unpredictable user IDs',
      kind: 'h',
      url: 'https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter-with-unpredictable-user-ids',
      desc: '',
      steps: [
        { t: '', f: [32] },
        { t: '', f: [33] },
        { t: '', f: [34] },
        { t: '', f: [35] },
        { t: '', f: [36] },
        { t: '', f: [37] }
      ]
    },
    {
      uk: 'ID користувача — витік даних у редиректі',
      en: 'User ID controlled by request parameter with data leakage in redirect',
      kind: 'h',
      url: 'https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter-with-data-leakage-in-redirect',
      desc: '',
      steps: [
        { t: '', f: [38] },
        { t: '', f: [39] },
        { t: '', f: [40] },
        { t: '', f: [41] },
        { t: '', f: [42] }
      ]
    },
    {
      uk: 'ID користувача — розкриття пароля',
      en: 'User ID controlled by request parameter with password disclosure',
      kind: 'h',
      url: 'https://portswigger.net/web-security/access-control/lab-user-id-controlled-by-request-parameter-with-password-disclosure',
      desc: '',
      steps: [
        { t: '', f: [43] },
        { t: '', f: [44] },
        { t: '', f: [45] },
        { t: '', f: [46] },
        { t: '', f: [47] },
        { t: '', f: [48] },
        { t: '', f: [49] }
      ]
    },
    {
      uk: 'Небезпечні прямі посилання на об’єкти',
      en: 'Insecure direct object references',
      kind: 'h',
      url: 'https://portswigger.net/web-security/access-control/lab-insecure-direct-object-references',
      desc: '',
      steps: [
        { t: '', f: [50] },
        { t: '', f: [51] },
        { t: '', f: [52] },
        { t: '', f: [53] },
        { t: '', f: [54] },
        { t: '', f: [55] }
      ]
    }
  ],

  // Висновки: картки + підсумковий рядок принципів захисту.
  conclusions: {
    intro: 'Контроль доступу, який спирається на клієнта або на приховування, не є контролем доступу.',
    cards: [
      { k: '01', h: 'Перевірки — лише на сервері', p: 'Роль і права користувача визначає сервер за сесією, а не cookie, поле форми чи JSON-параметр, які надіслав клієнт.' },
      { k: '02', h: 'Приховування ≠ захист', p: 'Непередбачуваний URL чи запис у robots.txt не захищає адмін-функції — потрібна явна авторизація на кожен запит.' },
      { k: '03', h: 'Перевірка власника об’єкта', p: 'Для кожного запитуваного профілю, файлу чи запису сервер перевіряє, чи має поточний користувач на нього право (захист від IDOR).' },
      { k: '04', h: 'Не віддавати зайвого', p: 'Ні паролів у value, ні даних у тілі редиректу, ні зайвих полів у моделі, що приймає запит (Mass Assignment).' }
    ],
    principles: ['Deny by default', 'Server-side authorization', 'Централізований механізм перевірки прав']
  }
};
