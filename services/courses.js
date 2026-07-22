// ============================================================
// שכבת השירות – קורסים
// אחראית על הלוגיקה העסקית ובדיקות תקינות.
// זורקת שגיאות – הקונטרולר יתרגם אותן לקודי HTTP.
// ============================================================

const coursesData = require('../data/courses');

// החזרת כל הקורסים – אין בדיקות מיוחדות
function getAll() {
  return coursesData.getAll();
}

// ==========================================================
// קבלת קורס בודד – עם בדיקה שהקורס קיים
// ==========================================================
function getById(id) {
  const course = coursesData.getById(id);
  if (!course) {
    // הקורס לא נמצא – זורקים שגיאה עם קוד מזהה
    throw new Error('COURSE_NOT_FOUND');
  }
  return course;
}

// ==========================================================
// יצירת קורס – בודק ששדות חובה קיימים
// ==========================================================
function create(data) {
  if (!data.name || !data.hours) {
    throw new Error('חסרים שדות חובה: name, hours');
  }
  return coursesData.create(data);
}

// ==========================================================
// עדכון קורס – בודק קיום לפני עדכון
// ==========================================================
function update(id, data) {
  const course = coursesData.update(id, data);
  if (!course) {
    throw new Error('COURSE_NOT_FOUND');
  }
  return course;
}

// ==========================================================
// מחיקת קורס – בודק קיום לפני מחיקה
// ==========================================================
function remove(id) {
  const deleted = coursesData.remove(id);
  if (!deleted) {
    throw new Error('COURSE_NOT_FOUND');
  }
  // מחזירים true לסימון הצלחה (הקונטרולר לא מחזיר גוף ב-204)
}

module.exports = { getAll, getById, create, update, remove };