require('dotenv').config();

const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const authRoutes = require('./controllers/auth');
const usersRoutes = require('./routes/user');
server.use('/auth', authRoutes);
server.use('/user', usersRoutes);

const User = require('./models/User');

// Root route
server.get('/', (req, res) => res.send('Server is up and running'))

module.exports = server