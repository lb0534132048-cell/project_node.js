// ============================================================
// ראוטר – קורסים
// מתאים HTTP method + URL ← Controller.
// בלי לוגיקה, בלי בדיקות.
// ============================================================

const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses');

router.get('/',     coursesController.getAll);      // GET    /courses
router.get('/:id',  coursesController.getById);     // GET    /courses/:id     ← 404 אם לא קיים
router.post('/',    coursesController.create);      // POST   /courses
router.put('/:id',  coursesController.update);      // PUT    /courses/:id     ← 404 אם לא קיים
router.delete('/:id', coursesController.remove);    // DELETE /courses/:id     ← 404 אם לא קיים

module.exports = router;