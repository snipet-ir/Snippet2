const express = require('express');
const router = express();
const controller = require('../../controllers/views');
const auth = require('../../services/middlewares');

router.get('/', controller.index);
router.get('/login', controller.login);

module.exports = router;
