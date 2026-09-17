import express from 'express';
import { jwtMiddleware } from '../middlewares/jwtMiddleware.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import {
  addOrganiztionMemberController,
  deleteOrganizationMemberController,
  getOrganizationMemberController,
} from '../controllers/organiztionMember.controller.js';
import { organizationMemberValidation } from '../validations/organizationMember.validation.js';
import { requirePermission } from '../middlewares/authorization.middleware.js';

const router = express.Router();

//add member
router.post(
  '/add-member/:orgId',
  jwtMiddleware,
  requirePermission('member:create'),
  organizationMemberValidation,
  validationMiddleware,
  addOrganiztionMemberController,
);

//soft delete member
router.delete(
  '/delete-member/:orgId',
  jwtMiddleware,
  requirePermission('member:delete'),
  deleteOrganizationMemberController,
);

//get all member of orgainzation
router.get(
  '/get-allmembers/:orgId',
  jwtMiddleware,
  requirePermission('member:getAll'),
  getOrganizationMemberController,
);

export default router;
