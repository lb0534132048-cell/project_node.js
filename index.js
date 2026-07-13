
const http = require("http");
const chalk = require("chalk");

const courses = [
  { id: 1, name: "מבוא ל-Node.js", description: "יסודות צד שרת ו-JavaScript" },
  { id: 2, name: "פיתוח Frontend", description: "HTML, CSS ו-React" },
  { id: 3, name: "מסדי נתונים", description: "שמירת מידע עם SQL" }
];

const server = http.createServer((request, response) => {
  // הדפסה צבעונית ללוגים (בטרמינל)
  console.log(chalk.blue("רשימת הקורסים:"));
  courses.forEach((course) => {
    console.log(chalk.green(course.id + " - " + course.name + ": " + course.description));
  });

  // שליחת הרשימה לדפדפן
  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  response.write("רשימת הקורסים:\n\n");
  courses.forEach((course) => {
    response.write(course.id + " - " + course.name + ": " + course.description + "\n");
  });
  response.end();
});

server.listen(3000, () => {
  console.log(chalk.yellow("השרת רץ על http://localhost:3000"));
});
