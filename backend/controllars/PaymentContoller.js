const { asyncErrorHandler } = require('../errorHandler/asyncErrorHandler');
const PaymentVideoModels = require('../models/PaymentVideoModels');
const VideoPaymentModel = require('../models/VideoPaymentModel');
const stripe = require('stripe')('sk_test_51O3fZBIqVM6rcM5vlfInaaxJbJhjHbkvdnZRyRAlVZTMY7mX0ddkSxucRi2erzU81sxpecmiQzVLuf9aWb3Yb3Ao00wKmJ13Lp');

exports.getPkTestKeyController=asyncErrorHandler(async(req,res)=>{
   const secret_key = process.env.STRIPE_Public_KEY;
   if(!secret_key){
    return res.status(400).json({
        success:false,
        message:'public key is not found'
    })
   }
   res.status(200).json({
    success:true,
    message:'public key is getting successfully!',
    secret_key
   })
})

///check payment vidos
exports.checkPaymentVideoController=asyncErrorHandler(async(req,res)=>{
    const check_videos = await PaymentVideoModels.findOne({videoId:req.params.id,paymentUser:req.user._id.toString()});
    if(check_videos){
        return res.status(200).json({
            success:true,
            message:'payment video getting successfully!'
        })   
    }
    else{
        return res.status(400).json({
            success:false,
            message:'payment video check fail!'
        })
    }
});

///payment stripe controllers
exports.paymentStripeController=asyncErrorHandler(async(req,res)=>{
    const total = Number(req.body.amount);
 
    const result = await stripe.paymentIntents.create({
        amount:total,
        currency:"usd",
        metadata:{
            company:"ai"
        }
    });

   return res.status(200).json({
        success:true,
        message:'result successfully',
        clientSecret:result.client_secret
    })
});

///video payment controller
exports.videoPaymentController=asyncErrorHandler(async(req,res)=>{
    const {username,email,addressInfos,status,status_id,paymentUser,createUser,video,videoCost,videoId} = req.body;
    const payment = await PaymentVideoModels.create({
        username,
        email,
        addressInfos,
        statusInfo:[{
          status_id,
          status  
        }],
        videoId,
        videoCost,
        video,
        paymentUser,
        createUser
    });
    if(!payment){
        return res.status(400).json({
          success:false,
          message:'payment fails!'
        })
    }
    const videos = await VideoPaymentModel.findById(videoId);
    if(!videos){
        return res.status(400).json({
          success:false,
          message:'video is not found!'
        })
    }
    const check_array = videos.getPaymentUser.find((i)=>i.user.toString() === req.user._id.toString());
    if(!check_array){
        videos.getPaymentUser.push({
            user:req.user._id
        });
    }
    videos.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
        message:'payment successfully!'
    })
})