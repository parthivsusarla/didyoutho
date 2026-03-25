const express = require('express');
const router = express.Router();
const { voteProof } = require('../controllers/voteController');

router.post('/vote', voteProof);

module.exports = router;