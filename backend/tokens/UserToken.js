const createUserToken = async (userInfo, res, statusCode) => {
  const token = userInfo.GetTokenMethod();
  const option = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: false,
  };
    res.status(statusCode).cookie('token',token,option
  )
  res.status(200).json({
    success: true,
    message:'successfully',
    user:{
        _id : userInfo._id,
        username : userInfo.username,
        email : userInfo.email,
        role : userInfo.role,
        is_veridfied : userInfo.is_veridfied,
        avatar:userInfo.avatar
    },
    token,
   
  });

};

module.exports = createUserToken;
