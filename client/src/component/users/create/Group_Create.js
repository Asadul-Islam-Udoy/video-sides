import React, { useEffect } from 'react'
import './Group_Create.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import { useState } from 'react';
import  { useDispatch,useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import { createVideoGroupName } from '../../../action/VideosAction';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function Group_Create() {
    const alert  = useAlert()
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);
    const[name,setName] = useState('');
    const[profession,setProfession] = useState('');
    const{error,lodding,groupsFile,isGroups} = useSelector(state=>state.groupsFileStore)
    const dispatch = useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault();
        const myFrom = new FormData();
         myFrom.set('groupname',name);
         myFrom.set('profession',profession)
        dispatch(createVideoGroupName(myFrom))
    }
    useEffect(()=>{
      if(error){
        alert.error(error)
      }
    },[error,alert,isGroups])
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
          <Typography style={{textAlign:'center'}} id="transition-modal-title" variant="h6" component="h2">
            Create Group
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
           <div className='create__container'>
              <form className='create__form' onSubmit={submitHandler}>
                  <div>
                      <label>Group Name</label>
                      <input type='text' onChange={(e)=>setName(e.target.value)} placeholder='enter the title...'/>
                  </div>
                  <div>
                      <label>Profession</label>
                     <input onChange={(e)=>setProfession(e.target.value)} placeholder='enter the profession...'/>
                  </div>
                  <button className='add__button' type='submit'>Add Group</button>
              </form>
           </div>
          </Typography>
        </Box>
      </Fade>
    </Modal>
  </div>
  )
}

export default Group_Create