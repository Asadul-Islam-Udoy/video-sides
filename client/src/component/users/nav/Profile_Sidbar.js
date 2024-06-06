import React from 'react'
import './Profile_Sidbar.css'
import { Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
function Profile_Sidbar() {
  const{userInfo} = useSelector(state=>state.registerStore);
  return (
    <>
    <div className='user__profile__sidebar__containser'>
      <div className='user__profile__sidebar__box'>
      <Link to={`/user/profile/${userInfo.user._id}`} style={{textDecoration:'none'}}><h3 style={{textAlign:'center',padding:'1px'}} className='dashboard__text'>Dashbord</h3></Link>
        <div className='user__profile__sidebar__body'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/user/profile/single-videos'>Single Videos</Link></li>
            <li><Link  to='/user/profile/groups-videos'>Group Videos</Link></li>
            <li><Link to='/user/update'>User</Link></li>
            <li><Link to='/user/posters'>Poster</Link></li>
            <li><Link to='/user/profict'>Video Profict</Link></li>
            <li><Link to='/user/order'>Video Order</Link></li>
            <li><Link to=''>Views</Link></li>
            <li><Link to=''>Retings</Link></li>
            <li><Link>Setting</Link></li>
        </div>
      </div>
    </div>
  </>
  )
}

export default Profile_Sidbar