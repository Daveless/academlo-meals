const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routes/users.routes.js');
const globalErrorHandler = require('./controllers/error.controller.js');
const AppError = require('./utils/appError.js');
const orderRouter = require('./routes/orders.routes.js');
const restaurantRouter = require('./routes/restaurants.routes.js');
const mealsRouter = require('./routes/meals.routes.js');

const app = express();
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in on hour',
});

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/', limiter);

//routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/restaurant', restaurantRouter);
app.use('/api/v1/meals', mealsRouter);

//error handler
app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cant find ${req.originalUrl} on this server!`, 404)
  );
});
app.use(globalErrorHandler);

module.exports = app;
