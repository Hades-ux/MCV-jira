import { body } from 'express-validator';

export const organizationMemberValidation = [
  body('email')
    .notEmpty()
    .withMessage('Field cannot be empty')
    .trim()
    .normalizeEmail()
    .bail()
    .isEmail()
    .withMessage('Enter valid email'),
];
