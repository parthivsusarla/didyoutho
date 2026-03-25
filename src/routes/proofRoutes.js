const express = require('express');
const router = express.Router();
const { uploadProof } = require('../controllers/proofController');

router.post('/upload', uploadProof);

module.exports = router;