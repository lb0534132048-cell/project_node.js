// ============================================================
// קונטרולר – סטודנטים
// ============================================================

const studentsService = require('../services/students');

function handleError(res, err) {
  if (err && err.message === 'STUDENT_NOT_FOUND') {
    return res.status(404).json({ error: 'הסטודנט לא נמצא' });
  }
  if (err && (err.message === 'INVALID_ID' || err.message === 'INVALID_STUDENT_DATA')) {
    return res.status(400).json({ error: 'המזהה או פרטי הסטודנט אינם תקינים.' });
  }

  console.error(err);
  let detail = 'אירעה שגיאה בקריאה או בשמירת נתוני הסטודנטים.';
  let status = 500;
  if (err && err.code === 'INVALID_JSON_FILE') {
    detail = 'קובץ נתוני הסטודנטים מכיל JSON לא תקין.';
  } else if (err && err.code === 'INVALID_DATA_FILE') {
    detail = 'מבנה קובץ נתוני הסטודנטים אינו תקין.';
  } else if (err && err.code === 'ENOENT') {
    detail = 'קובץ נתוני הסטודנטים לא נמצא.';
  } else if (err && (err.code === 'EACCES' || err.code === 'EPERM')) {
    detail = 'אין הרשאה לגשת לנתוני הסטודנטים.';
  } else if (err && err.code === 'FILE_LOCK_TIMEOUT') {
    status = 503;
    detail = 'נתוני הסטודנטים בשימוש. נסי שוב בעוד רגע.';
  }
  return res.status(status).json({ error: detail });
}

async function getAll(req, res) {
  try {
    const students = await studentsService.getAll();
    return res.status(200).json(students);
  } catch (err) {
    return handleError(res, err);
  }
}

// GET /students/:id – סטודנט בודד עם 404
async function getById(req, res) {
  try {
    const id = Number(req.params.id);
    const student = await studentsService.getById(id);
    return res.status(200).json(student);
  } catch (err) {
    return handleError(res, err);
  }
}

async function create(req, res) {
  try {
    const student = await studentsService.create(req.body);
    return res.status(201).json(student);
  } catch (err) {
    return handleError(res, err);
  }
}

// PUT /students/:id – עדכון עם 404
async function update(req, res) {
  try {
    const id = Number(req.params.id);
    const student = await studentsService.update(id, req.body);
    return res.status(200).json(student);
  } catch (err) {
    return handleError(res, err);
  }
}

// DELETE /students/:id – מחיקה עם 404
async function remove(req, res) {
  try {
    const id = Number(req.params.id);
    await studentsService.remove(id);
    return res.status(204).send();
  } catch (err) {
    return handleError(res, err);
  }
}

module.exports = { getAll, getById, create, update, remove };
