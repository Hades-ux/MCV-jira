import express from 'express';
import { jwtMiddleware } from '../middlewares/jwtMiddleware.js';
import { getOwnerProfileController } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/owner-profile', jwtMiddleware, getOwnerProfileController);

export default router;
