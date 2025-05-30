const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Teacher = sequelize.define('Teacher', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false }
});
module.exports = Teacher;