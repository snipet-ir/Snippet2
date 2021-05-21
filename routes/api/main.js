const express = require('express');
const router = express();
const controller = require('../../controllers/api/main');
const auth = require('../../services/middlewares');
const validator = require('../../services/validator');

router.get('/snippets', validator.getSnippet, auth.check, controller.getSnippets);
router.post('/snippets', validator.createSnippet, auth.check, controller.createSnippets);
router.delete('/snippets', validator.deleteSnippet, auth.check, controller.deleteSnippets);

module.exports = router;
