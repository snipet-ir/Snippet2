const express = require('express');
const router = express();
const controller = require('../../controllers/views');

router.get('/', controller.index);
router.get('/login', controller.login);

module.exports = router;
