const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcrypt');
const Users = require('../models/users.model');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/appError');

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await Users.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: encryptedPassword,
  });

  const token = await generateJWT(user.id);

  return res.status(200).json({
    message: 'User created successfully',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({
    where: {
      email: email.toLowerCase(),
      status: 'available',
    },
  });
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    status: 'success',
    token,
    message: 'User loged successfully',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.restictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};
