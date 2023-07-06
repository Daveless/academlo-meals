const express = require('express');
const userController = require('../controllers/users.controller');
const authControllers = require('../controllers/auth.controller');
const validationMiddleware = require('../middlewares/validation.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware');

const router = express.Router();

router
  .route('/signup')
  .post(validationMiddleware.createUserValidation, authControllers.signUp);

router.route('/login').post(authControllers.login);

router.use(authMiddleware.protect);
router.use(authMiddleware.renew);

router.route('/orders').get(userController.getOrders);
router.route('/orders/:id').get(userController.getOrderById);

router
  .route('/:id')
  .get(userMiddleware.validUser, userController.findUserById)
  .patch(
    userMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    userController.updateUser
  )
  .delete(
    userMiddleware.validUser,
    authMiddleware.protectAccountOwner,
    userController.deleteUser
  );

module.exports = router;
