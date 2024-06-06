const { asyncErrorHandler } = require("../errorHandler/asyncErrorHandler");
const PosterModels = require("../models/PosterModels");

//create poster
exports.createPosterController=asyncErrorHandler(async(req,res)=>{
    const {title,description} = req.body;
    let ImageList=[];
    if(req.files.length > 0){
        ImageList = req.files.map((img)=>{
            return{image:img.filename}
        })
    }
    const poster = await PosterModels.create({
        title,
        description,
        PosterImages:ImageList,
        user:req.user
    });
    if(!poster){
      return res.status(400).json({
        success:false,
        message:'poster create fail'
      })
    }
    res.status(200).json({
        success:true,
        message:'poster crate successfully!'
    })
});

///get all posters
exports.getAllPosterController=asyncErrorHandler(async(req,res)=>{
    const posters  = await PosterModels.find({});
        res.status(200).json({
        success:true,
        message:'all poster getting successfully!',
        posters
    })
})

//get single poster
exports.getSinglePosterController=asyncErrorHandler(async(req,res)=>{
    const poster = await PosterModels.findById({_id:req.params.id});
    if(!poster){
        return  res.status(400).json({
            success:false,
            message:'incurrent poster id!',
        })
    }
    res.status(200).json({
        success:true,
        message:'single poster getting successfully!',
        poster
    });
    
});

//create review
exports.createReviewController=asyncErrorHandler(async(req,res)=>{
  
    const {rating,comment} = req.body;
    const poster = await PosterModels.findById({_id:req.params.id});
    if(!poster){
        return  res.status(400).json({
            success:false,
            message:'incurrent poster id!',
        })
    }
 
    const check_reviews = await poster.reviews.find((i)=>i.user.toString() === req.user._id.toString());
    if(check_reviews){
       poster.reviews.forEach((rev)=>{
        if(rev.user.toString() === req.user._id.toString())
            (rev.rating = rating),(rev.comment = comment)
       }) 

       res.status(200).json({
        success:true,
        message:'review update  successfully!',
        poster
    });
    }
    else{
        poster.reviews.push({
            user:req.user._id,
            rating,
            comment
        })
        res.status(200).json({
            success:true,
            message:'review create  successfully!',
            poster
        });
    }

    await poster.save({validateBeforeSave:false})

})