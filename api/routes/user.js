const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user');

router.get('/', usersController.index);
//router.get('/:id', usersController.show);
router.get('/:id/habits', usersController.showHabits);
//router.post('/:id/habits', usersController.addHabit);

module.exports = router;