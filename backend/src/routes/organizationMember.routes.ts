import express from 'express';
import { jwtMiddleware } from '../middlewares/jwtMiddleware.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { addOrganiztionMemberController } from '../controllers/organiztionMember.controller.js';
import { organizationMemberValidation } from "../validations/organizationMember.validation.js";

const router = express.Router();

router.post('/add-member', jwtMiddleware,organizationMemberValidation, validationMiddleware, addOrganiztionMemberController);

export default router;
