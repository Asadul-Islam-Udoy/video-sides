import React, { useEffect, useState } from 'react'
import './User_Profile.css';
import Profile_Nav from '../nav/Profile_Nav';
import Profile_Sidbar from '../nav/Profile_Sidbar';
import {useAlert} from 'react-alert';
import {useDispatch, useSelector} from 'react-redux';
import Charts from './Chart';
function User_Profile() {
  const [sidebar,setSidebar]  = useState(true);
  const alert = useAlert();
  const dispatch = useDispatch();
  const{error} = useSelector(state=>state.registerStore);
  useEffect(()=>{
     if(error){
       alert.error(error);
     }
  },[dispatch,alert,error])
  return (
    <>
      <div><Profile_Nav setSidebar={setSidebar}/></div>
      <div className='admin__container'>
          <div className='admin__box'>
             <div>
             <div className='left__'>
             {sidebar && <Profile_Sidbar/>}
             </div>
             </div>
             <div className='right__'>
               <div className='admin__home__body__top'>
                <Charts/>
               </div>
             </div>
          </div>
     </div>
    </>
  )
}

export default User_Profile