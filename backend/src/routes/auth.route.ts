import express from 'express';
import { loginValidation, registrationValidation } from '../validations/auth.validation.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { loginUserController, logoutController, registerUserController } from '../controllers/auth.controller.js';
import { jwtMiddleware } from "../middlewares/jwtMiddleware.js";

const router = express.Router();

router.post('/register', registrationValidation, validationMiddleware, registerUserController);

router.get('/login', loginValidation, validationMiddleware, loginUserController);

router.get("/logout", jwtMiddleware,logoutController)

export default router;
