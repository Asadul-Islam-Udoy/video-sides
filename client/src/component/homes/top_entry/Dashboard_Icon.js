import React, { useEffect, useState } from "react";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useDispatch, useSelector } from "react-redux";
import CategoryIcon from "@mui/icons-material/Category";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import { Link } from "react-router-dom";
import "./E_Top.css";
import { LogoutAction, resetUser } from "../../../action/UserAction";
import { useAlert } from "react-alert";
import { getAllCategoryVideoAction } from "../../../action/CategoryAction";
function Dashboard_Icon({ setLoginCreate,setNotification }) {
  const alert = useAlert();
  const [showCategory, setShowCategory] = useState(false);
  const dispatch = useDispatch();
  const {
    error: userError,
    isLogout,
    userInfo,
  } = useSelector((state) => state.registerStore);
  const [dashbord, setDashboard] = useState(false);
  const { categories, error } = useSelector((state) => state.categoryStore);
  const LogoutHandler = () => {
    dispatch(LogoutAction());
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (userError) {
      alert.error(userError);
    }
    if (isLogout) {
      alert.success("logout successfully");
    }
    dispatch(resetUser());
  }, [alert, error, isLogout, userError]);

  useEffect(() => {
    dispatch(getAllCategoryVideoAction());
  }, [dispatch]);

  return (
    <>

      <div className="category__section">
        <div className="max__category">
          {categories.map((item) => (
            <div>
              <div>
                <span className="categroy__text">{item.categoryName}</span>
              </div>
              <div className="category__text__box__background"></div>
              <div className="category__text__box">
                {item.parentId?.map((i) => (
                  <div>
                    <Link
                      to={`/category/${item.categoryName}/${i.categoryName}/${i._id}`}
                    >
                      <span>{i.categoryName}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="min__category">
          <div
            onClick={() => setShowCategory((pre) => !pre)}
            className="category__icon__section"
          >
            <CategoryIcon className="category__icon" />
          </div>
          <div
            className={
              showCategory
                ? "min__category__sidebar"
                : "min__category__sidebar__2"
            }
          >
            <div>
              {categories.map((item) => (
                <>
                  <div className="category__base__item">
                    <div>
                      <span>{item.categoryName}</span>
                    </div>
                  </div>
                  {item.parentId?.map((i) => (
                    <div className="category__parrent__item">
                      <div>
                        <Link
                          to={`/category/${item.categoryName}/${i.categoryName}/${i._id}`}
                        >
                          <span>{i.categoryName}</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="contact__section">
        <Link to="/contact">
          <button>
            <ContactPhoneIcon className="contact__icon" />
            Contact
          </button>
        </Link>
      </div>
      <div className="nortification__section">
        <div className="notification__icon__sction">
          <div onClick={()=>setNotification((pre)=>!pre)} className="notification__bar">
             <NotificationsNoneIcon className=" entry__notification" />
             <p><span>13</span></p>
          </div>
           <div className="profile__icon__section">
           <SupervisorAccountIcon
            onClick={() => setDashboard((pre) => !pre)}
            className=" entry__profile__icon"
          />
           </div>
        </div>
        {userInfo?.user?.role === "superuser" ? (
          <div>
            {dashbord && (
              <div className="user__dashboard__icon__secton">
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
              <div className="user__dashboard__icon__secton">
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
    </>
  );
}

export default Dashboard_Icon;
