// analyticsController.js
const Task = require('../models/Task');

// Route to get task distribution
exports.getTaskDistribution = async (req, res) => {
    try {
        const distribution = await Task.aggregate([
            { $group: { _id: "$priority", count: { $sum: 1 } } }
        ]);
        res.json(distribution);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Route to get completion rate
exports.getCompletionRate = async (req, res) => {
    try {
        const totalTasks = await Task.countDocuments();
        const completedTasks = await Task.countDocuments({  completed: true  });
        res.json({ totalTasks, completedTasks });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Route to get upcoming deadlines
exports.getUpcomingDeadlines = async (req, res) => {
    try {
        const upcomingTasks = await Task.find({ dueDate: { $gte: new Date() } })
            .sort({ dueDate: 1 })
            .limit(10);
        res.json(upcomingTasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
