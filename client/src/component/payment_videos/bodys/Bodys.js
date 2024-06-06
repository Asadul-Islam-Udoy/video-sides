import React, { useEffect } from "react";
import "./Bodys.css";
import ReactPlayer from "react-player";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../../../../client/src/footer/Footer";
import { API_URLS } from "../../url/Api_Urls";
import { useAlert } from "react-alert";
import { useState } from "react";
function Bodys({ videos, paginationbar, setPaginationbar }) {
  const [checkUrl,setCheckUrl] = useState(false);
  const { userInfo } = useSelector((state) => state.registerStore);
  const navigate = useNavigate();
  const alert  = useAlert();
  const videoslist = [];
  videos?.payment_videos?.forEach((element) => {
    if (element.groupVideos.length === 0) {
      videoslist.push(element);
    } else {
      if (videoslist.length === 0) {
        videoslist.push(element);
      } else {
        if (videoslist.length > 0) {
          const a = videoslist.find(
            (i) =>
              (i.groupVideos.length > 0 && i.groupVideos[0].group_id) ==
              element.groupVideos[0].group_id
          );
          if (!a) {
            videoslist.push(element);
          }
        }
      }
    }
  });

  /// single page
  const showHandler = (id, group_id, video_cost,createUser,video) => {
    try {
      if (userInfo === null) {
        alert.error("please login");
        navigate("/login");
      } else {
        if (userInfo.user) {
          const config = {
            headers: {
              "Content-Type": "application/json",},
          };
          fetch(`/api/videos/payment/video/check/${id}`, config)
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              if (data.success == true) {
                setCheckUrl(true)
                navigate(`/videos/signal/payment/${id}/${group_id}`);
              } else {
                navigate(`/payment/address/${id}/${video_cost}/${createUser}/${video}`);
              }
            });
        } else {
          navigate("/user/register");
        }
      }
    } catch (error) {
      alert.error("somthing is wrong!", error);
    }
  };

  function showFunction(items) {
    if(items.length>0){
       const item = items.find((i)=>i.user === userInfo?.user._id);
       if (item) {
        return true;
      }
    } 
    
  }
  return (
    <>
      <div className="bodys__container">
        <div className="bodys__box">
          {videoslist?.map((item, index) => (
            <Link
              key={index}
              to={checkUrl && `/videos/signal/payment/${item._id}/${item?.groupVideos[0]?.group_id}`}
            >
              <div className="payment__videos__bar">
                <div
                  className={
                    showFunction(item.getPaymentUser) === true
                      ? "video__cost__section__green"
                      : "video__cost__section"
                  }
                >
                  <span>
                    {showFunction(item.getPaymentUser) === true ? (
                      <DoneAllIcon />
                    ) : (
                      `$ ${item.videoCost}`
                    )}
                  </span>
                </div>
                <div id="a">
                  <div
                    onClick={() =>
                      showHandler(
                        item._id,
                        item?.groupVideos[0]?.group_id,
                        item.videoCost,
                        item.user,
                        item.video
                      )
                    }
                    className="videos__section"
                  >
                    <ReactPlayer
                      className="videos"
                      url={API_URLS + `/images/videos/${item?.video}`}
                    />
                  </div>
                  <div id="name__imag__section">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZqLANsFR4Alju2PU32t0VJ6SwMdYg9GVoxyw_CKYXEQ&s"
                      alt="imagesfile"
                    />
                    <p>{item.title.substring(0, 40)}...</p>
                  </div>
                  <b>
                    <AccessTimeIcon className="time__icon" />
                    {format(item.createdAt)}
                  </b>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        {videoslist?.length > 0 && (
          <Pagination
            paginationbar={paginationbar}
            setPaginationbar={setPaginationbar}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default Bodys;
