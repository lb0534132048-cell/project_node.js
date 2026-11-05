// ============================================================
// שכבת השירות – סטודנטים
// ============================================================

const studentsData = require('../data/students');

async function getAll() {
  return studentsData.getAll();
}

// קבלת סטודנט בודד – בדיקה עם 404
async function getById(id) {
  const student = await studentsData.getById(id);
  if (!student) throw new Error('STUDENT_NOT_FOUND');
  return student;
}

// יצירת סטודנט – בדיקת שדות חובה
async function create(data) {
  if (!data || !data.name || !data.email) {
    throw new Error('INVALID_STUDENT_DATA');
  }
  return studentsData.create(data);
}

// עדכון – בדיקת קיום
async function update(id, data) {
  const student = await studentsData.update(id, data);
  if (!student) throw new Error('STUDENT_NOT_FOUND');
  return student;
}

// מחיקה – בדיקת קיום
async function remove(id) {
  const deleted = await studentsData.remove(id);
  if (!deleted) throw new Error('STUDENT_NOT_FOUND');
}

module.exports = { getAll, getById, create, update, remove };