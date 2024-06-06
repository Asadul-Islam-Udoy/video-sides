import React, { useEffect, useState } from 'react'
import Navbar from '../../component/free_videos/navbar/Navbar';
import Lodder from '../../../../client/src/lodders/Lodder';
import Sidebar from '../../component/free_videos/sidbar/Sidebar';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglesCategoriesVideoAction } from '../../action/CategoryAction';
import { useParams } from 'react-router-dom';
import Pagination from '../../component/free_videos/bodys/Pagination';
import Register_Modals from '../auth/Register_Modals';
import Login_Modals from '../auth/Login_Modals';
import Categories from '../../component/category/Categories';

function Category_Home_Page() {
    const{id} = useParams();
    const[keyword,setKeyword] = useState();
    const[paginationbar,setPaginationbar] = useState(1);
    const [registerCreate,setRegisterCreate]=useState(false);
    const[loginCreate,setLoginCreate] = useState(false)
    const alert = useAlert();
    const [sidebar,setSidebar]  = useState(false);
    const dispatch = useDispatch();
    const {lodding,error:verror,categories} = useSelector(state=>state.singleCategoryStore);
    const{userInfo} = useSelector(state=>state.registerStore);
    useEffect(()=>{
    if(verror){
       alert.error(verror);
    }
    dispatch(getSinglesCategoriesVideoAction(id));
    },[id,alert,verror]);
    console.log('c',categories)
    
  return (
    <>
    {registerCreate && <Register_Modals registerCreate={registerCreate} setRegisterCreate={setRegisterCreate} setLoginCreate={setLoginCreate}/>}
    {loginCreate && <Login_Modals setLoginCreate={setLoginCreate} loginCreate={loginCreate} setRegisterCreate={setRegisterCreate}/>}
    <Navbar setKeyword={setKeyword} setSidebar={setSidebar} setLoginCreate={setLoginCreate} userInfo={userInfo}/>
      {lodding && <Lodder/> }
      <div className='home__container' style={{backgroundColor:'#c2c7cb'}}>
          <div className='home__box'>
            <div  className='left__'>
              <div className={sidebar?'side__bar__class':'side__bar__class__2'}>
                 <Sidebar  userInfo={userInfo} setRegisterCreate={setRegisterCreate} setLoginCreate={setLoginCreate}/>
              </div>
             </div>
             <div className='right__Secton'>
                 <Categories videos={categories}  paginationbar={paginationbar}setPaginationbar={setPaginationbar}/>
             </div>
          </div>
          <Pagination/>
     </div> 
    </>
  )
}

export default Category_Home_Page