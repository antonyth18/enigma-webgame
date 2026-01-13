const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

const authMiddleware = require('../middlewares/authMiddleware');

router.get('/leaderboard', teamController.getLeaderboard);
router.get('/me', authMiddleware, teamController.getMyTeam);
router.get('/:id', teamController.getTeam);

module.exports = router;
