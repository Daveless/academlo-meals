const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviews.model');
const AppError = require('../utils/appError');

exports.createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { id } = req.params;
  const { sessionUser } = req;

  const review = await Review.create({
    userId: sessionUser.id,
    comment,
    restaurantId: id,
    rating,
  });

  return res.status(200).json({
    message: 'Review created successfully',
    review,
  });
});
exports.updateReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { id } = req.params;
  const { sessionUser } = req;

  const currentReview = await Review.findOne({
    where: {
      id,
    },
  });
  if (sessionUser.id != currentReview.userId) {
    return next(new AppError("This review doesn't belong to the user", 401));
  }

  await currentReview.update({
    comment,
    rating,
  });

  return res.status(200).json({
    message: 'Review updated',
    currentReview,
  });
});
exports.deleteReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;

  const currentReview = await Review.findOne({
    where: {
      id,
    },
  });
  if (sessionUser.id != currentReview.userId) {
    return next(new AppError("This review doesn't belong to the user", 401));
  }

  await currentReview.update({
    status: 'deleted',
  });

  return res.status(200).json({
    message: 'Review updated',
    currentReview,
  });
});
