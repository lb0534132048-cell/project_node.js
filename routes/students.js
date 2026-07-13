const express = require('express');
const router = express.Router();

const students = [
    {
        id: 1,
        name: 'משה כהן',
        email: 'moshe@example.com',
        phone: '050-1111111',
        city: 'בני ברק',
        course: 'מבוא ל-Node.js',
        status: 'פעיל'
    },
    {
        id: 2,
        name: 'יוסי לוי',
        email: 'yossi@example.com',
        phone: '052-2222222',
        city: 'ירושלים',
        course: 'פיתוח Frontend',
        status: 'פעיל'
    },
    {
        id: 3,
        name: 'ישראל פרץ',
        email: 'israel@example.com',
        phone: '053-3333333',
        city: 'בית שמש',
        course: 'מסדי נתונים',
        status: 'פעיל'
    },
    {
        id: 4,
        name: 'אהרן גולדברג',
        email: 'aharon@example.com',
        phone: '054-4444444',
        city: 'אלעד',
        course: 'מבוא ל-Node.js',
        status: 'פעיל'
    },
    {
        id: 5,
        name: 'דוד פרידמן',
        email: 'david@example.com',
        phone: '055-5555555',
        city: 'מודיעין עילית',
        course: 'אבטחת מידע',
        status: 'פעיל'
    },
    {
        id: 6,
        name: 'שמעון רוזנברג',
        email: 'shimon@example.com',
        phone: '056-6666666',
        city: 'צפת',
        course: 'פיתוח אפליקציות מובייל',
        status: 'לא פעיל'
    }
];

router.get('/', (req, res) => {
    res.json({
        success: true,
        count: students.length,
        data: students
    });
});

module.exports = router;
