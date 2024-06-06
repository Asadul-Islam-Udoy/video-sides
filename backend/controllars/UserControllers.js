const { asyncErrorHandler } = require("../errorHandler/asyncErrorHandler");
const sendEmail = require("../mail/sendEmailM");
const UserModels = require("../models/UserModels");
var randomToken = require('random-token');
const createUserToken = require("../tokens/UserToken");
const sendMailOtp = require("../mail/senEmailOtp");

/// create user controller
exports.createUsersController=asyncErrorHandler(async(req,res)=>{

   const email = req.body.email;
   const check_email = await UserModels.findOne({email});
   if(check_email){
    res.status(400).json({
        success:false,
        message:'email is already exists!'
    })
   }
   const users = await UserModels.create({
    username:req.body.username,
    email:req.body.email,
    password:req.body.password
   })
   if(users){
    createUserToken(users,res,200)
    var token = randomToken(56)
    await UserModels.findByIdAndUpdate(users._id,{is_token:token,expiresIn:Date.now()+60*24*1000},{new:true});
    await sendEmail({
        email:req.body.email,
        subject:'videos project is the world',
        message:token,
        url: req.protocol + '://' + req.get('host') + '/api/users/email/is_verified/'
    })
   }
})

///user email verified
exports.emailVerifiedContoller=asyncErrorHandler(async(req,res)=>{
    const user = await UserModels.findOne({is_token:req.params.token,expiresIn:{$gte:Date.now()}})
    if(!user){
        res.status(400).json({
            success:false,
            message:'your time is expries please try again!'
        })  
    }
    else{
    user.is_veridfied = true,
    user.expiresIn = undefined,
    user.is_token = undefined;
    user.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
        message:'email verified successfully!'
    })
    }
})

/// user login controller
exports.UserLoginController=asyncErrorHandler(async(req,res)=>{
    const{email,password} = req.body;
    const user = await UserModels.findOne({email}).select('+password');
   if(!user){
    return res.status(400).json({
        success:false,
        message:'your email is not register!'
    })
   }

 const match = await user.ComparePassword(password);
 if(!match){
    return res.status(400).json({
        success:false,
        message:'password is not match'
    })
 }
 await createUserToken(user,res,200)
});

/// logout controller
exports.userLogoutController=asyncErrorHandler(async(req,res)=>{
    const{token} = req.cookies
    console.log('token',token)
    if(token){
        res.clearCookie("token",{
            httpOnly:true,
            expires:new Date(Date.now())
           })
    }
   console.log('logout successfully!')
   return res.status(200).json({
    success:true,
    message:'logout successfully!'
})
});

///update user info
exports.updateUserInfoController=asyncErrorHandler(async(req,res)=>{
    console.log('hee',req.body)
    const{username,email,password} = req.body;
    const user = await UserModels.findById(req.user._id).select("+password");
    if(!user){
        return res.status(400).json({
            success:false,
            message:'user is not found'
        })
    }

    const match_password = await user.ComparePassword(password);
    if(!match_password){
        return res.status(400).json({
            success:false,
            message:'incurret password'
        }) 
    }
    user.username = username;
    user.email = email;
    await user.save({validateBeforeSave:false});
    createUserToken(user,res,200)
    var token = randomToken(56)
    await UserModels.findByIdAndUpdate(user._id,{is_token:token,expiresIn:Date.now()+60*24*1000},{new:true});
    await sendEmail({
        email,
        subject:'videos project is the world',
        message:token,
        url: req.protocol + '://' + req.get('host') + '/api/users/email/is_verified/'
    })
});

///forgetpassword email section
exports.forgetPasswordEmailController=asyncErrorHandler(async(req,res)=>{
    const user = await UserModels.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json({
            success:false,
            message:'your email is not exist'
        })
    }
    const otp = randomToken(5).toUpperCase();
    user.is_token = otp;
    user.expiresIn = Date.now()+60*24*1000
    user.save({validateBeforeSave:false});
    await sendMailOtp({
        email:req.body.email,
        subject:'forget password otp',
        otp
    })
    res.status(200).json({
        success:true,
        message:'send otp your email address'
    })
});

///forget password change controller 
exports.forgetPasswordChangeController=asyncErrorHandler(async(req,res)=>{
    const user = await UserModels.findOne({
        is_token:req.body.otp,
        expiresIn:{$gte:Date.now()}
    });
    if(!user){
        return res.status(400).json({
            success:false,
            message:'otp time is out or otp is wrong'
        })
    }
   user.password = req.body.password;
   user.is_token = undefined;
   user.expiresIn = undefined;
   user.save({validateBeforeSave:false});
   res.status(200).json({
    success:true,
    message:'password update successfully!'
})
})


