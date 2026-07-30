import { body } from 'express-validator';

export const changePasswordValidation = [
    body('newPassword')
    .notEmpty()
    .withMessage('Field cannot be empty')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password must be minimum 8 characters'),

    body('oldPassword')
    .notEmpty()
    .withMessage('Field cannot be empty')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password must be minimum 8 characters'),
]