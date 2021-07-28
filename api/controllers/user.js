const User = require('../models/User');
const UserHabit = require('../models/UserHabit')

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
        const user = await User.findUserByUsername(req.params.username);
        console.log(user)
        res.status(200).json(user.id);
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

async function addHabit(req, res) {

    const {habitId, frequencyId, startDate} = req.body

    try {
        const habit = await UserHabit.create(req.params.id, habitId, frequencyId, startDate);
        res.status(201).json(habit);
    } catch (err) {
        res.status(500).send(err);
    };
}

async function completeHabit(req,res) {
    let date = new Date();
    date = date.toISOString().split('T')[0];

    try {
        const record = await UserHabit.addHistory(req.params.userHabitId,date)
        res.status(201).json(record)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = { index, show, showHabits, addHabit, completeHabit }