const express = require('express');
const router = express();
const controller = require('../../controllers/api/profile');
const auth = require('../../services/middlewares');
const validator = require('../../services/validator');

router.patch('/profile', validator.updateProfile, auth.check, controller.updateProfile);

module.exports = router;
