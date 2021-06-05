const express = require('express');
const router = express.Router();
const controller = require('../../controllers/api/profile');
const middleware = require('../../services/middlewares');
const validator = require('../../services/validator');

router.patch('/profile', validator.updateProfile, middleware.authenticationCheck, controller.updateProfile);

module.exports = router;
