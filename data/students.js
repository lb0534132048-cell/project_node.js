// ============================================================
// שכבת הנתונים – סטודנטים
// שומרת וקוראת את הנתונים מקובץ JSON באופן א-סינכרוני.
// ============================================================

const path = require('path');
const createJsonFileStore = require('./jsonFileStore');

const filePath = path.join(__dirname, 'students.json');

function validateStudents(students) {
  if (!Array.isArray(students)) {
    throw new Error('Student data must be an array.');
  }

  const ids = new Set();
  for (const student of students) {
    if (
      !student ||
      typeof student !== 'object' ||
      Array.isArray(student) ||
      !Number.isSafeInteger(student.id) ||
      student.id < 1 ||
      typeof student.name !== 'string' ||
      !student.name.trim() ||
      typeof student.email !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email) ||
      Object.keys(student).some(key => !['id', 'name', 'email'].includes(key)) ||
      ids.has(student.id)
    ) {
      const error = new Error('Student data contains an invalid or duplicate student.');
      error.code = 'INVALID_DATA_FILE';
      throw error;
    }
    ids.add(student.id);
  }
}

const store = createJsonFileStore(filePath, validateStudents);

function getAll() {
  return store.runExclusive(store.read);
}

function getById(id) {
  return store.runExclusive(async () => {
    const students = await store.read();
    return students.find(student => student.id === id) || null;
  });
}

function create(student) {
  return store.runExclusive(async () => {
    const students = await store.read();
    const nextId = students.reduce((maxId, current) => Math.max(maxId, current.id), 0) + 1;
    const newStudent = { ...student, id: nextId };
    students.push(newStudent);
    await store.write(students);
    return newStudent;
  });
}

function update(id, data) {
  return store.runExclusive(async () => {
    const students = await store.read();
    const student = students.find(item => item.id === id);
    if (!student) return null;

    Object.assign(student, data, { id });
    await store.write(students);
    return student;
  });
}

function remove(id) {
  return store.runExclusive(async () => {
    const students = await store.read();
    const index = students.findIndex(student => student.id === id);
    if (index === -1) return false;

    students.splice(index, 1);
    await store.write(students);
    return true;
  });
}

module.exports = { getAll, getById, create, update, remove };
