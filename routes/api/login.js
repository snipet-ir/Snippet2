const express = require('express');
const router = express();
const controller = require('../../controllers/api/login');

router.post('/login', controller.login);
router.post('/signup', controller.signup);

module.exports = router;
