const express = require('express');
const router = express();
const controller = require('../../controllers/api/main');
const auth = require('../../services/middlewares');

router.get('/snippets', auth.check, controller.getSnippets);
router.post('/snippets', auth.check, controller.createSnippets);
router.delete('/snippets', auth.check, controller.deleteSnippets);

module.exports = router;
