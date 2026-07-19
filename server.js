const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
const coursesRoutes = require('./routes/courses');
const studentsRoutes = require('./routes/students');

// הגדרת JSON יפה עם עברית
app.set('json spaces', 2);

// route ראשי
app.get('/', (req, res) => {
    res.json({
        status: 'פעיל',
        description: 'השרת מספק מידע על קורסים ותלמידים'
    });
});

// חיבור routes
app.use('/courses', coursesRoutes);
app.use('/students', studentsRoutes);

// טיפול בנתיב לא קיים
app.use((req, res) => {
    res.status(404).json({ error: 'הנתיב לא נמצא' });
});

// טיפול בשגיאה כללית
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'שגיאת שרת' });
});

app.listen(port, () => {
    console.log(`השרת רץ על http://localhost:${port}`);
});