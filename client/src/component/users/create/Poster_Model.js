import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import './Poster_Model.css';
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  createPosterAction,
  deletePosterAction,
  getPosterAction,
  posterReset,
} from "../../../action/VideosAction";
import { useNavigate } from "react-router-dom";
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
function Poster_Model() {
  const alert = useAlert();
  const navigate = useNavigate();
  const bttRef = useRef(false);
  const dispatch = useDispatch();
  // const { error, singlePoster, isPoster, isDeletePoster } = useSelector(
  //   (state) => state.singlePostertore
  // );
  const { userInfo } = useSelector((state) => state.registerStore);
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posterImage, setPosterImage] = useState([]);
  const submitHandler = (e) => {
    e.preventDefault();
    bttRef.current.disabled = true;
    const myFrom = new FormData();
    myFrom.set("title", title);
    myFrom.set("description", description);
    if (posterImage.length > 0) {
      for (let file of posterImage) {
        myFrom.append("images", file);
      }
    }
    dispatch(createPosterAction(myFrom));
    bttRef.current.disabled = false;
  };
  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //     bttRef.current.disabled = false;
  //   }
  //   if (isPoster) {
  //     alert.success("poster create successfully");
  //     bttRef.current.disabled = false;
  //     setOpen(false);
  //   }
  //   if (isDeletePoster) {
  //     alert.success("poster delete successfully!");
  //     setOpen(false);
  //   }
  //   if (open === false) {
  //     navigate(`/user/profile/${userInfo?.user._id}`);
  //   }
  //   dispatch(posterReset());
  //   dispatch(getPosterAction());
  // }, [alert, error, isPoster, isDeletePoster, open]);

  const posterHandler = (posterId) => {
    dispatch(deletePosterAction(posterId));
  };
  return (
    <>
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
        id="poster__model"
      >
        <Fade in={open}>
          <Box sx={style}>
            {/* {singlePoster?.length > 0 && ( */}
              <div
                // onClick={() => posterHandler(singlePoster[0]?.id)}
                id="poster__box"
              >
                <button
                  style={{
                    padding: "3px 20px",
                    backgroundColor: "red",
                    borderRadius: "2px",
                    color: "white",
                    border: "none",
                    fontSize: "10px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginLeft:"50%"
                  }}
                >
                  DELETE POSTER
                </button>
              </div>
            {/* )} */}
            <Typography
              style={{ textAlign: "center" }}
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              Create Video Poster
            </Typography>
            <div id="transition-modal-description" sx={{ mt: 2 }}>
              <div className="create__container">
                <form className="create__form" onSubmit={submitHandler}>
                  <div>
                    <label>Title</label>
                    <input
                      value={title}
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="enter the title..."
                    />
                  </div>
                  <div>
                    <label>Poster Image</label>
                    <input
                      name="images"
                      type="file"
                      onChange={(e) => setPosterImage(e.target.files)}
                      enctype="multipart/form-data"
                      multiple
                    />
                  </div>
                  <div>
                    <label>Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <button ref={bttRef} className="add__button" type="submit">
                    Add Poster
                  </button>
                </form>
              </div>
            </div>
            <div
              className="show__poster__image__section"
              style={{ width: "100%" }}
            >
              {/* <div
                style={{ overflow: "scroll", width: "100%", display: "flex" }}
              >
                {singlePoster[0]?.poster_file.map((img) => (
                  <img
                    style={{
                      height: "90px",
                      width: "70px",
                      objectFit: "cover",
                      margin: "5px",
                    }}
                    src={`http://127.0.0.1:8000/posters/${img.poster_image}`}
                  />
                ))}
              </div> */}
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default Poster_Model;
