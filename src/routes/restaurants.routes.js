const express = require('express');
const restaurantController = require('../controllers/restaurants.controller');
const validationMiddleware = require('../middlewares/validation.middleware');
const validMiddleware = require('../middlewares/user.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const reviewController = require('../controllers/reviews.controller');

const router = express.Router();

router.route('/').get(restaurantController.getRestaurants);
router
  .route('/:id')
  .get(
    validMiddleware.validRestaurant,
    restaurantController.findRestaurantById
  );

router.use(authMiddleware.protect);
router.use(authMiddleware.renew);

router
  .route('/')
  .post(
    authMiddleware.restictTo('admin'),
    validationMiddleware.createRestaurantValidation,
    restaurantController.createRestaurant
  );

router
  .route('/:id')
  .patch(
    authMiddleware.restictTo('admin'),
    validationMiddleware.updateRestaurantValidation,
    validMiddleware.validRestaurant,
    restaurantController.updateRestaurant
  )
  .delete(
    authMiddleware.restictTo('admin'),
    validMiddleware.validRestaurant,
    restaurantController.deleteRestaurant
  );

router
  .route('/reviews/:id')
  .post(
    validationMiddleware.createReviewValidation,
    reviewController.createReview
  );
router
  .route('/reviews/:restaurant/:id')
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
