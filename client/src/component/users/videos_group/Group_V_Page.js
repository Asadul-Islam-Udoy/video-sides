import React, { useState } from 'react'
import Profile_Nav from '../nav/Profile_Nav';
import Profile_Sidbar from '../nav/Profile_Sidbar';
import Group_Videos from './Group_Videos';

function Group_V_Page() {
    const [sidebar,setSidebar]  = useState(true);
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
                    <Group_Videos/>
                 </div>
               </div>
            </div>
       </div>
   </>
    )
}

export default Group_V_Page