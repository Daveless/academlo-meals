const Order = require('../models/orders.model');
const Meal = require('../models/meals.model');
const AppError = require('../utils/appError');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { id } = req.sessionUser;

  const currentMeal = await Meal.findOne({
    where: { id: mealId },
  });

  if (currentMeal.status !== 'active') {
    return next(new AppError('meal unavailable', 404));
  }

  const order = await Order.create({
    mealId,
    userId: id,
    totalPrice: currentMeal.price * quantity,
    quantity,
  });

  return res.status(200).json({
    message: 'Order created successfully',
    order,
  });
});

exports.getUserOrders = catchAsync(async (req, res, next) => {
  const { id } = req.sessionUser;
  const orders = await Order.findAll({
    where: { userId: id },
    include: [
      {
        model: Meal,
      },
    ],
  });

  return res.status(200).json({
    message: 'user orders found',
    orders,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;

  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  if (order.userId !== sessionUser.id) {
    return next(new AppError("This order doesn't belong to you", 401));
  }

  await Order.update({
    status: 'completed',
  });

  return res.status(200).json({
    message: 'order updated',
    order,
  });
});
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: {
      id,
    },
  });
  await Order.update({
    status: 'cancelled',
  });

  return res.status(200).json({
    message: 'order delleted',
    order,
  });
});
