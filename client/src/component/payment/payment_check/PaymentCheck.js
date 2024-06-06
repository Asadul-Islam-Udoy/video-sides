import React from 'react';
import './PaymentCheck.css';
import { Link } from 'react-router-dom';
function PaymentCheck() {
    const data = JSON.parse(sessionStorage.getItem('addressInfo'));

  return (
    <>
    <div className='payment__check__container'>
        <div className='check__test__section'>
          <h1>Please Check This Information</h1>
        </div>
         <div className='payment__check__box'>
             <div>
                 <span>UserName</span>
                 <span>:</span>
                 <span>{data.username}</span>
            </div>
            <div>
                 <span>Email</span>
                 <span>:</span>
                 <span>{data.email}</span>
            </div>
            <div>
                 <span>Address</span>
                 <span>:</span>
                 <span>{data.address}</span>
            </div>
            <div>
                 <span>City</span>
                 <span>:</span>
                 <span>{data.city}</span>
            </div>
            <div>
                 <span>Phone Numbeer</span>
                 <span>:</span>
                 <span>{data.phone}</span>
            </div>   
            <div>
                 <span>State</span>
                 <span>:</span>
                 <span>{data.state}</span>
            </div>
            <div>
                 <span>Country</span>
                 <span>:</span>
                 <span>{data.country}</span>
            </div>
            <div>
                 <span>Price Cost</span>
                 <span>:</span>
                 <span>$ {data.cost}</span>
            </div>
            <div>
                <button><Link to='/payment/address/card'>Confirm</Link></button>
            </div>
         </div>
    </div>
    </>
  )
}

export default PaymentCheck