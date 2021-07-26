const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user');

router.get('/', usersController.index);
router.get('/:id/habits', usersController.show);
//router.post('/:id/habits/:habitId', usersController.addHabit);

module.exports = router;