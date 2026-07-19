const express = require('express');
const router = express.Router();

let students = [
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

function getNextId() {
    return students.length > 0
        ? Math.max(...students.map(s => s.id)) + 1
        : 1;
}

// ▸ READ — כל התלמידים
router.get('/', (req, res) => {
    res.json({
        success: true,
        count: students.length,
        data: students
    });
});

// ▸ READ — תלמיד בודד
router.get('/:id', (req, res) => {
    const id = +req.params.id;

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'מזהה לא תקין' });
    }

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ error: 'התלמיד לא נמצא' });
    }

    res.json({ success: true, data: student });
});

// ▸ CREATE — תלמיד חדש
router.post('/', (req, res) => {
    const { name, email, phone, city, course, status } = req.body;

    if (req.body.id !== undefined) {
        return res.status(400).json({ error: 'אין לשלוח ID ביצירה — הוא נוצר אוטומטית' });
    }

    if (!name || !email || !phone || !city || !course || !status) {
        return res.status(400).json({
            error: 'חסרים שדות חובה',
            required: ['name', 'email', 'phone', 'city', 'course', 'status']
        });
    }
    
      if (name.length < 2 || name.length > 50) {
        return res.status(400).json({ error: 'שם התלמיד חייב להיות בין 2 ל-50 תווים' });
    }

    // בדיקת אימייל תקין
    if (!email.includes('@')) {
        return res.status(400).json({ error: 'כתובת אימייל לא תקינה' });
    }

    // בדיקת אימייל כפול
    if (students.find(s => s.email === email)) {
        return res.status(400).json({ error: 'כבר קיים תלמיד עם אימייל זה' });
    }

    const newStudent = {
        id: getNextId(),
        name,
        email,
        phone,
        city,
        course,
        status
    };

    students.push(newStudent);

    res.status(201).json({ success: true, data: newStudent });
});

// ▸ UPDATE — עדכון תלמיד
router.put('/:id', (req, res) => {
    const id = +req.params.id;

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'מזהה לא תקין' });
    }

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ error: 'התלמיד לא נמצא' });
    }

    const { name, email, phone, city, course, status } = req.body;

    if (!name || !email || !phone || !city || !course || !status) {
        return res.status(400).json({
            error: 'חסרים שדות חובה',
            required: ['name', 'email', 'phone', 'city', 'course', 'status']
        });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ error: 'כתובת אימייל לא תקינה' });
    }

    // בדיקת אימייל כפול — התעלמות מהתלמיד הנוכחי
    if (students.find(s => s.email === email && s.id !== id)) {
        return res.status(400).json({ error: 'כבר קיים תלמיד עם אימייל זה' });
    }

    student.name = name;
    student.email = email;
    student.phone = phone;
    student.city = city;
    student.course = course;
    student.status = status;

    res.json({ success: true, data: student });
});

// ▸ DELETE — מחיקת תלמיד
router.delete('/:id', (req, res) => {
    const id = +req.params.id;

    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'מזהה לא תקין' });
    }

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'התלמיד לא נמצא' });
    }

    students.splice(index, 1);

    res.json({ success: true, message: 'התלמיד נמחק בהצלחה' });
});

module.exports = router;