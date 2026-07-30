import express from 'express';
import { jwtMiddleware } from '../middlewares/jwtMiddleware.js';
import {
  changePasswordController,
  getOwnerProfileController,
  uploadAvatarController,
} from '../controllers/user.controller.js';
import { changePasswordValidation } from '../validations/user.validation.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.get('/owner-profile', jwtMiddleware, getOwnerProfileController);

router.post('/change-password', changePasswordValidation, jwtMiddleware, changePasswordController);

router.patch('/upload-avatar', jwtMiddleware, upload.single('avatar'), uploadAvatarController);

export default router;
