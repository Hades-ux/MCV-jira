import { body } from 'express-validator';

export const createOrganiztionValidation = [
  body('name')
    .notEmpty()
    .withMessage('Filed requied')
    .bail()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),

  // body('slug')
  //   .trim()
  //   .notEmpty()
  //   .withMessage('Slug is required')
  //   .isLength({ min: 3, max: 50 })
  //   .withMessage('Slug must be between 3 and 50 characters')
  //   .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  //   .withMessage('Slug can only contain lowercase letters, numbers, and single hyphens'),
];

export const updateOrganizationValidation = [
  body('name')
    .notEmpty()
    .withMessage('Filed requied')
    .bail()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
];
