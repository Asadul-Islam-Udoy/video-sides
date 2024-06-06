import React, { useEffect, useRef } from "react";
import "./SingleVideoUpdate.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  isUserVideoReset,
  upateSingleOfVideoUser,
} from "../../../action/VideosAction";
import { getAllCategoryVideoAction } from "../../../action/CategoryAction";
import { API_URLS } from "../../url/Api_Urls";
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
function SingleVideoUpdate({ videosFile, videoName, videoId }) {
  const btnnn = useRef(false);
  const alert = useAlert();
  const { categories } = useSelector((state) => state.categoryStore);
  const { lodding, error, isUpdateVideo } = useSelector(
    (state) => state.userVideoFileStore
  );
  const singlefilter = videosFile?.find((i) => i._id === videoId);
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState(singlefilter?.title);
  const [videoCost, setVideoCost] = useState(singlefilter?.videoCost || 0);
  const [description, setDescription] = useState(singlefilter?.description);
  const [video, setVideo] = useState(singlefilter?.video);
  const [base, setBase] = useState("");
  const [chield, setChield] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    btnnn.current.disabled = true || false;
    const myFrom = new FormData();
    myFrom.set("title", title);
    myFrom.set("description", description);
    myFrom.set("videoCost", videoCost);
    myFrom.append("video", video);
    myFrom.set("categoryId",chield);
    dispatch(upateSingleOfVideoUser(videoId,myFrom));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      btnnn.current.disabled = false;
    }
    if (isUpdateVideo) {
      alert.success("video update successfully!");
      dispatch(isUserVideoReset());
      setOpen(false);
      btnnn.current.disabled = false;
    }
  }, [alert, error, isUpdateVideo]);

  useEffect(()=>{
    dispatch(getAllCategoryVideoAction())
  },[dispatch]);

  const chield_find = categories?.find((i) => i.id === base);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="box__section__model">
            <Typography
              style={{ textAlign: "center" }}
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              Update Video
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <div className="single__update__container">
                <form className="single__update__form" onSubmit={submitHandler}>
                  <div>
                    <div className="gap__div">
                      <div>
                        <label>Title</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="enter the title..."
                        />
                      </div>
                      <div>
                        <label>Video</label>
                        <input
                          name="video"
                          type="file"
                          onChange={(e) => setVideo(e.target.files[0])}
                          enctype="multipart/form-data"
                        />
                      </div>
                      {singlefilter?.videoCost != null && (
                        <div>
                          <label>Video Cost</label>
                          <input
                            value={videoCost}
                            name="video_cost"
                            type="number"
                            onChange={(e) => setVideoCost(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                    <div className="gap__div">
                      <div>
                        <label>Description</label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div>
                        <label>Select Category Parrent</label>
                        <select required onChange={(e) => setBase(e.target.value)}>
                          <option>select Category</option>
                          {categories?.map((i) => (
                            <option value={i._id}>{i.categoryName}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label>Select Category Chield</label>
                        <select required onChange={(e) => setChield(e.target.value)}>
                          <option>select Category</option>
                          {chield_find?.parentId?.map((i) => (
                            <option value={i._id}>
                              {i.categoryName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="video__show__div">
                    <video style={{ width: "100px", height: "60px" }} controls>
                      <source
                        src={API_URLS+`/images/videos/${video}`}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                  <div>
                    <button ref={btnnn} className="add__button" type="submit">
                      Update Video
                    </button>
                  </div>
                </form>
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default SingleVideoUpdate;
