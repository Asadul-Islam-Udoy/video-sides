import { 
    PAYMENT_CONFRIM_SUCCESS,
    PAYMENT_CONFRIM_FAIL,
    PAYMENT_CONFRIM_REQUEST,
    ORDER_VIDEO_SHOW_REQUEST,
    ORDER_VIDEO_SHOW_SUCCESS,
    ORDER_VIDEO_SHOW_FAIL,
    USER_GET_PAYMENT_VIDEO_ME_REQUEST,
    USER_GET_PAYMENT_VIDEO_ME_SUCCESS,
    USER_GET_PAYMENT_VIDEO_ME_FAIL
  } from "../constance/PaymentVideoConstance";

export const getPaymentVideoReducer=(state={getPaymentVideos:[]},action)=>{
   switch(action.type){
        case PAYMENT_CONFRIM_REQUEST:
        return{
            ...state,
            lodding:true
        }
    case PAYMENT_CONFRIM_SUCCESS:
         return{
             ...state,
             lodding:false,
             confirmPayment:action.payload,
         }
        case PAYMENT_CONFRIM_FAIL:
        return{
            ...state,
            lodding:false,
            error:action.payload
        }
    default:
        return state
   }
}

export const orderVideoShowReducer=(state={OrdersShow:[]},action)=>{
   switch(action.type){
    case ORDER_VIDEO_SHOW_REQUEST:
        return{
            ...state,
            lodding:true,
        }
    case ORDER_VIDEO_SHOW_SUCCESS:
        return{
            ...state,
            lodding:false,
            OrdersShow:action.payload
        }
    case ORDER_VIDEO_SHOW_FAIL:
        return{
            ...state,
            lodding:false,
            error:action.payload
        }
    default :
         return state
   }
}


export const userPaymentVideoShowReducer=(state={paymentVideoShow:[]},action)=>{
    switch(action.type){
     case USER_GET_PAYMENT_VIDEO_ME_REQUEST:
         return{
             ...state,
             lodding:true,
         }
     case USER_GET_PAYMENT_VIDEO_ME_SUCCESS:
         return{
             ...state,
             lodding:false,
             paymentVideoShow:action.payload
         }
     case USER_GET_PAYMENT_VIDEO_ME_FAIL:
         return{
             ...state,
             lodding:false,
         }
     default :
          return state
    }
 }
 