import axios from 'axios'
import { 
    CREATE_VIDEO_FAIL,
    CREATE_VIDEO_REQUEST, 
    CREATE_VIDEO_SUCCESS ,
    GET_ALL_VIDEOS_FAIL,
    GET_ALL_VIDEOS_REQUEST, 
    GET_ALL_VIDEOS_SUCCESS ,
    GET_ALL_ADMIN_VIDEOS_FAIL,
    GET_ALL_ADMIN_VIDEOS_REQUEST, 
    GET_ALL_ADMIN_VIDEOS_SUCCESS ,
    DELETE_VIDEOS_FAIL,
    DELETE_VIDEOS_REQUEST, 
    DELETE_VIDEOS_SUCCESS ,
    UPDATE_VIDEOS_FAIL,
    UPDATE_VIDEOS_REQUEST, 
    UPDATE_VIDEOS_SUCCESS ,
    VIDEO_RESET,
    CREATE_GROUPS_VIDEO_SUCCESS,
    CREATE_GROUPS_VIDEO_REQUEST,
    CREATE_GROUPS_VIDEO_FAIL,
    GET_NAME_GROUPS_VIDEO_SUCCESS,
    GET_NAME_GROUPS_VIDEO_FAIL,
    GET_NAME_GROUPS_VIDEO_REQUEST,
    RESET_VIDEO_GROUPS_NAME,
    CREATE_VIDEOS_GROUPS_VIDEO_SUCCESS,
    CREATE_VIDEOS_GROUPS_VIDEO_REQUEST,
    CREATE_VIDEOS_GROUPS_VIDEO_FAIL,
    GET_VIDEOS_GROUPS_SINGLE_SUCCESS,
    GET_VIDEOS_GROUPS_SINGLE_FAIL,
    GET_VIDEOS_GROUPS_SINGLE_REQUEST,
    GET_SINGLE_VIDEOS_OF_USER_REQUEST,
    GET_SINGLE_VIDEOS_OF_USER_SUCCESS,
    GET_SINGLE_VIDEOS_OF_USER_FAIL,
    GET_GROUPS_VIDEOS_OF_USER_REQUEST,
    GET_GROUPS_VIDEOS_OF_USER_SUCCESS,
    GET_GROUPS_VIDEOS_OF_USER_FAIL,
    GET_GROUPS_VIDEOS_USER_UNIQUE_SUCCESS,
    GET_GROUPS_VIDEOS_USER_UNIQUE_REQUEST,
    GET_GROUPS_VIDEOS_USER_UNIQUE_FAIL,
    GET_SINGLE_VIDEO_REQUEST,
    GET_SINGLE_VIDEO_FAIL,
    GET_SINGLE_VIDEO_SUCCESS,
    RESET_USER_VIDEOS,
    VIDEO_LIKE_REQUEST,
    VIDEO_LIKE_SUCCESS,
    VIDEO_LIKE_FAIL,
    VIDEO_COMMEND_GET_REQUEST,
    VIDEO_COMMEND_GET_SUCCESS,
    VIDEO_COMMEND_GET_FAIL,
    VIDEO_COMMEND_CREATE_REQUEST,
    VIDEO_COMMEND_CREATE_SUCCESS,
    VIDEO_COMMEND_CREATE_FAIL,
    POSTER_CREATE_REQUEST,
    POSTER_CREATE_SUCCESS,
    POSTER_CREATE_FAIL,
    POSTER_CREATE_RESET,
    POSTER_GET_REQUEST,
    POSTER_GET_SUCCESS,
    POSTER_GET_FAIL,
    POSTER_DELETE_REQUEST,
    POSTER_DELETE_SUCCESS,
    POSTER_DELETE_FAIL,
    POSTER_GET_ALL_REQUEST,
    POSTER_GET_ALL_SUCCESS,
    POSTER_GET_ALL_FAIL,
    POSTER_GET_SINGLE_REQUEST,
    POSTER_GET_SINGLE_SUCCESS,
    POSTER_GET_SINGLE_FAIL,
    POSTER_CREATE_REVIEW_REQUEST,
    POSTER_CREATE_REVIEW_SUCCESS,
    POSTER_CREATE_REVIEW_FAIL
  } from '../constance/VideoConstance';
///// get all free videos
export const getAllFreeVideosAction=(keyword,paginationbar)=>async(dispatch)=>{
  try{
     let getData ;
     if(keyword){
       getData = `https://video-sides.onrender.com/api/videos/get/all/free/videos?keyword=${keyword}&page=${1}`
     }
     else{
      getData = `https://video-sides.onrender.com/api/videos/get/all/free/videos?page=${paginationbar}`
     }
     dispatch({type:GET_ALL_VIDEOS_REQUEST});
     const{data} = await axios.get(getData);
     dispatch({type:GET_ALL_VIDEOS_SUCCESS,
     payload:data
    })
  }
  catch(error){
    dispatch({type:GET_ALL_VIDEOS_FAIL,
    payload:error.response.data.message  
  })
  }
}

/////get all payment videos
export const getAllPaymentVideosAction=(keyword,paginationbar)=>async(dispatch)=>{
  try{
     let getData ;
     if(keyword){
       getData = `https://video-sides.onrender.com/api/videos/get/all/payment/videos?keyword=${keyword}&page=${1}`
     }
     else{
      getData = `https://video-sides.onrender.com/api/videos/get/all/payment/videos?page=${paginationbar}`
     }
     dispatch({type:GET_ALL_VIDEOS_REQUEST});
     const{data} = await axios.get(getData);
     dispatch({type:GET_ALL_VIDEOS_SUCCESS,
     payload:data
    })
  }
  catch(error){
    dispatch({type:GET_ALL_VIDEOS_FAIL,
    payload:error.response.data.message  
  })
  }
}

export const ResetVideo=()=>async(dispatch)=>{
  dispatch({type:VIDEO_RESET})
}



///// groups files
export const createVideoGroupName=(fromData)=>async(dispatch)=>{
  try{
     dispatch({type:CREATE_GROUPS_VIDEO_REQUEST});
     const config = {headers:{'Content-Type':'application/json'}};
     const{data} = await axios.post('https://video-sides.onrender.com/api/videos/create/group/name',fromData,config);
     dispatch({type:CREATE_GROUPS_VIDEO_SUCCESS,
     payload:data.groups
    })
  }
  catch(error){
    dispatch({type:CREATE_GROUPS_VIDEO_FAIL,
    payload:error.response.data.message  
  })
  }
}


/////get free single groups videos
export const getSingleFreeGroupVideo=(id)=>async(dispatch)=>{
  try{
     dispatch({type:GET_VIDEOS_GROUPS_SINGLE_REQUEST});
     const{data} = await axios.get(`https://video-sides.onrender.com/api/videos/get/single/free/groups/videos/${id}`);
     dispatch({type:GET_VIDEOS_GROUPS_SINGLE_SUCCESS,
     payload:data.videos
    })
  } 
  catch(error){
    dispatch({type:GET_VIDEOS_GROUPS_SINGLE_FAIL,
    payload:error.response.data.message  
  })
  }
}

/////get free single groups videos
export const getSinglePaymentGroupVideo=(id)=>async(dispatch)=>{
  try{
     dispatch({type:GET_VIDEOS_GROUPS_SINGLE_REQUEST});
     const{data} = await axios.get(`https://video-sides.onrender.com/api/videos/get/single/payment/groups/videos/${id}`);
     dispatch({type:GET_VIDEOS_GROUPS_SINGLE_SUCCESS,
     payload:data.videos
    })
  } 
  catch(error){
    dispatch({type:GET_VIDEOS_GROUPS_SINGLE_FAIL,
    payload:error.response.data.message  
  })
  }
}

///// get groups name
export const getVideoGroupName=()=>async(dispatch)=>{
  try{
     dispatch({type:GET_NAME_GROUPS_VIDEO_REQUEST});
     const config = { headers:{'Content-Type':'application/json'}}
     const{data} = await axios.get('https://video-sides.onrender.com/api/videos/get/groups/name/',config);
     dispatch({type:GET_NAME_GROUPS_VIDEO_SUCCESS,
     payload:data.groups
    })
  }
  catch(error){
    dispatch({type:GET_NAME_GROUPS_VIDEO_FAIL,
    payload:error.response.data.message  
  })
  }
}


/////single create  videos
export const createVideo=(id,fromData)=>async(dispatch)=>{
  try{
     dispatch({type:CREATE_VIDEO_REQUEST});
     const{data} = await axios.post(`https://video-sides.onrender.com/api/videos/single/create/${id}`,fromData);
     dispatch({type:CREATE_VIDEO_SUCCESS,
     payload:data.videos
    })
  }
  catch(error){
    dispatch({type:CREATE_VIDEO_FAIL,
    payload:error.response.data.message  
  })
  }
}

///// get single free video
export const getFreeSingleVideoAction=(id)=>async(dispatch)=>{
  try{
     dispatch({type:GET_SINGLE_VIDEO_REQUEST});
     const config = {headers:{'Content-Type':'application/josn'}};
     const{data} = await axios.get(`https://video-sides.onrender.com/api/videos/get/single/free/video/${id}`,config);
     dispatch({type:GET_SINGLE_VIDEO_SUCCESS,
     payload:data.video
    })
  }
  catch(error){
    dispatch({type:GET_SINGLE_VIDEO_FAIL,
    payload:error.response.data.message  
  })
  }
}

///get payemtn single videos
export const getPaymentSingleVideoAction=(id)=>async(dispatch)=>{
  try{
     dispatch({type:GET_SINGLE_VIDEO_REQUEST});
     const config = {headers:{'Content-Type':'application/josn'}};
     const{data} = await axios.get(`https://video-sides.onrender.com/api/videos/get/single/payment/video/${id}`,config);
     dispatch({type:GET_SINGLE_VIDEO_SUCCESS,
     payload:data.video
    })
  }
  catch(error){
    dispatch({type:GET_SINGLE_VIDEO_FAIL,
    payload:error.response.data.message  
  })
  }
}
/////get single vidos of user
export const getsingleVideoOfUser=()=>async(dispatch)=>{
  try{
     dispatch({type:GET_SINGLE_VIDEOS_OF_USER_REQUEST});
     const config = { headers:{'Content-Type':'application/json'}}
     const{data} = await axios.get('https://video-sides.onrender.com/api/videos/get/all/single/user/videos',config);
     dispatch({type:GET_SINGLE_VIDEOS_OF_USER_SUCCESS,
     payload:data.videos
    })
  }
  
  catch(error){
    dispatch({type:GET_SINGLE_VIDEOS_OF_USER_FAIL,
    payload:error.response.data.message  
  })
  }
}


/////update single video
export const upateSingleOfVideoUser=(id,fromData)=>async(dispatch)=>{
  try{
    dispatch({type:UPDATE_VIDEOS_REQUEST});
    const{data} = await axios.put(`https://video-sides.onrender.com/api/videos/update/single/user/video/${id}/`,fromData);
    dispatch({type:UPDATE_VIDEOS_SUCCESS,
    payload:data.videos
   })
 }
 catch(error){
   dispatch({type:UPDATE_VIDEOS_FAIL,
   payload:error.response.data.message  
 })
  }
}

/////delete single video
export const deleteSingleOfVideoUser=(id)=>async(dispatch)=>{
  try{
     dispatch({type:DELETE_VIDEOS_REQUEST});
     const config ={headers:{'Content-Type':'application/json'}}
     const{data} = await axios.delete(`https://video-sides.onrender.com/api/videos/delete/single/user/video/${id}`,config);
     dispatch({type:DELETE_VIDEOS_SUCCESS,
     payload:data.videos
    })
  }
  catch(error){
    dispatch({type:DELETE_VIDEOS_FAIL,
    payload:error.response.data.message  
  })
  }
}


/////create group video
export const createGroupVideo=(fromData)=>async(dispatch)=>{
  try{
     dispatch({type:CREATE_VIDEOS_GROUPS_VIDEO_REQUEST});
     const{data} = await axios.post('https://video-sides.onrender.com/api/videos/group/video/create/',fromData);
     dispatch({type:CREATE_VIDEOS_GROUPS_VIDEO_SUCCESS,
     payload:data.videos
    })
  }
  catch(error){
    dispatch({type:CREATE_VIDEOS_GROUPS_VIDEO_FAIL,
    payload:error.response.data.message  
  })
  }
}

///// get grous videos of user
export const getgroupsVideoOfUser=()=>async(dispatch,getState)=>{
  try{
     dispatch({type:GET_GROUPS_VIDEOS_OF_USER_REQUEST});
     const config = { headers:{'Content-Type':'application/json'}};
     const{data} = await axios.get('https://video-sides.onrender.com/api/videos/get/all/user/group/videos',config);
     dispatch({type:GET_GROUPS_VIDEOS_OF_USER_SUCCESS,
     payload:data.videos
    })
  }
  
  catch(error){
    dispatch({type:GET_GROUPS_VIDEOS_OF_USER_FAIL,
    payload:error.response.data.message  
  })
  }
}

///// get user group single video
export const getgroupsVideoOfUserUnique=(id)=>async(dispatch)=>{
  try{
    console.log('group_id',id)
     dispatch({type:GET_GROUPS_VIDEOS_USER_UNIQUE_REQUEST});
     const config = { headers:{'Content-Type':'application/json'}}
     const{data} = await axios.get(`https://video-sides.onrender.com/api/videos/get/user/single/group/video/${id}`,config);
     dispatch({type:GET_GROUPS_VIDEOS_USER_UNIQUE_SUCCESS,
     payload:data.videos
    })
  }
  
  catch(error){
    dispatch({type:GET_GROUPS_VIDEOS_USER_UNIQUE_FAIL,
    payload:error.response.data.message  
  })
  }
}
///// video like create
export const videoLikeAction=(id)=>async(dispatch)=>{
  try{
     dispatch({type:VIDEO_LIKE_REQUEST});
     const config = { headers:{'Content-Type':'application/json'}};
     const{data} = await axios.put(`https://video-sides.onrender.com/api/videos/video/like/${id}`,config);
     dispatch({type:VIDEO_LIKE_SUCCESS,
     payload:data.video
    })
  }
  
  catch(error){
    dispatch({type:VIDEO_LIKE_FAIL,
    payload:error.response.data.message  
  })
  }
}


///// create commend
export const videoCommendCreateAction=(id,commend)=>async(dispatch)=>{
  try{
     dispatch({type:VIDEO_COMMEND_CREATE_REQUEST});
     const config = { headers:{'Content-Type':'application/json'}};
     const{data} = await axios.post(`https://video-sides.onrender.com/api/videos/create/commend/${id}/`,{commend},config);
     dispatch({type:VIDEO_COMMEND_CREATE_SUCCESS,
     payload:data.commends
    })
  }
  
  catch(error){
    dispatch({type:VIDEO_COMMEND_CREATE_FAIL,
    payload:error.response.data.message  
  })
  }
}
/////get video commned
export const videoCommendGetAction=(id)=>async(dispatch)=>{
  try{
     dispatch({type:VIDEO_COMMEND_GET_REQUEST});
     const config = { headers:{'Content-Type':'application/json'}}
     const{data} = await axios.get(`https://video-sides.onrender.com/api/videos/get/video/commends/${id}/`,config);
     dispatch({type:VIDEO_COMMEND_GET_SUCCESS,
     payload:data.commends
    })
  }
  
  catch(error){
    dispatch({type:VIDEO_COMMEND_GET_FAIL,
    payload:error.response.data.message  
  })
  }
}
export const isGroupsReset=()=>async(dispatch)=>{
   dispatch({type:RESET_VIDEO_GROUPS_NAME})
   dispatch({type:RESET_USER_VIDEOS})
}



export const isUserVideoReset=()=>async(dispatch)=>{
  dispatch({type:RESET_USER_VIDEOS})
}


/////poster  create
export const createPosterAction=(fromData)=>async(dispatch)=>{
  try{
     dispatch({type:POSTER_CREATE_REQUEST})
     const{data} = await axios.post('https://video-sides.onrender.com/api/posters/create/',fromData)
     dispatch({type:POSTER_CREATE_SUCCESS,
     payload:data
    })
  }
  
  catch(error){
    dispatch({type:POSTER_CREATE_FAIL,
    payload:error.response.data.message  
  })
  }
}


export const getPosterAction=()=>async(dispatch,getState)=>{
  try{
    const{registerStore:{userInfo}}=getState();
     dispatch({type:POSTER_GET_REQUEST});
     const config = {headers:{'Content-Type':'application/json',
     'Authorization':`bearer ${userInfo.access_token}`
     }}
     const{data} = await axios.get('https://video-sides.onrender.com/api/get/video/poster/',config);
     dispatch({type:POSTER_GET_SUCCESS,
     payload:data.poster_images
    })
  }
  
  catch(error){
    dispatch({type:POSTER_GET_FAIL,
    payload:error.response.data.message  
  })
  }
}

export const deletePosterAction=(id)=>async(dispatch,getState)=>{
  try{
    const{registerStore:{userInfo}}=getState();
     dispatch({type:POSTER_DELETE_REQUEST});
     const config = {headers:{'Content-Type':'application/json',
     'Authorization':`bearer ${userInfo.access_token}`
     }}
     const{data} = await axios.delete(`https://video-sides.onrender.com/api/delete/video/poster/${id}`,config);
     dispatch({type:POSTER_DELETE_SUCCESS,
     payload:data
    })
  }
  
  catch(error){
    dispatch({type:POSTER_DELETE_FAIL,
    payload:error.response.data.message  
  })
  }
}

export const posterReset=()=>(dispatch)=>{
  dispatch({type:POSTER_CREATE_RESET});
}

/////get all poster
export const getAllPosterAction=()=>async(dispatch)=>{
  try{
     dispatch({type:POSTER_GET_ALL_REQUEST});
     const{data} = await axios.get('https://video-sides.onrender.com/api/posters/get/all/');
     dispatch({type:POSTER_GET_ALL_SUCCESS,
     payload:data.posters
    })
  }
  
  catch(error){
    dispatch({type:POSTER_GET_ALL_FAIL,
    payload:error.response.data.message  
  })
  }
}
/////get single poster
export const getSinglePosterAction=(id)=>async(dispatch)=>{
  try{
     dispatch({type:POSTER_GET_SINGLE_REQUEST});
     const config = {headers:{'Content-Type':'application/json'}}
     const{data} = await axios.get(`https://video-sides.onrender.com/api/posters/get/single/${id}/`,config);
     console.log('action',data)
     dispatch({type:POSTER_GET_SINGLE_SUCCESS,
     payload:data.poster
   
    })
  }
  
  catch(error){
    dispatch({type:POSTER_GET_SINGLE_FAIL,
    payload:error.response.data.message  
  })
  }
}

/////create user reviews
export const cratePosterReviewAction=(id,fromData)=>async(dispatch)=>{
  try{
     dispatch({type:POSTER_CREATE_REVIEW_REQUEST});
     const config = {headers:{'Content-Type':'application/json'}}
     const{data} = await axios.post(`https://video-sides.onrender.com/api/posters/review/${id}/`,fromData,config);
     dispatch({type:POSTER_CREATE_REVIEW_SUCCESS,
     payload:data
    })
  }
  catch(error){
    dispatch({type:POSTER_CREATE_REVIEW_FAIL,
    payload:error.response.data.message  
  })
  }
}
