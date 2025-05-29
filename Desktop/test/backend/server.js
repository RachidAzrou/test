const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');
const Course = require('./models/Course');
const Fee = require('./models/Fee');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', require('./routes/students'));
// Add similar routes for teachers, courses, fees...

// Initialize DB and start server
sequelize.sync({ force: false }).then(() => {
    app.listen(3001, () => console.log('Backend running on http://localhost:3001'));
});