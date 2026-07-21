const express = require('express');
const app = express();

app.use(express.json());

app.use('/courses', require('./routes/courses'));
app.use('/students', require('./routes/students'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`השרת רץ על http://localhost:${PORT}`);
});