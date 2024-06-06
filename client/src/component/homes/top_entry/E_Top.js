import React, { useEffect, useRef, useState } from 'react'
import './E_Top.css';
import Dashboard_Icon from './Dashboard_Icon';
import Register_Modals from '../../../pages/auth/Register_Modals';
import Login_Modals from '../../../pages/auth/Login_Modals';
function E_Top({coursolHeight ,setNotification}) {
    const sclRef = useRef();
    const [image,setImage] = useState(0);
    const[dashbord,setDashboard] = useState(false);
    const [registerCreate,setRegisterCreate]=useState(false);
    const[loginCreate,setLoginCreate] = useState(false)
    const obj = [
        {id:1,img:'https://www.theindianwire.com/wp-content/uploads/2019/03/Hollywood-movies-releaing-on-29-March-1024x576.jpg'},
        {id:1,img:'https://i.ytimg.com/vi/sADrOzIH958/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA0qWRN6gC5X4Gc73DdlWRxoxGOwQ'},
        {id:1,img:'https://i.ytimg.com/vi/TClOQTLMdGI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC4CnAVFV3q0ywbThZITiHgysK5DQ'},
        {id:1,img:'https://i.ytimg.com/vi/W5gHkRxcMPc/mqdefault.jpg'},
        {id:1,img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYv5wCWFceEkBZ1dVHbZuIT3ltVFPvr-3WxkOdZ9ByDDSJ8JYboFqnukdhKn12fX0qGhs&usqp=CAU'},
        {id:1,img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhP4hfVbdSLrV9QeOwMHPeMejb7XPhAj7zyXhEsqP6QmenQYRWl3PfsCDg0_Ses9IWlsk&usqp=CAU'},
        {id:1,img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA4WQUMjKPjd6qZjQVmyV493w2jaNrf-y1iBvRJ4HHDaobb6ZBh71nE0vJg1Aq472Xyn8&usqp=CAU'}
    ];


    let timer
    useEffect(()=>{
    timer = setInterval(() => {
        if(image !== obj.length){
            setImage(image+1)
        }
        if(image === obj.length){
            setImage(0)
        }
     }, 10000);
    },[image]);


   useEffect(()=>{
    return()=>{
        clearInterval(timer)
    }
   },[])
    useEffect(()=>{
        const select = sclRef.current;
        const selectImag = select.querySelectorAll('img')[image];
        if(selectImag){
            selectImag.scrollIntoView({behavior:'smooth'})
        }
    },[image]);
    

  return (
  <>
    {registerCreate && <Register_Modals registerCreate={registerCreate} setRegisterCreate={setRegisterCreate} setLoginCreate={setLoginCreate}/>}
    {loginCreate && <Login_Modals setLoginCreate={setLoginCreate} loginCreate={loginCreate} setRegisterCreate={setRegisterCreate}/>}
   <div className='entry__navbar__container'>
      <Dashboard_Icon setLoginCreate={setLoginCreate} setNotification={setNotification}/>
   </div>
   <div className={coursolHeight?'top_entry__container__':'top__entry__container'}>
     <div className='top__entry__box'> 
      <div ref={sclRef}>
     {
        obj.map((item,index)=>(
            <div  className='top__image__section'>
                 <img src={item.img} alt={index}/> 
            </div>
        ))
     }
     </div> 
    </div>
  </div>
  </>
  )
}

export default E_Top