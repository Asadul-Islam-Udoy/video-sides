const express = require("express");
const multer = require("multer");
const path = require("path");
const shortid = require("shortid");
const { isUserMiddleware } = require("../middleware/UserMiddleware");
const {
  createPosterController,
  getAllPosterController,
  getSinglePosterController,
  createReviewController,
} = require("../controllars/PosterController");
const router = express.Router();

///multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "./public/images/posters"));
  },
  filename: function (req, file, cb) {
    Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
///poster routers
router.post(
  "/create",
  upload.array("images"),
  isUserMiddleware,
  createPosterController
);
router.get("/get/all", getAllPosterController);
router.get('/get/single/:id',getSinglePosterController);
router.post('/review/:id',isUserMiddleware,createReviewController)
module.exports = router;
