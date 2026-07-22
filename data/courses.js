// ============================================================
// שכבת הנתונים – קורסים
// אחראית על האחסון בלבד. מקבלת נתונים, מחזירה נתונים.
// לא בודקת, לא מאמתת, לא חושבת.
// ============================================================

// מערך שמדמה בסיס נתונים בזיכרון
const courses = [
  { id: 1, name: 'nodejs', hours: 40 },
  { id: 2, name: 'python', hours: 30 },
  { id: 3, name: 'react', hours: 35 }
];

// החזרת כל הקורסים
function getAll() {
  return courses;
}

// חיפוש קורס לפי id – מחזיר את הקורס או null אם לא קיים
function getById(id) {
  return courses.find(c => c.id === id) || null;
}

// יצירת קורס חדש – מוסיף id אוטומטי
function create(course) {
  const newCourse = { id: courses.length + 1, ...course };
  courses.push(newCourse);
  return newCourse;
}

// עדכון קורס קיים – מחזיר את הקורס המעודכן או null
function update(id, data) {
  const course = courses.find(c => c.id === id);
  if (!course) return null;             // לא נמצא – מחזירים null
  Object.assign(course, data);          // מעדכנים את השדות
  return course;
}

// מחיקת קורס – מחזיר true אם נמחק, false אם לא נמצא
function remove(id) {
  const index = courses.findIndex(c => c.id === id);
  if (index === -1) return false;       // לא נמצא
  courses.splice(index, 1);            // מוחקים מהמערך
  return true;
}

module.exports = { getAll, getById, create, update, remove };