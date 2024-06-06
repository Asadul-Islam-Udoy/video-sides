import React, { useState } from 'react'
import './SignalVideo.css';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';

function ReplayCommend() {
    const[replay2,setReplay2] = useState(false);
    const[position,setProsition] = useState(true)
    return (
    <>
     <div className='replay__input__section'>
      <div className='replay__message'>psfion iowruo  soiruio<span onClick={()=>setReplay2((pre)=>!pre)} className='replay__section'><ReplayCircleFilledIcon className='replay__icon'/>replay</span></div>
      <div className={position ?'replay__message1':'replay_message2'}>psfion iowruo  soiruio<span onClick={()=>setReplay2((pre)=>!pre)} className='replay__section'><ReplayCircleFilledIcon className='replay__icon'/>replay</span></div>
       {replay2 &&        
        <div className='replay__input'>
          <input />
          <button>send</button>
        </div>
          }
      </div>
    </>
  )
}

export default ReplayCommend