const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }
  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be at least 8 characters long'),
  validFields,
];

exports.createRestaurantValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('address').notEmpty().withMessage('address cannot be empty'),
  body('rating')
    .notEmpty()
    .withMessage('rating cannot be empty')
    .isInt({ min: 1, max: 5 })
    .withMessage('rating must be a number between 1 and 5'),
  validFields,
];

exports.updateRestaurantValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('address').notEmpty().withMessage('address cannot be empty'),
  validFields,
];

exports.createReviewValidation = [
  body('comment')
    .notEmpty()
    .withMessage('comment cannot be empty')
    .isString()
    .withMessage('comment must be a string'),
  body('rating')
    .notEmpty()
    .withMessage('rating cannot be empty')
    .isInt({ min: 1, max: 5 })
    .withMessage('rating must be a number between 1 and 5'),
  validFields,
];
exports.createMealValidation = [
  body('name')
    .notEmpty()
    .withMessage('name cannot be empty')
    .isString()
    .withMessage('name must be a string'),
  body('price')
    .notEmpty()
    .withMessage('price cannot be empty')
    .isInt({ min: 1, max: 5 })
    .withMessage('price must be a number between 1 and 99'),
  validFields,
];
exports.createOrderValidation = [
  body('quantity')
    .notEmpty()
    .withMessage('quantity cannot be empty')
    .isInt({ min: 1, max: 50 })
    .withMessage('price must be a number between 1 and 50'),
  body('mealId')
    .notEmpty()
    .withMessage('mealId cannot be empty')
    .isInt()
    .withMessage('mealId must be a valid number'),
  validFields,
];
