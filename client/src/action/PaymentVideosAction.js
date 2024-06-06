import axios from "axios";
import { 
    PAYMENT_CONFRIM_SUCCESS,
    PAYMENT_CONFRIM_FAIL,
    PAYMENT_CONFRIM_REQUEST,
    USER_GET_PAYMENT_VIDEO_ME_REQUEST,
    USER_GET_PAYMENT_VIDEO_ME_SUCCESS,
    USER_GET_PAYMENT_VIDEO_ME_FAIL,
    ORDER_VIDEO_SHOW_REQUEST,
    ORDER_VIDEO_SHOW_SUCCESS,
    ORDER_VIDEO_SHOW_FAIL

  } from "../constance/PaymentVideoConstance";

export const VideoAddressStoreAction=({username,email,address,city,state,stateCode,country,phone,videoCost,id,createUser,video})=>(dispatch)=>{
    const data={
        username:username,
        email:email,
        address:address,
        city:city,
        state:state,
        stateCode:stateCode,
        country:country,
        phone:phone,
        cost:videoCost,
        videoId:id,
        createUser,
        video
    }
    sessionStorage.setItem('addressInfo',JSON.stringify(data));
 }

/////payment comfirm action
 export const paymentConfirmAction=(fromData)=>async(dispatch)=>{
  try{
   dispatch({type:PAYMENT_CONFRIM_REQUEST});
   const config = {headers:{'Content-Type':'application/json'}}; 
   const {data} = await axios.post('/api/videos/payment/confirm',fromData,config)
   dispatch({type:PAYMENT_CONFRIM_SUCCESS,
   payload:data
   })
  }
  catch(error){
    dispatch({type:PAYMENT_CONFRIM_FAIL,
    payload:error.response.data.message
    })
  }
 }


 export const paymentStoreResetAction=()=>(dispatch)=>{
  sessionStorage.removeItem('addressInfo');
 }

/////order show user
 export const orderShowVideoAction=()=>async(dispatch)=>{
  try{
   dispatch({type:ORDER_VIDEO_SHOW_REQUEST});
   const config = {headers:{'Content-Type':'application/json'}};
   const{data} = await axios.get('/api/videos/get/user/orders/',config);
   dispatch({type:ORDER_VIDEO_SHOW_SUCCESS,
   payload:data.orders
   })
  }
  catch(error){
    dispatch({type:ORDER_VIDEO_SHOW_FAIL,
    payload:error.response.data.message
    })
  }
 }

///// user payment
export const userPaymentVideoAction=()=>async(dispatch)=>{
  try{
   dispatch({type:USER_GET_PAYMENT_VIDEO_ME_REQUEST});
   const config = {headers:{'Content-Type':'application/json'}}
   const{data} = await axios.get('/api/videos/get/me/user/payment/videos/profit/',config);
   dispatch({type:USER_GET_PAYMENT_VIDEO_ME_SUCCESS,
   payload:data.pymentVideos
   })
  }
  catch(error){
    dispatch({type:USER_GET_PAYMENT_VIDEO_ME_FAIL,
    payload:error.response.data.message
    })
  }
 }