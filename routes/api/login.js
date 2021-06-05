const express = require('express');
const router = express.Router();
const controller = require('../../controllers/api/login');
const middleware = require('../../services/middlewares');
const validator = require('../../services/validator');

router.post('/login', validator.login, middleware.recaptchaCheck, controller.login);
router.post('/signup', validator.signup, middleware.recaptchaCheck, controller.signup);

module.exports = router;
