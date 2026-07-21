const courses = [
  { id: 1, name: 'nodejs', hours: 40 },
  { id: 2, name: 'python', hours: 30 },
  { id: 3, name: 'react', hours: 35 }
];

function getAll() {
  return courses;
}

function getById(id) {
  return courses.find(c => c.id === id) || null;
}

function create(course) {
  const newCourse = { id: courses.length + 1, ...course };
  courses.push(newCourse);
  return newCourse;
}

function update(id, data) {
  const course = courses.find(c => c.id === id);
  if (!course) return null;
  Object.assign(course, data);
  return course;
}

function remove(id) {
  const index = courses.findIndex(c => c.id === id);
  if (index === -1) return false;
  courses.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };