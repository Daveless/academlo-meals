const AppError = require('../utils/appError');

const handleCastError23505 = () => {
  new AppError('Duplicate field value: please use another value', 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.statud,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'fail',
      message: 'something went wrong',
    });
  }
};

globalErrorHandler = (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let error = err;

    if (error.parent.code === '23505') error = handleCastError23505();

    sendErrorProd(err, res);
  }
};

module.exports = globalErrorHandler;
