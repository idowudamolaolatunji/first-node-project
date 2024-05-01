const jwt = require('jsonwebtoken');
const User = require('../model/userModel');


exports.protected = async function(req, res, next) {
    try {

        // let token;
        const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : req.cookies.jwt;

        
        // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        //     token = req.headers.authorization.split(" ")[1];
        // } else if(req.cookie.jwt) {
        //     token = req.cookie.jwt;
        // }


        if(!token) {
            return res.status(401).json({
                message: 'You are not authorised to access this route!'
            });
        }

        const decoded = jwt.verify(token, 'app__very__secret__and__ultra__long__string');
        req.user = {
            _id: decoded.id
        }

        const currUser = await User.findById(decoded.id);
        if(!currUser) {
            return res.status(401).json({ 
                message: 'User belonging to token no longer exist'
            })
        }

        req.user = currUser;
        next();
    } catch(err) {
        res.status(401).json({
            status: 'fail',
            message: err.message || 'You are not authorised',
        })
    }
}