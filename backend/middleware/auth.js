const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async(req,res,next)=>{
    try {
        const bearerHeader = req.headers['authorization'];
            if(typeof bearerHeader != 'undefined'){
            const bearer = bearerHeader.split(' ');
            const token = bearer[1];

              const decoded = jwt.verify(token,process.env.JWT_SECRATE_KEY);
                console.log(decoded, "login successfully");
                console.log(decoded);
                req.user = decoded;
                next();
            }else{
                res.status(401).json({message:'token not provided'});
            }

    } catch (error) {
     res.status(403).json({message:'invalid or expired token '});   
    }
}

module.exports = auth;