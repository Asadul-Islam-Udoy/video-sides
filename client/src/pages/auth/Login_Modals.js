import React, { useEffect, useState } from "react";
import "./Register_Modals.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Lodder from "../../lodders/Lodder";
import { LoginAction, resetUser } from "../../action/UserAction";
import ForgetPassswordEmail from "../../component/users/update/ForgetPassswordEmail";
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
function Login_Modals({ setRegisterCreate, loginCreate, setLoginCreate }) {
  const alert = useAlert();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgetShow,setForgetShow] = useState(false);
  const dispatch = useDispatch();
  const { error, lodding, isLogin } = useSelector(
    (state) => state.registerStore
  );
  const registerShow = () => {
    setRegisterCreate((pre) => !pre);
    if (loginCreate == true) {
      setLoginCreate((pre) => !pre);
    }
  };
  const LoinSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginAction(email,password));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (isLogin) {
      alert.success("login successfully!");
      navigate("/");
      setLoginCreate((pre) => !pre);
    }
    dispatch(resetUser());
  }, [error, alert, isLogin, navigate]);
  return (
    <>
      {lodding && <Lodder />}
      {forgetShow && <ForgetPassswordEmail/>}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="login__register__box">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <p style={{ textAlign: "center" }}>Login From</p>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form className="register__from" onSubmit={LoinSubmit}>
                <div>
                  <label>User Email</label>
                  <div>
                    <AttachEmailIcon className="register__icon" />
                    <input
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="enter the user name..."
                      required
                    />
                  </div>
                </div>
                <div>
                  <label>User Password</label>
                  <div>
                    <LockOpenIcon className="register__icon" />
                    <input
                      required
                      value={password}
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="enter the user password..."
                    />
                  </div>
                </div>
                <div className="register__login">
                  <span>
                    if you don't register?
                    <span style={{ color: "red" }} onClick={registerShow}>
                      register
                    </span>
                  </span>
                </div>
                <div style={{cursor:'pointer'}} onClick={()=>[setForgetShow((pre)=>!pre),setOpen((pre)=>!pre)]}>
                  <span>
                    <KeyOffIcon />
                    forget passowrd
                  </span>
                </div>
                <div>
                  <button type="submit">Login</button>
                </div>
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default Login_Modals;
