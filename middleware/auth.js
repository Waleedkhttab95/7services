const jwt = require('jsonwebtoken');
const key = require('../config/keys');

module.exports = function (req,res,next) {

    const token = req.headers.authorization.split(" ")[1];
   
    
    if (!token) return res.status(401).send('Access denies. no token provided');

    try{
        const decoded= jwt.verify(token, key.jwtKey);
        req.user = decoded;
        next();
    }
    catch(ex) {
        res.status(400).send('Invalid token .');
    }

}
