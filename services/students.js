// ============================================================
// שכבת השירות – סטודנטים
// ============================================================

const studentsData = require('../data/students');

function getAll() {
  return studentsData.getAll();
}

// קבלת סטודנט בודד – בדיקה עם 404
function getById(id) {
  const student = studentsData.getById(id);
  if (!student) throw new Error('STUDENT_NOT_FOUND');
  return student;
}

// יצירת סטודנט – בדיקת שדות חובה
function create(data) {
  if (!data.name || !data.email) {
    throw new Error('חסרים שדות חובה: name, email');
  }
  return studentsData.create(data);
}

// עדכון – בדיקת קיום
function update(id, data) {
  const student = studentsData.update(id, data);
  if (!student) throw new Error('STUDENT_NOT_FOUND');
  return student;
}

// מחיקה – בדיקת קיום
function remove(id) {
  const deleted = studentsData.remove(id);
  if (!deleted) throw new Error('STUDENT_NOT_FOUND');
}

module.exports = { getAll, getById, create, update, remove };