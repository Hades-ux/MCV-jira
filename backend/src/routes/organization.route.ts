import { Router } from 'express';
import { jwtMiddleware } from '../middlewares/jwtMiddleware.js';
import {
  createOrganiztionController,
  updateOrganizationController,
} from '../controllers/organiztion.controller.js';
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import {
  createOrganiztionValidation,
  updateOrganizationValidation,
} from '../validations/organization.validation.js';
import { requirePermission } from '../middlewares/authorization.middleware.js';

const router = Router();

router.post(
  '/create-organization',
  jwtMiddleware,
  upload.single('avatar'),
  createOrganiztionValidation,
  validationMiddleware,
  createOrganiztionController,
);

router.patch(
  '/update-organization',
  jwtMiddleware,
  requirePermission('organization:update'),
  upload.single('logo'),
  updateOrganizationValidation,
  validationMiddleware,
  updateOrganizationController,
);

export default router;
