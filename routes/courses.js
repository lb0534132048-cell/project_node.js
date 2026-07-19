const express = require('express');
const router = express.Router();

let courses = [
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

// איתור ה-ID הבא
function getNextId() {
    return courses.length > 0
        ? Math.max(...courses.map(c => c.id)) + 1
        : 1;
}

// ▸ READ — כל הקורסים
router.get('/', (req, res) => {
    res.json({
        success: true,
        count: courses.length,
        data: courses
    });
});

// ▸ READ — קורס בודד
router.get('/:id', (req, res) => {
    const id = +req.params.id;

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'מזהה לא תקין' });
    }

    const course = courses.find(c => c.id === id);

    if (!course) {
        return res.status(404).json({ error: 'הקורס לא נמצא' });
    }

    res.json({ success: true, data: course });
});

// ▸ CREATE — קורס חדש
router.post('/', (req, res) => {
    const { name, description, duration, level, price, teacher } = req.body;
    // מניעת שליחת ID ידני
    if (req.body.id !== undefined) {
        return res.status(400).json({ error: 'אין לשלוח ID ביצירה — הוא נוצר אוטומטית' });
    }

    // ולידציה
    if (!name || !description || !duration || !level || !price || !teacher) {
        return res.status(400).json({
            error: 'חסרים שדות חובה',
            required: ['name', 'description', 'duration', 'level', 'price', 'teacher']
        });
    }

    if (name.length < 2 || name.length > 100) {
        return res.status(400).json({ error: 'שם הקורס חייב להיות בין 2 ל-100 תווים' });
    }

    if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: 'מחיר חייב להיות מספר חיובי' });
    }

    const newCourse = {
        id: getNextId(),
        name,
        description,
        duration,
        level,
        price,
        teacher
    };

    courses.push(newCourse);

    res.status(201).json({ success: true, data: newCourse });
});

// ▸ UPDATE — עדכון קורס
router.put('/:id', (req, res) => {
    const id = +req.params.id;

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'מזהה לא תקין' });
    }

    const course = courses.find(c => c.id === id);

    if (!course) {
        return res.status(404).json({ error: 'הקורס לא נמצא' });
    }

    const { name, description, duration, level, price, teacher } = req.body;

    // ולידציה — כל השדות נדרשים בעדכון
    if (!name || !description || !duration || !level || !price || !teacher) {
        return res.status(400).json({
            error: 'חסרים שדות חובה',
            required: ['name', 'description', 'duration', 'level', 'price', 'teacher']
        });
    }
    if (name.length < 2 || name.length > 100) {
        return res.status(400).json({ error: 'שם הקורס חייב להיות בין 2 ל-100 תווים' });
    }

    if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: 'מחיר חייב להיות מספר חיובי' });
    }

    course.name = name;
    course.description = description;
    course.duration = duration;
    course.level = level;
    course.price = price;
    course.teacher = teacher;

    res.json({ success: true, data: course });
});

// ▸ DELETE — מחיקת קורס
router.delete('/:id', (req, res) => {
    const id = +req.params.id;

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'מזהה לא תקין' });
    }

    const index = courses.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'הקורס לא נמצא' });
    }

    courses.splice(index, 1);

    res.json({ success: true, message: 'הקורס נמחק בהצלחה' });
});

module.exports = router;