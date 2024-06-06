import React from 'react'
import './PaymentSuccess.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
function PaymentSuccess() {
  return (
    <>
    <div className='payment__success__container'>
        <div className='payment__success__box'>
              <div><CheckCircleOutlineIcon className='success__icon'/></div>
             <div className='payment__text__success'><h2>Payment successfully</h2></div>
         </div>
    </div>
    </>
  )
}

export default PaymentSuccess