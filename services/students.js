// ============================================================
// שכבת השירות – סטודנטים
// ============================================================

const studentsData = require('../data/students');

function validateId(id) {
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new Error('INVALID_ID');
  }
}

function validateStudent(data, isCreate) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('INVALID_STUDENT_DATA');
  }

  const keys = Object.keys(data);
  if (
    keys.length === 0 ||
    keys.some(key => !['name', 'email'].includes(key)) ||
    (isCreate && (!Object.hasOwn(data, 'name') || !Object.hasOwn(data, 'email')))
  ) {
    throw new Error('INVALID_STUDENT_DATA');
  }

  const student = {};
  if (Object.hasOwn(data, 'name')) {
    if (typeof data.name !== 'string' || !data.name.trim()) {
      throw new Error('INVALID_STUDENT_DATA');
    }
    student.name = data.name.trim();
  }
  if (Object.hasOwn(data, 'email')) {
    if (
      typeof data.email !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    ) {
      throw new Error('INVALID_STUDENT_DATA');
    }
    student.email = data.email;
  }
  return student;
}

async function getAll() {
  return studentsData.getAll();
}

async function getById(id) {
  validateId(id);
  const student = await studentsData.getById(id);
  if (!student) throw new Error('STUDENT_NOT_FOUND');
  return student;
}

async function create(data) {
  return studentsData.create(validateStudent(data, true));
}

async function update(id, data) {
  validateId(id);
  const student = await studentsData.update(id, validateStudent(data, false));
  if (!student) throw new Error('STUDENT_NOT_FOUND');
  return student;
}

async function remove(id) {
  validateId(id);
  const deleted = await studentsData.remove(id);
  if (!deleted) throw new Error('STUDENT_NOT_FOUND');
}

module.exports = { getAll, getById, create, update, remove };
