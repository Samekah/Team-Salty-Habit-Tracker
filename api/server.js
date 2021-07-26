const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const usersRoutes = require('./routes/user')
server.use('/user', usersRoutes)

// Root route
server.get('/', (req, res) => res.send('Hello, client!'))

// Login route
server.post('/login', (req,res) => {
    console.log('loggin in')
})

// Register route
server.post('/register', (req,res) => {
    console.log('register')
})

module.exports = server