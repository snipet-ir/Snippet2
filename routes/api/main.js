const express = require('express');
const router = express.Router();
const controller = require('../../controllers/api/main');
const middleware = require('../../services/middlewares');
const validator = require('../../services/validator');

router.get('/snippets', validator.getSnippet, middleware.authenticationCheck, controller.getSnippets);
router.post('/snippets', validator.createSnippet, middleware.authenticationCheck, controller.createSnippets);
router.delete('/snippets', validator.deleteSnippet, middleware.authenticationCheck, controller.deleteSnippets);

module.exports = router;
