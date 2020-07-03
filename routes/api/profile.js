const express = require('express');
const router = express();
const controller = require('../../controllers/api/profile');
const auth = require('../../services/middlewares');

router.patch('/profile', auth.check, controller.updateProfile);

module.exports = router;
