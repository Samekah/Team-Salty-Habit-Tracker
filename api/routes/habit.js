const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habit');

router.get('/', habitsController.index);
router.get('/frequency', habitsController.frequency)
router.get('/:id', habitsController.show);
router.get('/category/:id', habitsController.byCategory);

module.exports = router;