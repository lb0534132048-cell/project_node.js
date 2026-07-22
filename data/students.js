// ============================================================
// שכבת הנתונים – סטודנטים
// ============================================================

const students = [
  { id: 1, name: 'אברהם כהן', email: 'avi@example.com' },
  { id: 2, name: 'יצחק לוי', email: 'yitz@example.com' }
];

function getAll() {
  return students;
}

function getById(id) {
  return students.find(s => s.id === id) || null;
}

function create(student) {
  const newStudent = { id: students.length + 1, ...student };
  students.push(newStudent);
  return newStudent;
}

function update(id, data) {
  const student = students.find(s => s.id === id);
  if (!student) return null;
  Object.assign(student, data);
  return student;
}

function remove(id) {
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return false;
  students.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };