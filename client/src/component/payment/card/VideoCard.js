import React, { useRef } from 'react';
import './VideoCard.css';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ClosedCaptionOffIcon from '@mui/icons-material/ClosedCaptionOff';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  useElements,
  useStripe,
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement
}from "@stripe/react-stripe-js";
import axios from 'axios';
import { useAlert } from 'react-alert';
import { paymentConfirmAction, paymentStoreResetAction } from '../../../action/PaymentVideosAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function VideoCard() {
  const btnRef = useRef();
  const alert = useAlert();
  const stripe = useStripe();
  const element = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const{userInfo} = useSelector(state=>state.registerStore);
  const addressInfo = JSON.parse(sessionStorage.getItem('addressInfo'));
  const order = {
    username:addressInfo?.username,
    email:addressInfo?.email,
    addressInfos:[{
    address:addressInfo?.address,
    city:addressInfo?.city,
    state:addressInfo?.state,
    country:addressInfo?.country,
    phone:addressInfo?.phone,
    stateCode:addressInfo?.stateCode,
    }],
    videoId:addressInfo?.videoId,
    videoCost:addressInfo?.cost,
    paymentUser:userInfo.user._id,
    createUser:addressInfo?.createUser,
    video:addressInfo?.video
  }
  const amount={
    amount:Math.round(addressInfo?.cost *100)
  }
  const paymentHandler=async(e)=>{
  e.preventDefault();
  btnRef.current.disabled=true
 try{
  const config = {headers:{'Content-Type':'application/json'}}
  const{data} = await axios.post('/api/videos/payment/stripe',amount,config);
  if(data){
    const scrite_key = data.clientSecret;
    console.log('data',scrite_key);
    if(!stripe || !element) return
    const result = await stripe.confirmCardPayment(scrite_key,{
      payment_method:{
        card:element.getElement(CardNumberElement),
        billing_details:{
          name:addressInfo.username,
          email:addressInfo?.email,
          address:{
            line1:addressInfo.address,
            city:addressInfo.city,
            state:addressInfo.state,
            country:addressInfo.country,
            postal_code:addressInfo.stateCode
          }
        }
      }
    });
    if(result.error){
      alert.error('somthing is wrong please try again!');
      btnRef.current.disabled=false
    }
    else{
       if(result.paymentIntent.status == 'succeeded'){
           order.status_id = result.paymentIntent.id;
           order.status = result.paymentIntent.status;
           dispatch(paymentConfirmAction(order));
           navigate('/payment/success');
           dispatch(paymentStoreResetAction());
       }
    }
  }
  else{
    alert.error('script key not found')
    btnRef.current.disabled=false
  }
 }
 catch(error){
  alert.error(error)
  btnRef.current.disabled=false
 }
 }
  return (
    <>
    <div className='video__card__container'>
        <div className='video__card__box'>
            <form onSubmit={paymentHandler}>
              <div>
                 <CreditCardIcon className='card__icon'/>
                 <CardNumberElement className='card__icon__payment'/>
              </div>
              <div>
                 <ClosedCaptionOffIcon  className='card__icon'/>
                 <CardCvcElement className='card__icon__payment'/>
              </div>
              <div>
                 <CalendarMonthIcon className='card__icon'/>
                 <CardExpiryElement className='card__icon__payment'/>
              </div>
              <div>
                <button ref={btnRef}>$ {addressInfo?.cost} Payment</button>
              </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default VideoCard