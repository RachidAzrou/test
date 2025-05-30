const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Exam = sequelize.define('Exam', {
  courseId: { type: DataTypes.INTEGER, allowNull: false },
  batchId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false }
});
module.exports = Exam;