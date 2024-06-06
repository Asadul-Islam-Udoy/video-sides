import React, { useEffect, useRef } from 'react'
import './F_Video.css';
import Sidebar from '../../component/free_videos/sidbar/Sidebar';
import Bodys from '../../component/free_videos/bodys/Bodys';
import { useState } from 'react';
import Navbar from '../../component/free_videos/navbar/Navbar';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import { getAllFreeVideosAction} from '../../action/VideosAction';
import Lodder from '../../lodders/Lodder';
import Register_Modals from '../auth/Register_Modals';
import Login_Modals from '../auth/Login_Modals';
function Free_Video() {
 const[keyword,setKeyword] = useState();
 const[paginationbar,setPaginationbar] = useState(1);
 const [registerCreate,setRegisterCreate]=useState(false);
 const[loginCreate,setLoginCreate] = useState(false)
 const alert = useAlert();
 const [sidebar,setSidebar]  = useState(false);
 const dispatch = useDispatch();
 const {lodding,error:verror,videos} = useSelector(state=>state.videoStore);
 const{error,userInfo} = useSelector(state=>state.registerStore);
 useEffect(()=>{
 if(typeof(error) == 'string'){
   alert.error(error)
 }
 else{
  if(error){
    Object.keys(error).map((key)=>{
      alert.error(error[key][0]);
    })
  }
 }
 if(verror){
    alert.error(verror);
 }
 dispatch(getAllFreeVideosAction(keyword,paginationbar));
 },[alert,error,verror,keyword,paginationbar]);
  return (
    <>  
    {registerCreate && <Register_Modals registerCreate={registerCreate} setRegisterCreate={setRegisterCreate} setLoginCreate={setLoginCreate}/>}
    {loginCreate && <Login_Modals setLoginCreate={setLoginCreate} loginCreate={loginCreate} setRegisterCreate={setRegisterCreate}/>}
    <Navbar setKeyword={setKeyword} setSidebar={setSidebar} setLoginCreate={setLoginCreate}/>
      {lodding && <Lodder/> }
      <div className='home__container'>
          <div className='home__box'>
            <div  className='left__'>
              <div className={sidebar?'side__bar__class':'side__bar__class__2'}>
                 <Sidebar  userInfo={userInfo} setRegisterCreate={setRegisterCreate} setLoginCreate={setLoginCreate}/>
              </div>
             </div>
             <div className='right__Secton'>
                  <Bodys videos={videos} paginationbar={paginationbar} setPaginationbar={setPaginationbar}/>
             </div>
          </div>
     </div> 
    </>
  )
}

export default Free_Video
