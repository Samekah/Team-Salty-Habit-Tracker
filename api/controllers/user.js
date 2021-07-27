const User = require('../models/User');

async function index(req, res) {
    try {
        const users = await User.getAllUserData();
        res.status(200).json(users);
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

async function showHabits(req, res) {
    try {
        const habits = await User.findAUsersHabitsById(req.params.id);
        res.status(200).json(habits);
    } catch (err) {
        res.status(500).send(err);
    };
}

module.exports = { index, show, showHabits }