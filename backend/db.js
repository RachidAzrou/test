const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('education_db', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql', // of 'postgres', 'sqlite', enz.
  logging: false
});
module.exports = sequelize;