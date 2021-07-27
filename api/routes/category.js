const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

router.get('/', categoryController.index);
router.get('/:id', categoryController.show);
// router.get('/:id/habits', categoryController.habits);

module.exports = router;