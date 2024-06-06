const express = require("express");
const path = require("path");
const shortid = require("shortid");
const multer = require("multer");
const { isUserMiddleware } = require("../middleware/UserMiddleware");
const {
  createGroupNameController,
  singleVideosCreateController,
  getAllSingleVideosOfUserController,
  deleteSingleVideoController,
  UpdateSingleVideoController,
  getGroupsNameController,
  createGroupsVideoController,
  getAllGroupVidoeController,
  getUserSingleGroupVideosController,
  getAllFreeVideosController,
  getFreeSingleVideoController,
  getSingleFreeGroupVideosController,
  getPaymentVideosController,
  getPaymentSingleVideoController,
  VideoLikeController,
  createVideoCommendController,
  getVideoCommendController,
  getUserVideosprofitController,
  getUserVideosOrdersController,
} = require("../controllars/VideoContollers");
const { 
  getPkTestKeyController,
  checkPaymentVideoController ,
  paymentStripeController,
  videoPaymentController
} = require("../controllars/PaymentContoller");
//access router
const router = express.Router();
//multer path
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname),"./public/images/videos"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, shortid.generate() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })
//all routers
router.post("/create/group/name", isUserMiddleware, createGroupNameController);
router.get('/get/groups/name/',isUserMiddleware,getGroupsNameController)
router.post('/single/create/:id', upload.single('video'), isUserMiddleware, singleVideosCreateController);
router.get('/get/all/single/user/videos',isUserMiddleware,getAllSingleVideosOfUserController);
router.delete('/delete/single/user/video/:id',isUserMiddleware,deleteSingleVideoController);
router.put('/update/single/user/video/:id',upload.single('video'),isUserMiddleware,UpdateSingleVideoController);
router.post('/group/video/create',upload.single('video'),isUserMiddleware,createGroupsVideoController)
router.get('/get/all/user/group/videos',isUserMiddleware,getAllGroupVidoeController)
router.get('/get/user/single/group/video/:id',isUserMiddleware,getUserSingleGroupVideosController)
router.get('/get/all/free/videos',getAllFreeVideosController);
router.get('/get/single/free/video/:id',getFreeSingleVideoController);
router.get('/get/single/free/groups/videos/:id',getSingleFreeGroupVideosController);
router.get('/get/all/payment/videos',getPaymentVideosController);
router.get('/get/single/payment/video/:id',getPaymentSingleVideoController);
router.get('/get/single/payment/video/:id',getPaymentSingleVideoController)
router.put('/video/like/:id',isUserMiddleware,VideoLikeController);
router.post('/create/commend/:id',isUserMiddleware,createVideoCommendController);
router.get('/get/video/commends/:id',getVideoCommendController)
///payment router controllers
router.get('/get/public/secret/key',getPkTestKeyController);
router.get('/payment/video/check/:id',isUserMiddleware,checkPaymentVideoController);
router.post('/payment/stripe',isUserMiddleware,paymentStripeController);
router.post('/payment/confirm',isUserMiddleware,videoPaymentController);
router.get('/get/me/user/payment/videos/profit',isUserMiddleware,getUserVideosprofitController);
router.get('/get/user/orders',isUserMiddleware,getUserVideosOrdersController);
module.exports = router;
