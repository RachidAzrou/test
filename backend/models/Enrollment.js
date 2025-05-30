const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Enrollment = sequelize.define('Enrollment', {
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  batchId: { type: DataTypes.INTEGER, allowNull: false }
});
module.exports = Enrollment;