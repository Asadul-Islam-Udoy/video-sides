import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BadgeIcon from '@mui/icons-material/Badge';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import PasswordIcon from '@mui/icons-material/Password';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { LogoutAction, resetUser, upateUserInfoAction } from '../../../action/UserAction';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
function User_Update() {
    const{userInfo,error,isUpdateUser} = useSelector(state=>state.registerStore);
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const [name,setName] = useState(userInfo?.user.username);
    const [email,setEmail] = useState(userInfo?.user.email);
    const[password,setPassword] = useState('');
    const updateSubmit=(e)=>{
        e.preventDefault();
           const myFrom = new FormData();
           myFrom.set('username',name);
           myFrom.set('email',email);
           myFrom.set('password',password);
           dispatch(upateUserInfoAction(myFrom))
       }
       useEffect(()=>{
        if(error){
          alert.error(error);
        }
        if(isUpdateUser){
          alert.success('user update successfully!');
          dispatch(resetUser())
          dispatch(LogoutAction());
          navigate('/');
        }
       },[dispatch,navigate,alert,error,isUpdateUser])
  return (
    <>
    <div className='user__update__containsr'>
       <div className='user__update__box'>
       <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className='login__register__box'>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <p style={{textAlign:'center'}}>Update From</p>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div className='avator__images__section'>
                  <img src={userInfo?.user.avatar} alt='images file'/>
                </div>
                <form className='register__from' onSubmit={updateSubmit}>
                    <div>
                        <label>User Name</label>
                         <div>
                            <BadgeIcon className='register__icon'/>
                           <input value={name} type='text' onChange={(e)=>setName(e.target.value)} placeholder='enter the user name...'/>
                        </div>
                    </div>
                    <div>
                        <label>User Email</label>
                         <div>
                            <AttachEmailIcon className='register__icon'/>
                           <input value={email} type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='enter the user name...'/>
                        </div>
                    </div>
                    <div>
                        <label>Old Password</label>
                         <div>
                            <PasswordIcon className='register__icon'/>
                           <input value={password} type='text' onChange={(e)=>setPassword(e.target.value)} placeholder='enter the old password...'/>
                        </div>
                    </div>
                    <div>
                        <button type='submit'>Update</button>
                    </div>
                </form>
              </Typography>
            </Box>
          </Modal>
       </div>
    </div>
    </>
  )
}

export default User_Update