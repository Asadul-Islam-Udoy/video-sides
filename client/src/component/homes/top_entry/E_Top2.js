import React from 'react'
import './E_Top2.css'
import { useNavigate } from 'react-router-dom'
function E_Top2() {
    const navigate = useNavigate();

    
    const freevideoHandler=()=>{
        navigate('/videos/free');
    }

    const paymentvideoHandler=()=>{
      navigate('/videos/payment')
    }
  return (
    <>
    <div className='top2__entry__container'>
       <div className='top2__entry__box'>
        <div className='top__center__bottom'>
            <div><button onClick={paymentvideoHandler}>Payment Videos</button></div>
            <div><button onClick={freevideoHandler}>Free Videos</button></div>
        </div>
       </div>
    </div>
    </>
  )
}

export default E_Top2