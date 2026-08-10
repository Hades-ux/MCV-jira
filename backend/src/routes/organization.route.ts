import { Router, Request, Response, NextFunction } from 'express';
import { jwtMiddleware } from '../middlewares/jwtMiddleware.js';
import { createOrganiztionCntoller } from '../controllers/organiztion.controller.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { organiztionValidation } from "../validations/organization.validation.js";

const router = Router();

router.post('/create-organization', jwtMiddleware,upload.single('avatar'),organiztionValidation, validationMiddleware, createOrganiztionCntoller);

export default router;
