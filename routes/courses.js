const express = require('express');
const router = express.Router();

const courses = [
    {
        id: 1,
        name: 'מבוא ל-Node.js',
        description: 'יסודות צד שרת ו-JavaScript',
        duration: '4 שבועות',
        level: 'מתחילים',
        price: 300,
        teacher: 'הרב כהן'
    },
    {
        id: 2,
        name: 'פיתוח Frontend',
        description: 'HTML, CSS ו-React',
        duration: '6 שבועות',
        level: 'מתחילים',
        price: 500,
        teacher: 'הרב לוי'
    },
    {
        id: 3,
        name: 'מסדי נתונים',
        description: 'שמירת מידע עם SQL',
        duration: '5 שבועות',
        level: 'מתקדמים',
        price: 400,
        teacher: 'הרב פרץ'
    },
    {
        id: 4,
        name: 'אבטחת מידע',
        description: 'הגנה על מערכות ונתונים',
        duration: '8 שבועות',
        level: 'מתקדמים',
        price: 600,
        teacher: 'הרב אברהם'
    },
    {
        id: 5,
        name: 'פיתוח אפליקציות מובייל',
        description: 'React Native ו-Flutter',
        duration: '10 שבועות',
        level: 'מתקדמים',
        price: 700,
        teacher: 'הרב יצחק'
    }
];

router.get('/', (req, res) => {
    res.json({
        success: true,
        count: courses.length,
        data: courses
    });
});

module.exports = router;