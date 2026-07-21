const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');

router.get('/',     studentsController.getAll);
router.get('/:id',  studentsController.getById);
router.post('/',    studentsController.create);
router.put('/:id',  studentsController.update);
router.delete('/:id', studentsController.remove);

module.exports = router;