// routes/analyticsRoutes.js

const express = require('express');
const { getTaskDistribution, getCompletionRate, getUpcomingDeadlines } = require('../controllers/analyticsController');

const router = express.Router();

// Analytics routes
router.get('/taskdistribution', getTaskDistribution);
router.get('/completionrate', getCompletionRate);
router.get('/upcomingdeadlines', getUpcomingDeadlines);

module.exports = router;
