const { asyncErrorHandler } = require("../errorHandler/asyncErrorHandler");
const PosterModels = require("../models/PosterModels");
const VideoCategoriesModels = require("../models/VideoCategoriesModels");
const VideoFreeModels = require("../models/VideoFreeModels");
const VideoPaymentModel = require("../models/VideoPaymentModel");
////category create controller
exports.createCategoriesController = asyncErrorHandler(async (req, res) => {
  const category = await VideoCategoriesModels.create({
    categoryName: req.body.categoryName,
    parentId: req.body.parentId || undefined,
    user: req.user,
  });
  if (category) {
    res.status(200).json({
      success: true,
      message: "category create successfully",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "category create fail!",
    });
  }
});
///category siparat method
const getCategoriesSiparat = (categories, parentId = null) => {
  const categroiesList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((i) => i.parentId == undefined);
  } else {
    category = categories.filter((i) => i.parentId == parentId);
  }
  for (let i of category) {
    categroiesList.push({
      _id: i._id,
      categoryName: i.categoryName,
      parentId: getCategoriesSiparat(categories, i._id),
    });
  }
  return categroiesList;
};
///get all categories
exports.GetAllCategoriesContoller = asyncErrorHandler(async (req, res) => {
  const categories= await VideoCategoriesModels.find();
  if (!categories) {
    res.status(400).json({
      success: false,
      message: "categories find fail!",
    });
  }
  let category;
  if (categories) {
    category = await getCategoriesSiparat(categories);
  }
 return res.status(200).json({
    success: true,
    message: "get all categories successfully!",
    category,
  });
});

///get single categories videos
exports.getSingleCategoryVideosControler=asyncErrorHandler(async(req,res)=>{
  const categories = [];
  const free_videos = await VideoFreeModels.find({
    category:req.params.id
  });
  const payment_videos = await VideoPaymentModel.find({
    category:req.params.id
  });

  if(free_videos.length > 0){
    free_videos.forEach((free)=>{
      categories.push(free)
    })
  }
  if(payment_videos.length > 0){
    payment_videos.forEach((payment)=>{
      categories.push(payment)
    })
  }
  res.status(200).json({
    success:true,
    message:'getting successfully single par categories videos',
    categories
  });
});




