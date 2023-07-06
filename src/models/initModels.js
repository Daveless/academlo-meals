const User = require('./users.model');
const Order = require('./orders.model');
const Meals = require('./meals.model');
const Restaurants = require('./restaurants.model');
const Reviews = require('./reviews.model');

const initModel = () => {
  User.hasMany(Order);
  Order.belongsTo(User);

  User.hasMany(Reviews);
  Reviews.belongsTo(User);

  Restaurants.hasMany(Reviews);
  Reviews.belongsTo(Restaurants);

  Restaurants.hasMany(Meals);
  Meals.belongsTo(Restaurants);

  Meals.hasOne(Order);
  Order.belongsTo(Meals);
};

module.exports = initModel;
