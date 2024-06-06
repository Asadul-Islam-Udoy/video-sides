const express = require("express");
const {
  createUsersController,
  emailVerifiedContoller,
  UserLoginController,
  userLogoutController,
  updateUserInfoController,
  forgetPasswordEmailController,
  forgetPasswordChangeController,
} = require("../controllars/UserControllers");
const { isUserMiddleware } = require("../middleware/UserMiddleware");
//access router
const router = express.Router();

///all routers
router.post("/register", createUsersController);
router.get("/email/is_verified/:token", emailVerifiedContoller);
router.post('/login',UserLoginController);
router.get('/logout',userLogoutController)
router.put('/update',isUserMiddleware,updateUserInfoController);
router.post('/forgetpassword/email',forgetPasswordEmailController);
router.put('/forgetpassword/reset',forgetPasswordChangeController)
module.exports = router;
