import React, { useEffect, useState } from 'react'
import './Register_Modals.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BadgeIcon from '@mui/icons-material/Badge';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import PasswordIcon from '@mui/icons-material/Password';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import { RegisterAction, resetUser } from '../../action/UserAction';
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
function Register_Modals({registerCreate,setRegisterCreate,setLoginCreate}) {
    const [open, setOpen] = React.useState(true);
    const [btn,setBtn] = useState(false)
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const alert = useAlert();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[confirmPassword,setConfirmPassword] = useState('');
    const{error,isRegister} = useSelector(state=>state.registerStore)
    const registerSubmit=(e)=>{
     e.preventDefault();
     setBtn(true);
     if(password !== confirmPassword){
        alert.error('password is not match');
        setBtn(false);
     }
     else{
        const myFrom = new FormData();
        myFrom.set('username',name);
        myFrom.set('email',email);
        myFrom.set('password',password);
        dispatch(RegisterAction(myFrom))
     }
    }

    const loginShow=()=>{
        setLoginCreate((pre)=>!pre);
        if(registerCreate==true){
            setRegisterCreate((pre)=>!pre)
        }
    }

    useEffect(()=>{
       if(error){
        {Object.keys(error).map((key)=>{
            alert.error(error[key][0])
        })}
        setBtn(false);
       }
       if(isRegister){
        alert.success('send validate link your email address!');
        setOpen(false);
        setBtn(false);
       }
     dispatch(resetUser())
    },[error,alert,isRegister])
    return (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className='login__register__box'>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <p style={{textAlign:'center'}}>Register From</p>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <form className='register__from' onSubmit={registerSubmit}>
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
                           <input  required value={email} type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='enter the user name...'/>
                        </div>
                    </div>
                    <div>
                        <label>User Password</label>
                         <div>
                            <PasswordIcon className='register__icon'/>
                           <input  required value={password} type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='enter the user password...'/>
                        </div>
                    </div>
                    <div>
                        <label>User Confirm Password</label>
                         <div>
                            <EnhancedEncryptionIcon className='register__icon'/>
                           <input  required value={confirmPassword} type='password' onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='enter the user confirm password...'/>
                        </div>
                    </div>
                    <div className='register__login'>
                      <span>if you already register?<span style={{color:'red'}} onClick={loginShow}>login</span></span>
                    </div>
                    <div>
                        <button disabled={btn} type='submit'>Register</button>
                    </div>
                </form>
              </Typography>
            </Box>
          </Modal>
        </div>
      );
}

export default Register_Modals
