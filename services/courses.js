// ============================================================
// שכבת השירות – קורסים
// אחראית על הלוגיקה העסקית ובדיקות תקינות.
// ============================================================

const coursesData = require('../data/courses');

function validateId(id) {
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new Error('INVALID_ID');
  }
}

function validateCourse(data, isCreate) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('INVALID_COURSE_DATA');
  }

  const keys = Object.keys(data);
  if (
    keys.length === 0 ||
    keys.some(key => !['name', 'hours'].includes(key)) ||
    (isCreate && (!Object.hasOwn(data, 'name') || !Object.hasOwn(data, 'hours')))
  ) {
    throw new Error('INVALID_COURSE_DATA');
  }

  const course = {};
  if (Object.hasOwn(data, 'name')) {
    if (typeof data.name !== 'string' || !data.name.trim()) {
      throw new Error('INVALID_COURSE_DATA');
    }
    course.name = data.name.trim();
  }
  if (Object.hasOwn(data, 'hours')) {
    if (typeof data.hours !== 'number' || !Number.isFinite(data.hours) || data.hours <= 0) {
      throw new Error('INVALID_COURSE_DATA');
    }
    course.hours = data.hours;
  }
  return course;
}

async function getAll() {
  return coursesData.getAll();
}

async function getById(id) {
  validateId(id);
  const course = await coursesData.getById(id);
  if (!course) throw new Error('COURSE_NOT_FOUND');
  return course;
}

async function create(data) {
  return coursesData.create(validateCourse(data, true));
}

async function update(id, data) {
  validateId(id);
  const course = await coursesData.update(id, validateCourse(data, false));
  if (!course) throw new Error('COURSE_NOT_FOUND');
  return course;
}

async function remove(id) {
  validateId(id);
  const deleted = await coursesData.remove(id);
  if (!deleted) throw new Error('COURSE_NOT_FOUND');
}

module.exports = { getAll, getById, create, update, remove };
