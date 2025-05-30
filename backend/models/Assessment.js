const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Assessment = sequelize.define('Assessment', {
  examId: { type: DataTypes.INTEGER, allowNull: false },
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  score: { type: DataTypes.FLOAT, allowNull: false },
  remarks: { type: DataTypes.STRING }
});
module.exports = Assessment;