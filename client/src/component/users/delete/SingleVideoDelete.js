import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  deleteSingleOfVideoUser,
  isUserVideoReset,
} from "../../../action/VideosAction";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function SingleVideoDelete({ videoId, videoName }) {
  const alert = useAlert();
  const btn = useRef();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const { lodding, error, isDeleteVideo } = useSelector(
    (state) => state.userVideoFileStore
  );

  const deleteHandler = (videoId) => {
    btn.current.disabled = true;
    dispatch(deleteSingleOfVideoUser(videoId));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      btn.current.disabled = false;
    }
    if (isDeleteVideo) {
      alert.success("user delete successfully");
      isUserVideoReset();
      btn.current.disabled = false;
      setOpen(false);
    }
  }, [alert, error, isDeleteVideo]);
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
          <Box sx={style}>
            <Typography
              style={{ textAlign: "center" }}
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              Delete Video
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <p>Are you sure! you want delete this video?</p>
              <p>{videoName}</p>
            </Typography>
            <div className="delete__video__section">
              <button
                style={{ 
                  backgroundColor: "red", 
                  margin: "10px" ,
                  padding:'3px 20px',
                  color:'white',
                  border:'none',
                  fontStyle:'italic',
                  fontSize:'10px',
                  fontWeight:'bold'
                }}
                onClick={() => setOpen(false)}
              >
                No
              </button>
              <button ref={btn}
                style={{ 
                  backgroundColor: "green", 
                  margin: "10px" ,
                  padding:'3px 20px',
                  color:'white',
                  border:'none',
                  fontStyle:'italic',
                  fontSize:'10px',
                  fontWeight:'bold'
                }}
              onClick={() => deleteHandler(videoId)}>
                Yes
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default SingleVideoDelete;
