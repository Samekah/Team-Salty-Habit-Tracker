const Habit = require('../models/Habits');

async function index(req, res) {
    try {
        const habits = await Habit.all;
        res.status(200).json(habits);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function show(req, res) {
    try {
        const habit = await Habit.findById(req.params.id);
        res.status(200).json(habit);
    } catch (err) {
        res.status(500).send(err);
    };
}


async function byCategory(req, res) {
    try {
        const habits = await Habit.findByCategory(req.params.id);
        res.status(200).json(habits);
    } catch (err) {
        res.status(500).send(err);
    };
}

module.exports = { index, show, byCategory }