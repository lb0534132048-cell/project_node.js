// ============================================================
// קונטרולר – קורסים
// מתרגם HTTP ←→ Service.
// ============================================================

const coursesService = require('../services/courses');

function handleError(res, err) {
  if (err && err.message === 'COURSE_NOT_FOUND') {
    return res.status(404).json({ error: 'הקורס לא נמצא' });
  }
  if (err && err.message === 'INVALID_COURSE_DATA') {
    return res.status(400).json({ error: 'חסרים שדות חובה: name, hours' });
  }
  console.error(err);
  return res.status(500).json({ error: 'שגיאה פנימית בשרת' });
}

// GET /courses – החזרת כל הקורסים
function getAll(req, res) {
  coursesService.getAll()
    .then(courses => res.status(200).json(courses))
    .catch(err => handleError(res, err));
}

// GET /courses/:id – קבלת קורס בודד
function getById(req, res) {
  const id = Number(req.params.id);
  coursesService.getById(id)
    .then(course => res.status(200).json(course))
    .catch(err => handleError(res, err));
}

// POST /courses – יצירת קורס
function create(req, res) {
  coursesService.create(req.body)
    .then(course => res.status(201).json(course))
    .catch(err => handleError(res, err));
}

// PUT /courses/:id – עדכון קורס בודד
function update(req, res) {
  const id = Number(req.params.id);
  coursesService.update(id, req.body)
    .then(course => res.status(200).json(course))
    .catch(err => handleError(res, err));
}

// DELETE /courses/:id – מחיקת קורס בודד
function remove(req, res) {
  const id = Number(req.params.id);
  coursesService.remove(id)
    .then(() => res.status(204).send())
    .catch(err => handleError(res, err));
}

module.exports = { getAll, getById, create, update, remove };
