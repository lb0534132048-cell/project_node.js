const coursesData = require('../data/courses');

function getAll() {
  return coursesData.getAll();
}

function getById(id) {
  const course = coursesData.getById(id);
  if (!course) throw new Error('COURSE_NOT_FOUND');
  return course;
}

function create(data) {
  if (!data.name || !data.hours) {
    throw new Error('חסרים שדות חובה: name, hours');
  }
  return coursesData.create(data);
}

function update(id, data) {
  const course = coursesData.update(id, data);
  if (!course) throw new Error('COURSE_NOT_FOUND');
  return course;
}

function remove(id) {
  const deleted = coursesData.remove(id);
  if (!deleted) throw new Error('COURSE_NOT_FOUND');
}

module.exports = { getAll, getById, create, update, remove };