import React, { useEffect, useState } from "react";
import "./SignalVideo.css";
import ReactPlayer from "react-player";
import { format } from "timeago.js";
import { Link, useParams } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GetAppIcon from "@mui/icons-material/GetApp";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LyricsIcon from "@mui/icons-material/Lyrics";
import ShareIcon from "@mui/icons-material/Share";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
import {
  getAllFreeVideosAction,
  getFreeSingleVideoAction,
  getSingleFreeGroupVideo,
  videoCommendCreateAction,
  videoCommendGetAction,
  videoLikeAction,
} from "../../../action/VideosAction";
import ReplayCommend from "./ReplayCommend";
import Lodder from "../../../lodders/Lodder";
import { API_URLS } from "../../url/Api_Urls";
function SignalVideo() {
  const [commentShow, setCommentShow] = useState(false);
  const alert = useAlert();
  const { id } = useParams();
  const { group } = useParams();
  const dispatch = useDispatch();
  const [commend, setCommend] = useState("");
  const [replay1, setReplay1] = useState(false);
  const {
    lodding: commendLodder,
    singleFile,
    isCommend,
    videoCommends,
  } = useSelector((state) => state.singleVideoStore);
  const { error, lodding, groupVideo } = useSelector(
    (state) => state.videoStore
  );
  const [totalLike, setTotalLike] = useState(0);
  const { userInfo } = useSelector((state) => state.registerStore);
  const [like, setLike] = useState(0);
  const [showLike, setShowLike] = useState(
    singleFile?.likes?.includes(userInfo?.user?._id)
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getAllFreeVideosAction());
    dispatch(getSingleFreeGroupVideo(group));
  }, [alert, error, group]);

  const likeHandlers = (videoId) => {
    if (like === 0) {
      setLike(like + 1);
      setTotalLike(totalLike + 1);
      dispatch(videoLikeAction(videoId));
    } else {
      setLike(like - 1);
      dispatch(videoLikeAction(videoId));
      setTotalLike(totalLike - 1);
    }
  };

  useEffect(() => {
    dispatch(getFreeSingleVideoAction(id));
    setTotalLike(singleFile?.likes?.length);
    setShowLike(singleFile?.likes?.includes(userInfo?.user?._id));
  }, [
    id,
    singleFile?.likes?.length,
    singleFile?.likes?.includes(userInfo?.user?._id),
  ]);

  ///commend method
  const commendHandler = (videoId, commend) => {
    dispatch(videoCommendCreateAction(videoId, commend));
  };
  useEffect(() => {
    if (isCommend) {
      alert.success("comment create successfully!");
      setCommend('')
    }
  }, [isCommend]);

  const commentShowMethod = (id) => {
    dispatch(videoCommendGetAction(id));
    setCommentShow((pre) => !pre);
  };
  return (
    <>
      {lodding && <Lodder />}
      {commendLodder && <Lodder />}
      <div className="signal__container">
        <div className="left__box">
          <div>
            <div className="video__reacts" controls>
              <ReactPlayer
                width={"100%"}
                height="100%"
                className="video__react"
                url={API_URLS + `/images/videos/${singleFile?.video}`}
                type="video/mp4"
                muted={true}
                controls={true}
              />
            </div>
            <div className="name__img__section">
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZqLANsFR4Alju2PU32t0VJ6SwMdYg9GVoxyw_CKYXEQ&s"
                  alt="imagesfile"
                />
                <p>{singleFile?.title}</p>
              </div>
              <div>
                <p
                  onClick={() => likeHandlers(singleFile?._id)}
                  className={
                    showLike || like
                      ? "likes__section"
                      : "communicaton__section"
                  }
                >
                  <ThumbUpIcon
                    className={
                      like === 0 ? "communicaton__icon" : "like__animation"
                    }
                  />
                  like
                </p>
                <p
                  onClick={() => commentShowMethod(id)}
                  className="communicaton__section"
                >
                  <LyricsIcon className="communicaton__icon" />
                  coment
                </p>
                <p className="communicaton__section">
                  <ShareIcon className="communicaton__icon" />
                  share
                </p>
              </div>
            </div>
            {commentShow ? (
              <div className="comment_section">
                <input
                  value={commend}
                  onChange={(e) => setCommend(e.target.value)}
                  placeholder="comment..."
                />
                <div
                  onClick={() => commendHandler(singleFile?._id, commend)}
                  className="comment__icon"
                >
                  <GetAppIcon />
                </div>
              </div>
            ) : (
              <div>
                <span className="time_text social__bar">
                  <AccessTimeIcon className="time__icon" />
                  {format(singleFile?.created_at)}
                </span>
                <span className="time_text social__bar">
                  <ThumbUpIcon className="like__icon" />
                  {totalLike} {totalLike > 1 ? "likes" : "like"}
                </span>
                <span className="time_text social__bar">1.4k views</span>
              </div>
            )}
          </div>
        </div>
        <div className="right__box">
          <div className="group__videos">
            <p>Group Videos</p>
          </div>
          <div className="all__group">
            {groupVideo?.length > 0 ? (
              <div className="group__videos__section">
                {groupVideo?.map((item, index) => (
                  <div className="groups__free__single">
                    <Link
                      to={`/videos/signal/${item._id}/${item.groupVideos[0]?.group_id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="group_video">
                        <ReactPlayer
                          className="react__video_groups"
                          key={index}
                          url={API_URLS + `/images/videos/${item?.video}`}
                          type="video/mp4"
                          playing={true}
                          muted={true}
                        />
                        <p>{item.title}</p>
                        <span>{format(item.created_at)}</span>

                        <span>2 k view</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no__groups__videis">
                <h3>no groups videos</h3>
              </div>
            )}
          </div>
        </div>
      </div>
      {!commentShow ? (
        <div className="description">
          <b style={{ textAlign: "center" }}>Description</b>
          <p>{singleFile?.description}</p>
        </div>
      ) : (
        <div className="commend__show__section">
          <b style={{ textAlign: "center" }}>Commend Section</b>
          {videoCommends?.map((i) => (
            <p className="commend__sections__p">
              {i.commend}
              
              <span
                onClick={() => setReplay1((pre) => !pre)}
                className="replay__section"
              >
                <ReplayCircleFilledIcon className="replay__icon1" />
              </span>
              {replay1 && <ReplayCommend />}
            </p>
          ))}
        </div>
      )}
    </>
  );
}

export default SignalVideo;
