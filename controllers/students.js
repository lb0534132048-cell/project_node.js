const coursesService = require('../services/courses');

function getAll(req, res) {
  const courses = coursesService.getAll();
  res.json(courses);
}

function getById(req, res) {
  try {
    const id = Number(req.params.id);
    const course = coursesService.getById(id);
    res.json(course);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

function create(req, res) {
  try {
    const course = coursesService.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

function update(req, res) {
  try {
    const id = Number(req.params.id);
    const course = coursesService.update(id, req.body);
    res.json(course);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

function remove(req, res) {
  try {
    const id = Number(req.params.id);
    coursesService.remove(id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = { getAll, getById, create, update, remove };