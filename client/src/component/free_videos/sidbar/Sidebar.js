import React from 'react';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LogoutIcon from '@mui/icons-material/Logout';
import {useDispatch} from 'react-redux';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import './Sidebar.css'
import { LogoutAction } from '../../../action/UserAction';
import { Link } from 'react-router-dom';
function Sidebar({userInfo,setRegisterCreate}) {
  const dispatch  = useDispatch();
 
  const logoutHandler=()=>{
    dispatch(LogoutAction());
  }

  return (
    <>
      <div className='sidebar__containser'>
        <div className='sidebar__box'>
          <h3 style={{textAlign:'center',padding:'5px'}}>Side bar</h3>
          <div className='sidebar__list__section'>
           <li><Link to="/"><OtherHousesIcon/>Home</Link></li>
            {userInfo===null?
            <li onClick={()=>setRegisterCreate((pre)=>!pre)}><Link ><AppRegistrationIcon/>Sign In</Link></li>
            :<li onClick={logoutHandler}><Link ><LogoutIcon/>Logout</Link></li>
            }
            <li><Link><StorefrontIcon/>All Videos</Link></li>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
