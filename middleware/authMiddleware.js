// # JWT verification and role-based access

const jwt = require('jsonwebtoken');


//verify token and the user role

exports.verifyToken=(req,res,next)=>{

    try{

        const token= req.headers.authorization?.split(' ')[1];
        if (!token){
            return res.status(403).json({message:'Access denied.No token provided'});
        }


        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        res.status(401).json({message:'Invalid token.'})
    }
};

//checking specific user role

exports.checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
        next(); 
    };
};