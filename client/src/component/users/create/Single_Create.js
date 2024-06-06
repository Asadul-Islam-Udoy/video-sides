import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { createVideo, isUserVideoReset } from "../../../action/VideosAction";
import { getAllCategoryVideoAction } from "../../../action/CategoryAction";
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
function Single_Create() {
  const [btn, setBtn] = useState(false);
  const alert = useAlert(false);
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoCost, setVideoCost] = useState(0);
  const [base, setBase] = useState("");
  const [chield, setChield] = useState("");
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryStore);
  const { lodding, error, isCreateVideo } = useSelector(
    (state) => state.userVideoFileStore
  );
  const { userInfo } = useSelector((state) => state.registerStore);
  const submitHandler = (e) => {
    e.preventDefault();
    setBtn(true);
    const myFrom = new FormData();
    myFrom.set("title", title);
    myFrom.set("description", description);
    myFrom.append("video", video);
    myFrom.set("videoCost", videoCost);
    dispatch(createVideo(chield, myFrom));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      setBtn(false);
    }
    if (isCreateVideo) {
      alert.success("video create successfully!");
      dispatch(isUserVideoReset());
      setOpen(false);
      setBtn(false);
    }
  }, [alert, error, isCreateVideo]);

  useEffect(() => {
    dispatch(getAllCategoryVideoAction());
  }, [dispatch]);

  const chield_find = categories?.find((i) => i._id === base);

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
              Create Video
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
                      <div>
                        <label>Description</label>
                        <textarea
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                    </div>

                    <div className="gap__div">
                      <div>
                        <label>Video Cost</label>
                        <input
                          type="number"
                          onChange={(e) => setVideoCost(e.target.value)}
                        />
                      </div>
                      <div>
                        <label>Select Category Parrent</label>
                        <select onChange={(e) => setBase(e.target.value)}>
                          <option>select Category</option>
                          {categories?.map((i) => (
                            <option value={i._id}>{i.categoryName}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label>Select Category Chield</label>
                        <select onChange={(e) => setChield(e.target.value)}>
                          <option>select Category</option>
                          {chield_find?.parentId?.map((i) => (
                            <option value={i._id}>{i.categoryName}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <button disabled={btn} className="add__button" type="submit">
                    Add Video
                  </button>
                </form>
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default Single_Create;
