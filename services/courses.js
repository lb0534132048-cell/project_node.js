// ============================================================
// שכבת השירות – קורסים
// אחראית על הלוגיקה העסקית ובדיקות תקינות.
// זורקת שגיאות – הקונטרולר יתרגם אותן לקודי HTTP.
// ============================================================

const coursesData = require('../data/courses');

// החזרת כל הקורסים – אין בדיקות מיוחדות
async function getAll() {
  return coursesData.getAll();
}

// ==========================================================
// קבלת קורס בודד – עם בדיקה שהקורס קיים
// ==========================================================
async function getById(id) {
  const course = await coursesData.getById(id);
  if (!course) {
    // הקורס לא נמצא – זורקים שגיאה עם קוד מזהה
    throw new Error('COURSE_NOT_FOUND');
  }
  return course;
}

// ==========================================================
// יצירת קורס – בודק ששדות חובה קיימים
// ==========================================================
async function create(data) {
  if (!data || !data.name || !data.hours) {
    throw new Error('INVALID_COURSE_DATA');
  }
  return coursesData.create(data);
}

// ==========================================================
// עדכון קורס – בודק קיום לפני עדכון
// ==========================================================
async function update(id, data) {
  const course = await coursesData.update(id, data);
  if (!course) {
    throw new Error('COURSE_NOT_FOUND');
  }
  return course;
}

// ==========================================================
// מחיקת קורס – בודק קיום לפני מחיקה
// ==========================================================
async function remove(id) {
  const deleted = await coursesData.remove(id);
  if (!deleted) {
    throw new Error('COURSE_NOT_FOUND');
  }
  // מחזירים true לסימון הצלחה (הקונטרולר לא מחזיר גוף ב-204)
}

module.exports = { getAll, getById, create, update, remove };