const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false } // 'admin', 'teacher', 'student', etc.
});
module.exports = User;