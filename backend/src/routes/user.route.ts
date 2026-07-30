import express from 'express';
import { jwtMiddleware } from '../middlewares/jwtMiddleware.js';
import { changePasswordController, getOwnerProfileController } from '../controllers/user.controller.js';
import { changePasswordValidation } from "../validations/user.validation.js";

const router = express.Router();

router.get('/owner-profile', jwtMiddleware, getOwnerProfileController);

router.post('/change-password',changePasswordValidation, jwtMiddleware, changePasswordController)

export default router;
