// ============================================================
// קונטרולר – קורסים
// מתרגם HTTP ←→ Service.
// מחלץ נתונים מ-req, קורא ל-Service, מחזיר res.
// ============================================================

const coursesService = require('../services/courses');

// GET /courses – החזרת כל הקורסים
function getAll(req, res) {
  const courses = coursesService.getAll();   // קורא ל-service
  res.status(200).json(courses);             // 200 + הגוף
}

// ==========================================================
// GET /courses/:id – קבלת קורס בודד
// ==========================================================
function getById(req, res) {
  try {
    const id = Number(req.params.id);         // המרה למספר
    const course = coursesService.getById(id);
    res.status(200).json(course);             // 200 – נמצא
  } catch (err) {
    // הקורס לא נמצא – 404
    if (err.message === 'COURSE_NOT_FOUND') {
      return res.status(404).json({ error: 'הקורס לא נמצא' });
    }
    // שגיאה לא צפויה – 500
    res.status(500).json({ error: err.message });
  }
}

// POST /courses – יצירת קורס
function create(req, res) {
  try {
    const course = coursesService.create(req.body);
    res.status(201).json(course);             // 201 – נוצר
  } catch (err) {
    res.status(400).json({ error: err.message });  // 400 – שגיאת קלט
  }
}

// ==========================================================
// PUT /courses/:id – עדכון קורס בודד
// ==========================================================
function update(req, res) {
  try {
    const id = Number(req.params.id);
    const course = coursesService.update(id, req.body);
    res.status(200).json(course);             // 200 – עודכן
  } catch (err) {
    if (err.message === 'COURSE_NOT_FOUND') {
      return res.status(404).json({ error: 'הקורס לא נמצא' });
    }
    res.status(500).json({ error: err.message });
  }
}

// ==========================================================
// DELETE /courses/:id – מחיקת קורס בודד
// ==========================================================
function remove(req, res) {
  try {
    const id = Number(req.params.id);
    coursesService.remove(id);
    res.status(204).send();                   // 204 – נמחק, אין גוף
  } catch (err) {
    if (err.message === 'COURSE_NOT_FOUND') {
      return res.status(404).json({ error: 'הקורס לא נמצא' });
    }
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAll, getById, create, update, remove };