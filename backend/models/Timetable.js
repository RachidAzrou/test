const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Timetable = sequelize.define('Timetable', {
  courseId: { type: DataTypes.INTEGER, allowNull: false },
  teacherId: { type: DataTypes.INTEGER, allowNull: false },
  batchId: { type: DataTypes.INTEGER, allowNull: false },
  day: { type: DataTypes.STRING, allowNull: false },
  startTime: { type: DataTypes.TIME, allowNull: false },
  endTime: { type: DataTypes.TIME, allowNull: false }
});
module.exports = Timetable;