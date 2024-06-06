const { asyncErrorHandler } = require("../errorHandler/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const UserModels = require("../models/UserModels");
exports.isUserMiddleware=asyncErrorHandler(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return res.status(400).json({
            success:false,
            message:'your are not user please login!'
        })
    }
    const decode = await jwt.verify(token,process.env.SECERIT_KEY);
    req.user = await UserModels.findById(decode._id);
    next();
})