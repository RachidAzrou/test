const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Program = sequelize.define('Program', {
  name: { type: DataTypes.STRING, allowNull: false }
});
module.exports = Program;