import { body, validationResult } from 'express-validator';

export const uploadValidator = [
  // Validate ID
  body('id')
    .notEmpty()
    .withMessage('ID is required')
    .isString()
    .withMessage('ID must be a string')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('ID must be between 1 and 255 characters'),

  // Middleware to handle validation results
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
