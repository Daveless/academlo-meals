const express = require('express');
const mealsController = require('../controllers/meals.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');

const router = express.Router();

router.route('/').get(mealsController.getMeals);
router.route('/:id').get(mealsController.getmealById);

router.use(authMiddleware.protect);
router.use(authMiddleware.renew);

router
  .route('/:id')
  .post(
    authMiddleware.restictTo('admin'),
    validationMiddleware.createMealValidation,
    mealsController.createMeals
  )
  .patch(authMiddleware.restictTo('admin'), mealsController.updateMeal)
  .delete(authMiddleware.restictTo('admin'), mealsController.deleteMeal);

module.exports = router;
