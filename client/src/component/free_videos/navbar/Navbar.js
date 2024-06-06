import React, { useEffect, useState } from "react";
import "./Navbar.css";
import AppsIcon from "@mui/icons-material/Apps";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAction, resetUser } from "../../../action/UserAction";
function Navbar({ setKeyword, setSidebar, setLoginCreate }) {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [dashbord, setDashboard] = useState(false);
  const { error, isLogout, userInfo } = useSelector(
    (state) => state.registerStore
  );
  const LogoutHandler = () => {
    dispatch(LogoutAction());
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (isLogout) {
      alert.success("logout successfully");
    }
    dispatch(resetUser());
  }, [alert, error, isLogout]);
  return (
    <>
      <div className="navbar__conainer">
        <div className="navbar__box">
          <div className="navbar__left">
            <AppsIcon
              className="toggle__icon"
              onClick={() => setSidebar((pre) => !pre)}
            />
            <img
              src="https://img.freepik.com/premium-vector/video-film_8251-70.jpg?w=740"
              alt="imagesfile"
            />
          </div>
          <div className="navbar__center">
            <input
              name="search"
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="search..."
            />
            <div>
              <LocationSearchingIcon className="search__icon" />
            </div>
          </div>
          <div className="navbar__right">
            <div>
              {" "}
              <NotificationsNoneIcon className="right__icon notification" />
            </div>
            <div onClick={() => setDashboard((pre) => !pre)}>
              <SupervisorAccountIcon className="right__icon profile__icon" />
              {userInfo?.users?.role === "superuser" ? (
                <div>
                  {dashbord && (
                    <div className="user__dashboard">
                      <li>
                        <Link to="/admin/dashboard">Dashbord</Link>
                      </li>
                      <li onClick={() => setLoginCreate((pre) => !pre)}>
                        <Link>Login</Link>
                      </li>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {dashbord && (
                    <div className="user__dashboard">
                      {userInfo !== null && (
                        <li>
                          <Link to={`/user/profile/${userInfo?.user?._id}`}>
                            Profile
                          </Link>
                        </li>
                      )}
                      {userInfo !== null ? (
                        <li onClick={LogoutHandler}>
                          <Link>Logout</Link>
                        </li>
                      ) : (
                        <li onClick={() => setLoginCreate((pre) => !pre)}>
                          <Link>Login</Link>
                        </li>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
