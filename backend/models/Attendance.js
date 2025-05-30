const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Attendance = sequelize.define('Attendance', {
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  courseId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM('Present', 'Absent', 'Excused'), defaultValue: 'Present' }
});
module.exports = Attendance;