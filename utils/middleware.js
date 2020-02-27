const jwt = require('jsonwebtoken');

const { jwtSECRET } = require('./secrets.js');

const restricted_mw = (req, res, next) => {
    const {authorization} = req.headers;

    if(authorization){
        jwt.verify(authorization, jwtSECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({msg: 'Invalid Credentials'})
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(400).json({err:'pls provide creds'})
    };
};

const verify_department = (dep) => {
    return (req, res, next) => {
        const dt = req.decodedToken;
        if(dt.department.toLowerCase() === dep){
            next();
        } else {
            res.status(403).json({Forbidden: `Users from ${dt.department} department can not view this information`})
        }
    }
};

module.exports = {
    restricted_mw,
    verify_department
};