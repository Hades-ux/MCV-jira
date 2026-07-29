import express from 'express';
import { loginValidation, registrationValidation } from '../validations/auth.validation.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { loginUserController, registerUserController } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registrationValidation, validationMiddleware, registerUserController);

router.get('/login', loginValidation, validationMiddleware, loginUserController);

export default router;
