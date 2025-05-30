const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Guardian = sequelize.define('Guardian', {
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING }
});
module.exports = Guardian;