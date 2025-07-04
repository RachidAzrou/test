const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Course = sequelize.define('Course', {
  name: { type: DataTypes.STRING, allowNull: false },
  programId: { type: DataTypes.INTEGER, allowNull: false }
});
module.exports = Course;