const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user');

router.get('/', usersController.index);
router.get('/:username', usersController.show);
router.get('/:id/habits', usersController.showHabits);
router.post('/:id/habits', usersController.addHabit);
router.post('/:id/habits/:userHabitId', usersController.completeHabit);

module.exports = router;