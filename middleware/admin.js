
const jwt = require('jsonwebtoken');
const key = require('../config/keys');

module.exports = function (req,res,next) {

    const token = req.headers.authorization.split(" ")[1];


    if (!token) return res.status(401).send('Access denies. no token provided');

    try{
        const decoded= jwt.verify(token, key.jwtKey);
        req.user = decoded;
    if(!req.user.isAdmin) return res.status(403).send('Access denied .');
    if(req.user.isSubAdmin) return res.status(403).send('Access denied .');
     next();
    }
    catch(ex) {
        res.status(400).send('Invalid token .');
    }

}