const Category = require('../models/Category');

async function index(req, res) {
    try {
        const categories = await Category.all;
        console.log(categories)
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

module.exports = { index, show }