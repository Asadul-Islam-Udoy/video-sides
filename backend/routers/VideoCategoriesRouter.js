const express = require("express");
const { isUserMiddleware } = require("../middleware/UserMiddleware");
const {
  createCategoriesController,
  GetAllCategoriesContoller,
  getSingleCategoryVideosControler,
} = require("../controllars/VideoCategoriesControllers");
///access router
const router = express.Router();

///all categories routers
router.post("/create", isUserMiddleware, createCategoriesController);
router.get("/get/all", GetAllCategoriesContoller);
router.get('/get/single/categories/videos/:id',getSingleCategoryVideosControler)
module.exports = router;
