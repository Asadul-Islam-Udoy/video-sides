import React from "react";
import "./Bodys.css";
import ReactPlayer from "react-player";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import { format } from "timeago.js";
import Footer from "../../../../../client/src/footer/Footer";
import { API_URLS } from "../../url/Api_Urls";
function Bodys({ videos, paginationbar, setPaginationbar }) {
  const videoslist = [];
  videos?.free_videos?.forEach((element) => {
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

  return (
    <>
      <div className="bodys__container">
        <div className="bodys__box">
          {videoslist?.map((item, index) => (
            <Link
              key={index}
              to={`/videos/signal/free/${item._id}/${item?.groupVideos[0]?.group_id}`}
            >
              <div>
                <div id="a">
                  <div className="videos__section">
                    <ReactPlayer
                      className="videos"
                      url={API_URLS+`/images/videos/${item?.video}`}
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
