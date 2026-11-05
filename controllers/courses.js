// ============================================================
// קונטרולר – קורסים
// מתרגם HTTP ←→ Service.
// ============================================================

const coursesService = require('../services/courses');

function handleError(res, err) {
  if (err && err.message === 'COURSE_NOT_FOUND') {
    return res.status(404).json({ error: 'הקורס לא נמצא' });
  }
  if (err && (err.message === 'INVALID_ID' || err.message === 'INVALID_COURSE_DATA')) {
    return res.status(400).json({ error: 'המזהה או פרטי הקורס אינם תקינים.' });
  }

  console.error(err);
  let detail = 'אירעה שגיאה בקריאה או בשמירת נתוני הקורסים.';
  let status = 500;
  if (err && err.code === 'INVALID_JSON_FILE') {
    detail = 'קובץ נתוני הקורסים מכיל JSON לא תקין.';
  } else if (err && err.code === 'INVALID_DATA_FILE') {
    detail = 'מבנה קובץ נתוני הקורסים אינו תקין.';
  } else if (err && err.code === 'ENOENT') {
    detail = 'קובץ נתוני הקורסים לא נמצא.';
  } else if (err && (err.code === 'EACCES' || err.code === 'EPERM')) {
    detail = 'אין הרשאה לגשת לנתוני הקורסים.';
  } else if (err && err.code === 'FILE_LOCK_TIMEOUT') {
    status = 503;
    detail = 'נתוני הקורסים בשימוש. נסי שוב בעוד רגע.';
  }
  return res.status(status).json({ error: detail });
}

// GET /courses – החזרת כל הקורסים
async function getAll(req, res) {
  try {
    const courses = await coursesService.getAll();
    return res.status(200).json(courses);
  } catch (err) {
    return handleError(res, err);
  }
}

// GET /courses/:id – קבלת קורס בודד
async function getById(req, res) {
  try {
    const id = Number(req.params.id);
    const course = await coursesService.getById(id);
    return res.status(200).json(course);
  } catch (err) {
    return handleError(res, err);
  }
}

// POST /courses – יצירת קורס
async function create(req, res) {
  try {
    const course = await coursesService.create(req.body);
    return res.status(201).json(course);
  } catch (err) {
    return handleError(res, err);
  }
}

// PUT /courses/:id – עדכון קורס בודד
async function update(req, res) {
  try {
    const id = Number(req.params.id);
    const course = await coursesService.update(id, req.body);
    return res.status(200).json(course);
  } catch (err) {
    return handleError(res, err);
  }
}

// DELETE /courses/:id – מחיקת קורס בודד
async function remove(req, res) {
  try {
    const id = Number(req.params.id);
    await coursesService.remove(id);
    return res.status(204).send();
  } catch (err) {
    return handleError(res, err);
  }
}

module.exports = { getAll, getById, create, update, remove };
