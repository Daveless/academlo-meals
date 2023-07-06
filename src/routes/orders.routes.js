const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const orderscontroller = require('../controllers/orders.controller');
const validationmiddleware = require('../middlewares/validation.middleware');

const router = express.Router();

router.use(authMiddleware.protect);
router.use(authMiddleware.renew);

router
  .route('/')
  .post(
    validationmiddleware.createOrderValidation,
    orderscontroller.createOrder
  );
router.route('/me').get(orderscontroller.getUserOrders);

router.route('/:id').patch(orderscontroller.updateOrder);

router.route('/:id').delete(orderscontroller.deleteOrder);

module.exports = router;
