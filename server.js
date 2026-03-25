require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express(); 

// Routes
const taskRoutes = require('./src/routes/taskRoutes');
const proofRoutes = require('./src/routes/proofRoutes');
const voteRoutes = require('./src/routes/voteRoutes');
const userRoutes = require('./src/routes/userRoutes');
const groupRoutes = require('./src/routes/groupRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Route usage
app.use('/tasks', taskRoutes);
app.use('/proofs', proofRoutes);
app.use('/votes', voteRoutes);
app.use('/users', userRoutes);
app.use('/groups', groupRoutes); 

// Server start
app.listen(5000, () => {
  console.log('Server running on port 5000');
});