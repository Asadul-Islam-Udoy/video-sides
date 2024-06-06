import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import "./GroupVideo.css";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Table from "react-bootstrap/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useDispatch, useSelector } from "react-redux";
import { getgroupsVideoOfUserUnique } from "../../../action/VideosAction";
import { API_URLS } from "../../url/Api_Urls";
import SingleVideoDelete from "../delete/SingleVideoDelete";
import { useState } from "react";
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
function GroupVideoSModels({ groupId }) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const[deletes,setDeletes] = useState(false);
  // const[update,setUpdate] = useState(false);
  const[videoId,setVideoId] = useState()
  const[videoName,setVideoName] = useState('')
  const dispatch = useDispatch();
  const { lodding, error, videoFileGroup } = useSelector(
    (state) => state.userVideoFileStore
  );
  useEffect(() => {
    dispatch(getgroupsVideoOfUserUnique(groupId));
  }, [groupId]);
  const upateHandler = (id, title) => {
    // setVideoId(id)
    // setVideoName(title)
    // setUpdate((pre)=>!pre)
  };
  const delteHandler = (id, title) => {
    setVideoId(id)
    setVideoName(title)
    setDeletes((pre)=>!pre)
  };
  return (
    <>
     {deletes && <SingleVideoDelete videoId={videoId} videoName={videoName}/>}
      <div style={{backgroundColor:'gray'}} className="groups__sections">
        <div>
          <Table className="groups__table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Group Name</th>
                <th>Videos</th>
                <th>Likes</th>
                <th>Views</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {videoFileGroup?.map((item, index) => (
                <tr key={index}>
                  <td>{item._id.substring(0,7)}..</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.groupVideos[0].groupname}</td>
                  <td>
                    <video style={{ width: "100px", height: "70px" }} controls>
                      <source
                        src={API_URLS+`/images/videos/${item.video}`}
                        type="video/mp4"
                      />
                    </video>
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <div className="icon__section">
                      <div
                        onClick={() => upateHandler(item._id, item.title)}
                        title="edit"
                      >
                        <EditIcon className="edit__icon" />
                      </div>
                      <div
                        onClick={() => delteHandler(item._id, item.title)}
                        title="delete"
                      >
                        <DeleteSweepIcon className="delete__icon" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default GroupVideoSModels;

{
  /* <div className='user__groups__videos__container'>
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
    <Box sx={style} className='group__box'>
      <Typography style={{textAlign:'center'}} id="transition-modal-title" variant="h6" component="h2">
        Get Group Videos
      </Typography>
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
<div className='user__groups__videos__box'>
<Table className='video__groups__table__container' striped bordered hover>
<thead>
<tr>
<th>Id</th>
<th>Title</th>
<th>Description</th>
<th>Group Name</th>
<th>Videos</th>
<th>Likes</th>
<th>Views</th>
<th>Action</th>
</tr>
</thead>
</Table>
</div>
</Typography>
</Box>
  </Fade>
</Modal>
</div> */
}
