// ============================================================
// ראוטר – סטודנטים
// ============================================================

const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');

router.get('/',     studentsController.getAll);
router.get('/:id',  studentsController.getById);    // 404 אם לא קיים
router.post('/',    studentsController.create);
router.put('/:id',  studentsController.update);     // 404 אם לא קיים
router.delete('/:id', studentsController.remove);   // 404 אם לא קיים

module.exports = router;