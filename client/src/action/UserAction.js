import axios from 'axios'
import {
      REGISTER_CREATE_FAIL,
      REGISTER_CREATE_REQUEST, 
      REGISTER_CREATE_SUCCESS,
      LOGIN_CREATE_FAIL,
      LOGIN_CREATE_SUCCESS,
      LOGIN_CREATE_REQUEST,
      LOGOUT_CREATE_FAIL,
      LOGOUT_CREATE_SUCCESS,
      LOGOUT_CREATE_REQUEST,
      GET_ALL_USERS_FAIL,
      GET_ALL_USERS_SUCCESS,
      GET_ALL_USERS_REQUEST,
      DELETE_USER_FAIL,
      DELETE_USER_SUCCESS,
      DELETE_USER_REQUEST,
      PERMISSION_USER_FAIL,
      PERMISSION_USER_REQUEST,
      PERMISSION_USER_SUCCESS,
      ROLE_PERMISSION_USER_FAIL,
      ROLE_PERMISSION_USER_REQUEST,
      ROLE_PERMISSION_USER_SUCCESS,
      UPDATE_USER_INFO_SUCCESS,
      UPDATE_USER_INFO_FAIL,
      UPDATE_USER_INFO_REQUEST,
      FORGET_PASSWORD_EMAIL_REQUEST,
      FORGET_PASSWORD_EMAIL_SUCCESS,
      FORGET_PASSWORD_EMAIL_FAIL,
      FORGET_PASSWORD_RESET_REQUEST,
      FORGET_PASSWORD_RESET_SUCCESS,
      FORGET_PASSWORD_RESET_FAIL,
      USER_RESET,
      REGISTER_RESET
     } from '../constance/UserConstance';

/////register create
export const RegisterAction=(fromData)=>async(dispatch)=>{
   try{
     dispatch({type:REGISTER_CREATE_REQUEST});
     const config = {headers:{'Content-Type':'application/json'}}
     const{data} = await axios.post('/api/users/register/',fromData,config);
     dispatch({type:REGISTER_CREATE_SUCCESS,
     payload:data
    })
   }
   catch(error){
    dispatch({type:REGISTER_CREATE_FAIL,
    payload:error.response.data.message
    })
   }
}
///// login create
export const LoginAction=(email,password)=>async(dispatch)=>{
    try{
      dispatch({type:LOGIN_CREATE_REQUEST});
      const config = {headers:{"Content-Type":"application/json"}}
      const{data} = await axios.post('/api/users/login/',{email,password},config);
      dispatch({type:LOGIN_CREATE_SUCCESS,
      payload:data
     })
     localStorage.setItem('userInfo',JSON.stringify(data));
    }
    catch(error){
     dispatch({type:LOGIN_CREATE_FAIL,
     payload:error.response.data.message
     })
    }
 }
 ///// logout create
 export const LogoutAction=()=>async(dispatch)=>{
    try{
       dispatch({type:LOGOUT_CREATE_REQUEST});
       const{data} = await axios.get('/api/users/logout');
      dispatch({type:LOGOUT_CREATE_SUCCESS,
      payload:data
     })
     localStorage.removeItem('userInfo');
    }
    catch(error){
     dispatch({type:LOGOUT_CREATE_FAIL,
     payload:error.response.data.message
     })
    }
 }

 ////upate user
 export const upateUserInfoAction=(fromData)=>async(dispatch)=>{
   try{
    dispatch({type:UPDATE_USER_INFO_REQUEST});
    const config = {headers:{'Content-Type':'application/json'}};
    const{data} = await axios.put('/api/users/update/',fromData,config);
    dispatch({type:UPDATE_USER_INFO_SUCCESS,
      payload:data
    })
   }
   catch(error){
      dispatch({type:UPDATE_USER_INFO_FAIL,
         payload:error.response.data.message
      })
   }
 }

 ///password rest email send action
 export const forgetPasswordEmailAction=(email)=>async(dispatch)=>{
   try{
    dispatch({type:FORGET_PASSWORD_EMAIL_REQUEST});
    const config = {headers:{'Content-Type':'application/json'}};
    const {data} = await axios.post('/api/users/forgetpassword/email/',{email},config);
    dispatch({type: FORGET_PASSWORD_EMAIL_SUCCESS,
     payload:data
    })
   }
   catch(error){
      dispatch({type:FORGET_PASSWORD_EMAIL_FAIL,
         payload:error.response.data.message
      })
   }
 }

  ///password rset  action
  export const forgetPasswordResetAction=(fromData)=>async(dispatch)=>{
   try{
    dispatch({type:FORGET_PASSWORD_RESET_REQUEST});
    const config = {headers:{'Content-Type':'application/json'}};
    const {data} = await axios.put('/api/users/forgetpassword/reset/',fromData,config);
    dispatch({type: FORGET_PASSWORD_RESET_SUCCESS,
     payload:data
    })
   }
   catch(error){
      dispatch({type:FORGET_PASSWORD_RESET_FAIL,
         payload:error.response.data.message
      })
   }
 }




 export const getAdminUserAction=()=>async(dispatch,getState)=>{
   try{
      const{registerStore:{userInfo}}=getState();
      dispatch({type:GET_ALL_USERS_REQUEST});
      const config={headers:{'Content-Type':'application/json',
      'Authorization' : `bearer ${userInfo?.access_token}`}}
      const{data} = await axios.get('http://127.0.0.1:8000/api/get/all/users',config);
      dispatch({type:GET_ALL_USERS_SUCCESS,
      payload:data.users
    })
   }
   catch(error){
    dispatch({type:GET_ALL_USERS_FAIL,
    payload:error.response.data.message
    })
   }
}

export const deleteAdminUserAction=(id)=>async(dispatch,getState)=>{
   try{
      const{registerStore:{userInfo}}=getState();
      dispatch({type:DELETE_USER_REQUEST});
      const config={headers:{'Content-Type':'application/json',
      'Authorization' : `bearer ${userInfo?.access_token}`}}
      const{data} = await axios.delete(`http://127.0.0.1:8000/api/delete/user/${id}`,config);
      dispatch({type:DELETE_USER_SUCCESS,
      payload:data.users
    })
   }
   catch(error){
    dispatch({type:DELETE_USER_FAIL,
    payload:error.response.data.message
    })
   }
}

export const permissionUserAction=(id,fromData)=>async(dispatch,getState)=>{
   try{
      const{registerStore:{userInfo}}=getState();
      dispatch({type:PERMISSION_USER_REQUEST});
      const config={headers:{'Content-Type':'multipart/form-data',
      'Authorization' : `bearer ${userInfo?.access_token}`}}
      const{data} = await axios.post(`http://127.0.0.1:8000/api/permission/user/${id}`,fromData,config);
      dispatch({type:PERMISSION_USER_SUCCESS,
      payload:data.users
    })
   }
   catch(error){
    dispatch({type:PERMISSION_USER_FAIL,
    payload:error.response.data.message
    })
   }
}

export const RolePermissionUserAction=(id,fromData)=>async(dispatch,getState)=>{
   try{
      const{registerStore:{userInfo}}=getState();
      dispatch({type:ROLE_PERMISSION_USER_REQUEST});
      const config={headers:{'Content-Type':'application/json',
      'Authorization' : `bearer ${userInfo?.access_token}`}}
      const{data} = await axios.post(`http://127.0.0.1:8000/api/permission/user/role/${id}`,fromData,config);
      dispatch({type:ROLE_PERMISSION_USER_SUCCESS,
      payload:data.users
    })
   }
   catch(error){
    dispatch({type:ROLE_PERMISSION_USER_FAIL,
    payload:error.response.data.message
    })
   }
}
export const resetUser=()=>(dispatch)=>{
    dispatch({type:REGISTER_RESET})
    dispatch({type:USER_RESET})
}