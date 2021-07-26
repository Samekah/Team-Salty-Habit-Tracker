require('dotenv').config();

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const server = express();
server.use(cors());
server.use(express.json());

const usersRoutes = require('./routes/user');
server.use('/user', usersRoutes);

const User = require('./models/User');

// Root route
server.get('/', (req, res) => res.send('Hello, client!'))

// Register route
server.post('/register', async (req,res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = await User.create(req.body.username, hashedPassword, req.body.first_name, req.body.last_name, req.body.email)
        res.status(201).send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

// Login route
server.post('/login', async (req,res) => {
    const username = req.body.username
    const user = User.findUserByUsername(username)
    if (user == null) {
        return res.status(400).send('Cannot find the user')
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            //successful login, create token
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            res.json({ accessToken: accessToken })
        } else {
            res.send("Not allowed")
        }
    } catch {
        res.status(500).send()
    }

})

function AuthenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            res.sendStatus(403)
        } else {
            req.user = user
            next()
        }
    })
}

module.exports = server