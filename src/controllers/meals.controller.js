const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Meals = require('../models/meals.model');

exports.createMeals = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const meal = await Meals.create({
    name,
    price,
    restaurantId: id,
  });

  return res.status(200).json({
    message: 'Meals created successfully',
    meal,
  });
});
exports.getMeals = catchAsync(async (req, res, next) => {
  const meals = await Meals.findAll({
    where: {
      status: 'active',
    },
  });

  return res.status(200).json({
    message: 'Meals found',
    meals,
  });
});
exports.getmealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meals = await Meals.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  return res.status(200).json({
    message: 'Meals found',
    meals,
  });
});

exports.updateMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const currentMeal = await Meals.findOne({
    id,
    status: 'available',
  });

  const { name, price } = req.body;

  await currentMeal.update({
    name,
    price,
  });

  res.status(200).json({
    message: 'Meal updated',
    currentMeal,
  });
});
exports.deleteMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const currentMeal = await Meals.findOne({
    id,
    status: 'available',
  });

  await currentMeal.update({
    status: 'inactive',
  });

  res.status(200).json({
    message: 'Meal deleted',
    currentMeal,
  });
});
