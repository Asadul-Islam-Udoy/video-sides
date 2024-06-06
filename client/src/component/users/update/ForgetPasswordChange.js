import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useState } from "react";
import Lodder from "../../../lodders/Lodder";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import { useEffect } from "react";
import { forgetPasswordResetAction, resetUser } from "../../../action/UserAction";
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
function ForgetPasswordChange() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const { lodding, userInfo, error, isForgetUpdatePassword } = useSelector(
    (state) => state.registerStore
  );
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();
  const ForgetPasswordSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert.error("password is not match");
    } else {
      const myFrom = new FormData();
      myFrom.set("otp", otp);
      myFrom.set("password", password);
      dispatch(forgetPasswordResetAction(myFrom));
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (isForgetUpdatePassword) {
      alert.success("password change successfully");
      setOpen(false);
    }
    dispatch(resetUser())
  }, [dispatch,alert, error, isForgetUpdatePassword]);
  return (
    <>
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
              <form className="register__from" onSubmit={ForgetPasswordSubmit}>
                <div>
                  <label>Sending OTP</label>
                  <div>
                    <AttachEmailIcon className="register__icon" />
                    <input
                      value={otp}
                      type="text"
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="enter the user otp..."
                    />
                  </div>
                </div>
                <div>
                  <label>Password</label>
                  <div>
                    <LockOpenIcon className="register__icon" />
                    <input
                      value={password}
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="enter the user password..."
                    />
                  </div>
                </div>
                <div>
                  <label>Confrim Password</label>
                  <div>
                    <KeyOffIcon className="register__icon" />
                    <input
                      value={confirmPassword}
                      type="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="enter the user confirm password..."
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

export default ForgetPasswordChange;
