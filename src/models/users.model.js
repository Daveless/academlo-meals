const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const users = db.define('users', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'available',
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'normal',
  },
});

module.exports = users;
