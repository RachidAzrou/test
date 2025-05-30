const express = require('express');
const cors = require('cors');
const sequelize = require('./db');

// Models
require('./models/User');
require('./models/Student');
require('./models/Teacher');
require('./models/Guardian');
require('./models/Program');
require('./models/Batch');
require('./models/Course');
require('./models/Enrollment');
require('./models/Fee');
require('./models/Attendance');
require('./models/Exam');
require('./models/Assessment');
require('./models/Timetable');
require('./models/StudentGroup');
require('./models/StudentGroupMember');
require('./models/Gradebook');
require('./models/Notification');

// Routes
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/teachers', require('./routes/teachers'));
app.use('/api/guardians', require('./routes/guardians'));
app.use('/api/programs', require('./routes/programs'));
app.use('/api/batches', require('./routes/batches'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/enrollments', require('./routes/enrollments'));
app.use('/api/fees', require('./routes/fees'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/exams', require('./routes/exams'));
app.use('/api/assessments', require('./routes/assessments'));
app.use('/api/timetable', require('./routes/timetable'));
app.use('/api/studentgroups', require('./routes/studentgroups'));
app.use('/api/studentgroupmembers', require('./routes/studentgroupmembers'));
app.use('/api/gradebook', require('./routes/gradebook'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/notifications', require('./routes/notifications'));

// Database sync & server start
sequelize.sync({ force: false }).then(() => {
  app.listen(3001, () => console.log('Backend running on http://localhost:3001'));
});