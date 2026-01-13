const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/questions', gameController.getQuestions);
router.post('/answers', gameController.submitAnswer);
router.post('/hints', gameController.submitHint);
router.get('/hints', gameController.getHints);

module.exports = router;
