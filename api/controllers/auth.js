if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middleware/auth');

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const User = require('../models/User');

router.get('/', authenticateToken, (req,res) => {
    try {
        res.status(200).json({messsage: 'Authorized'})
    } catch (err) {
        console.log(err)
    }
})

// Register route
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        await User.create(req.body.username, hashedPassword, req.body.first_name, req.body.last_name, req.body.email)
        res.status(201).json({msg: 'User created'})
    } catch (err) {
        res.status(500).json({err});
    }
})


router.post('/login', async (req, res) => {
    const username = req.body.username

    try {
        const user = await User.findUserByUsername(username)
        if(!user){ throw new Error('No user with this username') }
        const authed = bcrypt.compare(req.body.password, user.password)
        if (!!authed){
            const payload = { username: user.username }
            const sendToken = (err, token) => {
                if(err){ throw new Error('Error in token generation') }
                res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
            }
            jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 }, sendToken);
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        console.log(err);
        res.status(401).json({ err });
    }
})

module.exports = router