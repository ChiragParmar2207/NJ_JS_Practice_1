const express = require('express');
const { validateRequest } = require('../middlewares/route.middleware');
const authController = require('../controllers/auth.controller');
const userValidations = require('../validations/user.validation');

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateRequest(userValidations.registerSchema),
  authController.register,
);

authRouter.post(
  '/login',
  validateRequest(userValidations.loginSchema),
  authController.login,
);

module.exports = authRouter;
