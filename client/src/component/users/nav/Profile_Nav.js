import React, { useState } from "react";
import AppsIcon from "@mui/icons-material/Apps";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogoutAction } from "../../../action/UserAction";
import "./Profile_Nav.css";
function Profile_Nav({ setSidebar }) {
  const [profile, setProfile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(LogoutAction());
    navigate("/");
  };
  return (
    <>
      <div className="user__profile__navbar__conainer">
        <div className="user__profile__navbar__box">
          <div className="user__profile__navbar__left">
            <div className="">
              <AppsIcon
                className="user__profile__toggle__icon"
                onClick={() => setSidebar((pre) => !pre)}
              />
            </div>
            <img
              src="https://img.freepik.com/premium-vector/video-film_8251-70.jpg?w=740"
              alt="imagesfile"
            />
          </div>
          <div className="user__profile__navbar__center">
            <p>Profile Page</p>
          </div>
          <div className="user__profile__navbar__right">
            <div>
              {" "}
              <NotificationsNoneIcon className="user__profile__right__icon user__profile__notification" />
            </div>
            <div onClick={() => setProfile((pre) => !pre)}>
              <SupervisorAccountIcon className="right__icon" />
              <div>
                {profile && (
                  <div className="user__dashboard">
                    {/* <li><Link to='/user__profile/dashbord'>Profile</Link></li> */}
                    <li onClick={logoutHandler}>
                      <Link>Logout</Link>
                    </li>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile_Nav;
