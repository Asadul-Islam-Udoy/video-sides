import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useState } from 'react';
import Lodder from '../../../lodders/Lodder';
import { forgetPasswordEmailAction } from '../../../action/UserAction';
import ForgetPasswordChange from './ForgetPasswordChange';
import { useEffect } from 'react';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function ForgetPassswordEmail() {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);
    const{lodding,userInfo,error,isForgetEmail} = useSelector(state=>state.registerStore);
    const[email,setEmail] = useState('');
    const[changePasswordShow,setChangePasswordShow] = useState(false);
    const alert = useAlert();
    const dispatch = useDispatch();
    const EmailSubmit=(e)=>{
     e.preventDefault();
      dispatch(forgetPasswordEmailAction(email))
    }
    useEffect(()=>{
        if(error){
            alert.error(error);
        }
        if(isForgetEmail){
          setChangePasswordShow(true);
          setOpen(false);
          alert.success('send otp your email address')
        }
    },[alert,error,isForgetEmail])
    return (
        <>
         {changePasswordShow && <ForgetPasswordChange/>}
          {lodding && <Lodder />}
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} className="login__register__box">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <p style={{ textAlign: "center" }}>Forget Password Email From</p>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <form className="register__from" onSubmit={EmailSubmit}>
                    <div>
                      <label>User Email</label>
                      <div>
                        <AttachEmailIcon className="register__icon" />
                        <input
                          value={email}
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="enter the user name..."
                        />
                      </div>
                    </div>
                    <div>
                      <button type="submit">Submit</button>
                    </div>
                  </form>
                </Typography>
              </Box>
            </Modal>
          </div>
        </>
      );
}

export default ForgetPassswordEmail