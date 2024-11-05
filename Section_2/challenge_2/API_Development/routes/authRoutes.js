const express = require('express');
const validate = require('../middleware/validate');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', validate.validateRegistration, authController.register);
router.post('/login', authController.login);

module.exports = router;
