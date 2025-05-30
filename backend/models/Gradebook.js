const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Gradebook = sequelize.define('Gradebook', {
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  courseId: { type: DataTypes.INTEGER, allowNull: false },
  grade: { type: DataTypes.STRING, allowNull: false },
  remarks: { type: DataTypes.STRING }
});
module.exports = Gradebook;