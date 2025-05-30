const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Fee = sequelize.define('Fee', {
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'Unpaid' }
});
module.exports = Fee;