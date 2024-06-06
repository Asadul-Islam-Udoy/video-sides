import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  createGroupVideo,
  getVideoGroupName,
  isGroupsReset,
  isUserVideoReset,
} from "../../../action/VideosAction";
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
function Group_Video_Create() {
  const alert = useAlert();
  const [btn, setBtn] = useState(false);
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoCost, setVideoCost] = useState(0);
  const [groupName, setGroupName] = useState("");
  const [group_id, setGroupId] = useState();
  const [video, setVideo] = useState("");
  const [base, setBase] = useState("");
  const [chield, setChield] = useState("");
  const { categories } = useSelector((state) => state.categoryStore);
  const { groupsFile } = useSelector((state) => state.groupsFileStore);
  const { error, lodding, isVideoGroup } = useSelector(
    (state) => state.userVideoFileStore
  );
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    setBtn(true);
    const myFrom = new FormData();
    myFrom.set("title", title);
    myFrom.set("description", description);
    myFrom.append("video", video);
    myFrom.set("groupname", groupName);
    myFrom.set("videoCost", videoCost);
    myFrom.set("group_id", group_id);
    myFrom.set("categoryId", chield);
    dispatch(createGroupVideo(myFrom));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      setBtn(false);
      dispatch(isUserVideoReset());
    }
    if (isVideoGroup) {
      alert.success("crate successfully");
      setBtn(false);
      dispatch(isUserVideoReset());
      setOpen(false);
    }
    dispatch(getVideoGroupName());
  }, [dispatch, error, alert, isVideoGroup]);

  const handlerSide = (name, id) => {
    setGroupId(id);
    setGroupName(name);
  };

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
              Create Group Video
            </Typography>
            <div id="transition-modal-description" sx={{ mt: 2 }}>
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
                        <label>Description</label>
                        <textarea
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div>
                        <label>Video Cost</label>
                        <input
                          name="video_cost"
                          type="number"
                          onChange={(e) => setVideoCost(e.target.value)}
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
                    </div>

                    <div className="gap__div">
                      <div>
                        <label>Select Group</label>
                        <select onChange={(e) => setGroupId(e.target.value)}>
                          <option>select groups</option>
                          {groupsFile?.map((item, index) => (
                            <option
                              onClick={() =>
                                handlerSide(item.groupname, item._id)
                              }
                              key={index}
                              value={item._id}
                            >
                              {item.groupname}
                            </option>
                          ))}
                        </select>
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

                      <div className="button__section">
                        <button
                          disabled={btn}
                          className="add__button"
                          type="submit"
                        >
                          Add Video
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default Group_Video_Create;
