// ============================================================
// שכבת הנתונים – קורסים
// שומרת וקוראת את הנתונים מקובץ JSON באופן א-סינכרוני.
// ============================================================

const path = require('path');
const createJsonFileStore = require('./jsonFileStore');

const filePath = path.join(__dirname, 'courses.json');

function validateCourses(courses) {
  if (!Array.isArray(courses)) {
    throw new Error('Course data must be an array.');
  }

  const ids = new Set();
  for (const course of courses) {
    if (
      !course ||
      typeof course !== 'object' ||
      Array.isArray(course) ||
      !Number.isSafeInteger(course.id) ||
      course.id < 1 ||
      typeof course.name !== 'string' ||
      !course.name.trim() ||
      typeof course.hours !== 'number' ||
      !Number.isFinite(course.hours) ||
      course.hours <= 0 ||
      Object.keys(course).some(key => !['id', 'name', 'hours'].includes(key)) ||
      ids.has(course.id)
    ) {
      const error = new Error('Course data contains an invalid or duplicate course.');
      error.code = 'INVALID_DATA_FILE';
      throw error;
    }
    ids.add(course.id);
  }
}

const store = createJsonFileStore(filePath, validateCourses);

function getAll() {
  return store.runExclusive(store.read);
}

function getById(id) {
  return store.runExclusive(async () => {
    const courses = await store.read();
    return courses.find(course => course.id === id) || null;
  });
}

function create(course) {
  return store.runExclusive(async () => {
    const courses = await store.read();
    const nextId = courses.reduce((maxId, current) => Math.max(maxId, current.id), 0) + 1;
    const newCourse = { ...course, id: nextId };
    courses.push(newCourse);
    await store.write(courses);
    return newCourse;
  });
}

function update(id, data) {
  return store.runExclusive(async () => {
    const courses = await store.read();
    const course = courses.find(item => item.id === id);
    if (!course) return null;

    Object.assign(course, data, { id });
    await store.write(courses);
    return course;
  });
}

function remove(id) {
  return store.runExclusive(async () => {
    const courses = await store.read();
    const index = courses.findIndex(course => course.id === id);
    if (index === -1) return false;

    courses.splice(index, 1);
    await store.write(courses);
    return true;
  });
}

module.exports = { getAll, getById, create, update, remove };
