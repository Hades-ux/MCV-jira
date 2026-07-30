import express from 'express';
import { loginValidation, registrationValidation } from '../validations/auth.validation.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { loginUserController, logoutController, refreshTokenRotationController, registerUserController } from '../controllers/auth.controller.js';
import { jwtMiddleware } from "../middlewares/jwtMiddleware.js";

const router = express.Router();

router.post('/register', registrationValidation, validationMiddleware, registerUserController);

router.post('/login', loginValidation, validationMiddleware, loginUserController);

router.post('/logout', jwtMiddleware,logoutController)

router.post('/refresh-token', refreshTokenRotationController)

export default router;
