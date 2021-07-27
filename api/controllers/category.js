const Habit = require('../models/Habits');

async function index(req, res) {
    console.log('test')
    try {
        const habits = await User.getAllHabits();
        console.log(habits)
        res.status(200).json(habits);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function show(req, res) {
    try {
        const users = await User.findById(req.params.id);
        const habits = await user.habits;
        res.status(200).json({ ...user, habits });
    } catch (err) {
        res.status(500).send(err);
    };
}

module.exports = { index, show }