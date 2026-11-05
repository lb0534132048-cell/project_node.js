// ============================================================
// קונטרולר – סטודנטים
// ============================================================

const studentsService = require('../services/students');

function handleError(res, err) {
  if (err && err.message === 'STUDENT_NOT_FOUND') {
    return res.status(404).json({ error: 'הסטודנט לא נמצא' });
  }
  if (err && err.message === 'INVALID_STUDENT_DATA') {
    return res.status(400).json({ error: 'חסרים שדות חובה: name, email' });
  }
  console.error(err);
  return res.status(500).json({ error: 'שגיאה פנימית בשרת' });
}

function getAll(req, res) {
  studentsService.getAll()
    .then(students => res.status(200).json(students))
    .catch(err => handleError(res, err));
}

// GET /students/:id – סטודנט בודד עם 404
function getById(req, res) {
  const id = Number(req.params.id);
  studentsService.getById(id)
    .then(student => res.status(200).json(student))
    .catch(err => handleError(res, err));
}

function create(req, res) {
  studentsService.create(req.body)
    .then(student => res.status(201).json(student))
    .catch(err => handleError(res, err));
}

// PUT /students/:id – עדכון עם 404
function update(req, res) {
  const id = Number(req.params.id);
  studentsService.update(id, req.body)
    .then(student => res.status(200).json(student))
    .catch(err => handleError(res, err));
}

// DELETE /students/:id – מחיקה עם 404
function remove(req, res) {
  const id = Number(req.params.id);
  studentsService.remove(id)
    .then(() => res.status(204).send())
    .catch(err => handleError(res, err));
}

module.exports = { getAll, getById, create, update, remove };
