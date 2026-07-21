const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses');

router.get('/',     coursesController.getAll);
router.get('/:id',  coursesController.getById);
router.post('/',    coursesController.create);
router.put('/:id',  coursesController.update);
router.delete('/:id', coursesController.remove);

module.exports = router;