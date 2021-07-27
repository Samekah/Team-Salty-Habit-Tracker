const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token)
    if(token == null) return res.status(401).json({message: "Token missing"})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
        console.log(data)
        console.log(err)
        if(err) {
            res.status(403).json({err: 'Invalid token'})
        } else {
            next()
        }
    })
}

module.exports = {
    authenticateToken
}