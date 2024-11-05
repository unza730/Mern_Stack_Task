const { body, validationResult } = require('express-validator');

exports.validateRegistration = [
  body('username').isString().notEmpty(),
  body('password').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
