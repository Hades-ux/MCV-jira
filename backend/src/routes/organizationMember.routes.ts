import express from 'express';
import { jwtMiddleware } from '../middlewares/jwtMiddleware.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import {
  addOrganiztionMemberController,
  deleteOrganizationMemberController,
} from '../controllers/organiztionMember.controller.js';
import { organizationMemberValidation } from '../validations/organizationMember.validation.js';
import { requirePermission } from '../middlewares/authorization.middleware.js';

const router = express.Router();

router.post(
  '/add-member/:orgId',
  jwtMiddleware,
  requirePermission('member:create'),
  organizationMemberValidation,
  validationMiddleware,
  addOrganiztionMemberController,
);

router.delete(
  '/delete-member',
  requirePermission('member:delete'),
  jwtMiddleware,
  deleteOrganizationMemberController,
);

export default router;
