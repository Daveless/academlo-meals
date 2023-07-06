const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const reviews = db.define('reviews', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  comment: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  restaurantId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  rating: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  rating: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
});

module.exports = reviews;
