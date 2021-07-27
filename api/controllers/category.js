const Category = require('../models/Category');
const Habit = require('../models/Habits');

async function index(req, res) {
    try {
        const categories = await Category.all;
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function show(req, res) {
    try {
        const category = await Category.getCategoryById(req.params.id);
        res.status(200).json(category);
    } catch (err) {
        res.status(500).send(err);
    };
}

async function habits(req,res) {
    try {
        const habits = await Habit.findByCategory(req.params.id);
        res.status(200).json(habits);
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = { index, show, habits }