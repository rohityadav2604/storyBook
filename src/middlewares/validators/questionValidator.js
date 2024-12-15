import { body, validationResult } from 'express-validator';

export const questionValidator = [
  // Validate ID
  body('question')
    .notEmpty()
    .isString()
    .trim(),

  body('pdfId')
    .notEmpty()
    .isString()
    .trim(),

  // Middleware to handle validation results
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
