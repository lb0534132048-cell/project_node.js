// ============================================================
// קונטרולר – סטודנטים
// ============================================================

const studentsService = require('../services/students');

function getAll(req, res) {
  res.status(200).json(studentsService.getAll());
}

// GET /students/:id – סטודנט בודד עם 404
function getById(req, res) {
  try {
    const id = Number(req.params.id);
    res.status(200).json(studentsService.getById(id));
  } catch (err) {
    if (err.message === 'STUDENT_NOT_FOUND') {
      return res.status(404).json({ error: 'הסטודנט לא נמצא' });
    }
    res.status(500).json({ error: err.message });
  }
}

function create(req, res) {
  try {
    res.status(201).json(studentsService.create(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// PUT /students/:id – עדכון עם 404
function update(req, res) {
  try {
    const id = Number(req.params.id);
    res.status(200).json(studentsService.update(id, req.body));
  } catch (err) {
    if (err.message === 'STUDENT_NOT_FOUND') {
      return res.status(404).json({ error: 'הסטודנט לא נמצא' });
    }
    res.status(500).json({ error: err.message });
  }
}

// DELETE /students/:id – מחיקה עם 404
function remove(req, res) {
  try {
    const id = Number(req.params.id);
    studentsService.remove(id);
    res.status(204).send();
  } catch (err) {
    if (err.message === 'STUDENT_NOT_FOUND') {
      return res.status(404).json({ error: 'הסטודנט לא נמצא' });
    }
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAll, getById, create, update, remove };