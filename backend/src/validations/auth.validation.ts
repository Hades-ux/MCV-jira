import { body } from 'express-validator';

export const registrationValidation = [
  body('firstName')
    .notEmpty()
    .withMessage('First Name is required')
    .bail()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),

  body('lastName')
    .notEmpty()
    .withMessage('Last Name is required')
    .bail()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),

  body('email')
    .notEmpty()
    .withMessage('Field cannot be empty')
    .trim()
    .normalizeEmail()
    .bail()
    .isEmail()
    .withMessage('Enter valid email'),

  body('password')
    .notEmpty()
    .withMessage('Field cannot be empty')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Password must be minimum 8 characters'),
];

export const loginValidation = [
  body('email')
    .notEmpty()
    .withMessage('Field cannot be empty')
    .trim()
    .normalizeEmail()
    .bail()
    .isEmail()
    .withMessage('Enter valid email'),

  body('password')
    .notEmpty()
    .withMessage('Field cannot be empty')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Password must be minimum 8 characters'),
];