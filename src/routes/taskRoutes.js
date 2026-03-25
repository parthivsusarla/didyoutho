const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks
} = require('../controllers/taskController');

router.post('/create', createTask);
router.get('/:groupId', getTasks);

module.exports = router;