const Users = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const Orders = require('../models/orders.model');
const Restaurants = require('../models/restaurants.model');
const Meals = require('../models/meals.model');

exports.findUsers = catchAsync(async (req, res, next) => {
  const users = await Users.findAll({
    where: {
      status: 'available',
    },
    include: [{ model: Orders }],
  });

  res.status(200).json({
    message: 'Users found',
    results: users.length,
    users,
  });
});

exports.findUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    status: 'success',
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({
    name,
    email,
  });

  res.status(200).json({
    message: 'User updated',
    user,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({
    status: 'unavailable',
  });

  res.status(200).json({
    message: 'User deleted',
  });
});

exports.getOrders = catchAsync(async (req, res, next) => {
  const { id } = req.sessionUser;
  const orders = await Orders.findAll({
    where: {
      userId: id,
    },
    include: [
      {
        model: Meals,
      },
    ],
  });

  res.status(200).json({
    message: 'Orders found',
    orders,
  });
});

exports.getOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.sessionUser.id;

  const orderById = await Orders.findOne({
    where: {
      id,
      userId,
    },
  });

  res.status(200).json({
    message: orderById ? 'order found' : 'Order not found',
    orderById,
  });
});
