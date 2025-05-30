const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const StudentGroupMember = sequelize.define('StudentGroupMember', {
  studentGroupId: { type: DataTypes.INTEGER, allowNull: false },
  studentId: { type: DataTypes.INTEGER, allowNull: false }
});
module.exports = StudentGroupMember;