const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Batch = sequelize.define('Batch', {
  name: { type: DataTypes.STRING, allowNull: false },
  programId: { type: DataTypes.INTEGER, allowNull: false }
});
module.exports = Batch;