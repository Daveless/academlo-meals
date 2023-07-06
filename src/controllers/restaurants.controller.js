const catchAsync = require('../utils/catchAsync');
const Restaurants = require('../models/restaurants.model');
const AppError = require('../utils/appError');

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurants.create({
    name: name.toLowerCase(),
    address: address.toLowerCase(),
    rating,
  });

  return res.status(200).json({
    message: 'Restaurant created successfully',
    restaurant,
  });
});

exports.getRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurants.findAll({
    where: {
      status: 'active',
    },
  });

  if (!restaurants) {
    return next(new AppError(404, 'Restaurants not found'));
  }

  return res.status(200).json({
    status: 'success',
    restaurants,
  });
});

exports.findRestaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    status: 'success',
    restaurant,
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, address } = req.body;

  await restaurant.update({
    name,
    address,
  });

  res.status(200).json({
    message: 'Restaurant updated',
    restaurant,
  });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({
    status: 'inactive',
  });

  res.status(200).json({
    message: 'User deleted',
  });
});
