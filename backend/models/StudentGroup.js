const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const StudentGroup = sequelize.define('StudentGroup', {
  name: { type: DataTypes.STRING, allowNull: false },
  batchId: { type: DataTypes.INTEGER, allowNull: false }
});
module.exports = StudentGroup;s