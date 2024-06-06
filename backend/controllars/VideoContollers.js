const { asyncErrorHandler } = require("../errorHandler/asyncErrorHandler");
const fs = require("fs");
const path = require("path");
const GroupVideosName = require("../models/GroupVideosName");
const VideoFreeModels = require("../models/VideoFreeModels");
const VideoPaymentModel = require("../models/VideoPaymentModel");
const ApiFeatures = require("../filters/ApiFeature");
const VideoCommendModels = require("../models/VideoCommendModels");
const PaymentVideoModels = require("../models/PaymentVideoModels");

//// groups name create
exports.createGroupNameController = asyncErrorHandler(async (req, res) => {
  const group = await GroupVideosName.create({
    groupname: req.body.groupname,
    profession: req.body.profession,
    user: req.user,
  });
  if (group) {
    const groups = await GroupVideosName.find({});
    res.status(200).json({
      success: true,
      message: "groups name create successfully",
      groups,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "groups create fail!",
    });
  }
});
///get groups name
exports.getGroupsNameController = asyncErrorHandler(async (req, res) => {
  const groups = await GroupVideosName.find({
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    message: "groups name getting successfully!",
    groups,
  });
});
/// single video create
exports.singleVideosCreateController = asyncErrorHandler(async (req, res) => {
  let video;
  if (req.body.videoCost == 0) {
    video = await VideoFreeModels.create({
      title: req.body.title,
      description: req.body.description,
      video: req.file.filename,
      user: req.user._id,
      category: req.params.id,
    });
  } else {
    video = await VideoPaymentModel.create({
      title: req.body.title,
      description: req.body.description,
      videoCost: req.body.videoCost,
      video: req.file.filename,
      user: req.user._id,
      category: req.params.id,
    });
  }

  if (!video) {
    return res.status(400).json({
      success: false,
      message: "video create fail!",
    });
  }
  res.status(200).json({
    success: true,
    message: "single video create successfully!",
  });
});
///get single videos
exports.getAllSingleVideosOfUserController = asyncErrorHandler(
  async (req, res) => {
    const videos = [];
    const videos_free = await VideoFreeModels.find({
      groupVideos: [],
      user: req.user._id,
    });
    const videos_payment = await VideoPaymentModel.find({
      groupVideos: [],
      user: req.user._id,
    });
    if (videos_free.length > 0) {
      videos_free.forEach((f) => {
        videos.push(f);
      });
    }
    if (videos_payment.length > 0) {
      videos_payment.forEach((p) => {
        videos.push(p);
      });
    }
    res.status(200).json({
      success: true,
      message: "single videos getting successfully!",
      videos,
    });
  }
);

///delete single video
exports.deleteSingleVideoController = asyncErrorHandler(async (req, res) => {
  const user_free_Video = await VideoFreeModels.findById(req.params.id);
  const user_payment_Video = await VideoPaymentModel.findById(req.params.id);
  if (!user_free_Video && !user_payment_Video) {
    return res.status(400).json({
      success: false,
      message: "video is not found",
    });
  }
  if (user_free_Video) {
    const filePath = path.join(
      path.dirname(__dirname),
      "./public/images/videos/"
    );
    fs.unlink(filePath + user_free_Video.video, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("video file delete succefully!");
      }
    });
    const deleteVideo = await VideoFreeModels.findByIdAndDelete(req.params.id);
    if (!deleteVideo) {
      return res.status(400).json({
        success: false,
        message: "video  delete fail",
      });
    }
  } else {
    const filePath = path.join(
      path.dirname(__dirname),
      "./public/images/videos/"
    );
    fs.unlink(filePath + user_payment_Video.video, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("video file delete succefully!");
      }
    });
    const deleteVideo = await VideoPaymentModel.findByIdAndDelete(
      req.params.id
    );
    if (!deleteVideo) {
      return res.status(400).json({
        success: false,
        message: "video  delete fail",
      });
    }
  }
  const videos = [];
  const videos_free = await VideoFreeModels.find({
    groupVideos: [],
    user: req.user._id,
  });
  const videos_payment = await VideoPaymentModel.find({
    groupVideos: [],
    user: req.user._id,
  });
  if (videos_free.length > 0) {
    videos_free.forEach((f) => {
      videos.push(f);
    });
  }
  if (videos_payment.length > 0) {
    videos_payment.forEach((p) => {
      videos.push(p);
    });
  }
  res.status(200).json({
    success: true,
    message: "video delete successfully!",
    videos,
  });
});

///update single video
exports.UpdateSingleVideoController = asyncErrorHandler(async (req, res) => {
  const user_free_Video = await VideoFreeModels.findById(req.params.id);
  const user_payment_Video = await VideoPaymentModel.findById(req.params.id);
  if (!user_free_Video && !user_payment_Video) {
    return res.status(400).json({
      success: false,
      message: "video is not found",
    });
  }

  if (req.body.videoCost == 0) {
    user_free_Video.title = req.body.title;
    user_free_Video.description = req.body.description;
    user_free_Video.category = req.body.categoryId;
    user_free_Video.user = req.user._id;
    if (req.file) {
      const filePath = path.join(
        path.dirname(__dirname),
        "./public/images/videos/"
      );
      fs.unlink(filePath + user_free_Video.video, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("old file delete successfully!");
        }
      });
      user_free_Video.video = req.file.filename;
    }
    user_free_Video.save({ validateBeforeSave: false });
  } else {
    user_payment_Video.title = req.body.title;
    user_payment_Video.description = req.body.description;
    user_payment_Video.category = req.body.categoryId;
    user_payment_Video.videoCost = req.body.videoCost;
    user_payment_Video.user = req.user._id;
    if (req.file) {
      const filePath = path.join(
        path.dirname(__dirname),
        "./public/images/videos/"
      );
      fs.unlink(filePath + user_payment_Video.video, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("old file delete successfully!");
        }
      });
      user_payment_Video.video = req.file.filename;
    }
    user_payment_Video.save({ validateBeforeSave: false });
  }

  const videos = [];
  const videos_free = await VideoFreeModels.find({
    groupVideos: [],
    user: req.user._id,
  });
  const videos_payment = await VideoPaymentModel.find({
    groupVideos: [],
    user: req.user._id,
  });
  if (videos_free.length > 0) {
    videos_free.forEach((f) => {
      videos.push(f);
    });
  }
  if (videos_payment.length > 0) {
    videos_payment.forEach((p) => {
      videos.push(p);
    });
  }
  res.status(200).json({
    success: true,
    message: "video file update successfully!",
    videos,
  });
});

//create groups videos
exports.createGroupsVideoController = asyncErrorHandler(async (req, res) => {
  const { title, description, categoryId, group_id, groupname } = req.body;
  let groupsVideo;
  if (req.body.videoCost == 0) {
    groupsVideo = await VideoFreeModels.create({
      title,
      description,
      category: categoryId,
      groupVideos: [
        {
          group_id,
          groupname,
        },
      ],
      user: req.user,
      video: req.file.filename,
    });
  } else {
    groupsVideo = await VideoPaymentModel.create({
      title,
      description,
      category: categoryId,
      videoCost: req.body.videoCost,
      groupVideos: [
        {
          group_id,
          groupname,
        },
      ],
      user: req.user,
      video: req.file.filename,
    });
  }
  if (!groupsVideo) {
    return res.status(400).json({
      success: false,
      message: "groups video create fails",
    });
  }
  const videoList = [];
  const videos_get_free = await VideoFreeModels.find({});
  const videos_get_payment = await VideoPaymentModel.find({});
  if (videos_get_free.length > 0) {
    videos_get_free.forEach((f) => {
      videoList.push(f);
    });
  }
  if (videos_get_payment.length > 0) {
    videos_get_payment.forEach((p) => {
      videoList.push(p);
    });
  }
  const videos = await videoList.filter(
    (i) =>
      i.groupVideos.length !== 0 &&
      i.user.toString() === req.user._id.toString()
  );
  res.status(200).json({
    success: true,
    message: "groups video crate successfully!",
    videos,
  });
});

//get user  groups all videos
exports.getAllGroupVidoeController = asyncErrorHandler(async (req, res) => {
  const videoList = [];
  const videos_get_free = await VideoFreeModels.find({});
  const videos_get_payment = await VideoPaymentModel.find({});
  if (videos_get_free.length > 0) {
    videos_get_free.forEach((f) => {
      videoList.push(f);
    });
  }
  if (videos_get_payment.length > 0) {
    videos_get_payment.forEach((p) => {
      videoList.push(p);
    });
  }
  const videos = await videoList.filter(
    (i) =>
      i.groupVideos.length !== 0 &&
      i.user.toString() === req.user._id.toString()
  );
  res.status(200).json({
    success: true,
    message: "groups video getting successfully!",
    videos,
  });
});

//get user single group videos
exports.getUserSingleGroupVideosController = asyncErrorHandler(
  async (req, res) => {
    const videoList = [];
    const videos_get_free = await VideoFreeModels.find({});
    const videos_get_payment = await VideoPaymentModel.find({});
    if (videos_get_free.length > 0) {
      videos_get_free.forEach((f) => {
        videoList.push(f);
      });
    }
    if (videos_get_payment.length > 0) {
      videos_get_payment.forEach((p) => {
        videoList.push(p);
      });
    }
    const videos_filter = await videoList.filter(
      (i) =>
        i.groupVideos.length !== 0 &&
        i.user.toString() === req.user._id.toString()
    );
    const videos = await videos_filter.filter(
      (i) => i.groupVideos[0].group_id === req.params.id
    );
    if (!videos) {
      return res.status(400).json({
        success: false,
        message: "video is not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "group single video getting successfully!",
      videos,
    });
  }
);

///get all free videos
exports.getAllFreeVideosController = asyncErrorHandler(async (req, res) => {
  const totalResult = 10;
  const totalItem = await VideoFreeModels.countDocuments();
  const apiFeature = new ApiFeatures(VideoFreeModels.find(), req.query)
    .search()
    .pagination(totalResult);
  const free_videos = await apiFeature.query;
  res.status(200).json({
    success: true,
    message: "get all free videos",
    free_videos,
    totalItem,
  });
});

///get free single video
exports.getFreeSingleVideoController = asyncErrorHandler(async (req, res) => {
  const video = await VideoFreeModels.findById(req.params.id);
  if (!video) {
    return res.status(400).json({
      success: false,
      message: "single video not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "free single video getting successfully!",
    video,
  });
});

///get free single group videos
exports.getSingleFreeGroupVideosController = asyncErrorHandler(
  async (req, res) => {
    const groupsList = await VideoFreeModels.find();
    const videoListGroups = groupsList.filter((i) => i.groupVideos.length > 0);
    const videos = videoListGroups.filter(
      (i) => i.groupVideos[0].group_id.toString() === req.params.id.toString()
    );

    res.status(200).json({
      success: true,
      message: "free groups videos getting successfully!",
      videos,
    });
  }
);

///get payment videos
exports.getPaymentVideosController = asyncErrorHandler(async (req, res) => {
  const totalResult = 10;
  const totalItem = await VideoPaymentModel.countDocuments();
  const apiFeature = new ApiFeatures(VideoPaymentModel.find(), req.query)
    .search()
    .filter()
    .pagination(totalResult);
  const payment_videos = await apiFeature.query;
  res.status(200).json({
    success: true,
    message: "get all free videos",
    payment_videos,
    totalItem,
  });
});

////get payemnt single video
exports.getPaymentSingleVideoController = asyncErrorHandler(
  async (req, res) => {
    const video = await VideoPaymentModel.findById(req.params.id);
    if (!video) {
      return res.status(400).json({
        success: false,
        message: "video not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "single payment vido getting successfully!",
      video,
    });
  }
);
////payment single groups videos
exports.getPaymentSingleVideoController = asyncErrorHandler(
  async (req, res) => {
    const video = await VideoPaymentModel.findById(req.params.id);
    if (!video) {
      return res.status(400).json({
        success: false,
        message: "single video not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "free single video getting successfully!",
      video,
    });
  }
);

////like video controller
exports.VideoLikeController = asyncErrorHandler(async (req, res) => {
  const free_video = await VideoFreeModels.findById(req.params.id);
  const payment_video = await VideoPaymentModel.findById(req.params.id);
  if (free_video) {
    if (free_video.likes.length === 0) {
      free_video.likes.push(req.user._id);
    } else {
      if (free_video.likes.length > 0) {
        const check_video_like = free_video.likes.includes(req.user._id);
        if (check_video_like) {
          free_video.likes.pop(req.user._id);
        } else {
          free_video.likes.push(req.user._id);
        }
      }
    }
    free_video.save({ validateBeforeSave: false });
    return res.status(200).json({
      success: true,
      message: "like create successfully!",
      video: free_video,
    });
  }
  if (payment_video) {
    if (payment_video.likes.length === 0) {
      payment_video.likes.push(req.user._id);
    } else {
      if (payment_video.likes.length > 0) {
        const check_video_like = payment_video.likes.includes(req.user._id);
        if (check_video_like) {
          payment_video.likes.pop(req.user._id);
        } else {
          payment_video.likes.push(req.user._id);
        }
      }
    }
    payment_video.save({ validateBeforeSave: false });
    return res.status(200).json({
      success: true,
      message: "like create successfully!",
      video: payment_video,
    });
  }
  if (!free_video && !payment_video) {
    return res.status(400).json({
      success: false,
      message: "video is not found",
    });
  }
});

///video commend controller
exports.createVideoCommendController = asyncErrorHandler(async (req, res) => {
  console.log('dddd')
  const{commend} = req.body;
  const commends_create = await VideoCommendModels.create({
   commend,
   senderId:req.user._id,
   videoId:req.params.id
  });
  if (!commends_create) {
    return res.status(400).json({
      success: false,
      message: "video commend create fail",
    });
  }
const commends  = await VideoCommendModels.find({
  videoId:req.params.id
});
  res.status(200).json({
    success: true,
    message: "video commend create successfully!",
    commends
  });
});


//get  commend controller
exports.getVideoCommendController=asyncErrorHandler(async(req,res)=>{

  const commends  = await VideoCommendModels.find({
    videoId:req.params.id
  });

   return res.status(200).json({
      success: true,
      message: "video commend getting successfully!",
      commends
    });
});

///user get profit
exports.getUserVideosprofitController=asyncErrorHandler(async(req,res)=>{
  const pymentVideos = await PaymentVideoModels.find({
    createUser:req.user._id
  });
  if(!pymentVideos){
    return res.status(400).json({
      success:false,
      message:'order is not found'
    })
  }
  res.status(200).json({
    success:true,
    message:'get user order successfully!',
    pymentVideos
  })
});

///orer controller getUserVideosOrdersController
exports.getUserVideosOrdersController=asyncErrorHandler(async(req,res)=>{
  const orders = await PaymentVideoModels.find({
    paymentUser:req.user._id
  });
  if(!orders){
    return res.status(400).json({
      success:false,
      message:'order is not found'
    })
  }
  res.status(200).json({
    success:true,
    message:'get user order successfully!',
    orders
  })
});