import React from 'react'
import './NotificationBox.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import { Link } from 'react-router-dom';
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
function NotificationBox() {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);
  return (
    <>
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
            New Notification
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
           <div className='nortification__box__container'>
             <div>
               <img src='https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg'/>
             </div>
             <div>
                <span>Md asadul islam </span>
                <Link>create new posters </Link>
             </div>
           </div>
           <div className='nortification__box__container'>
             <div>
               <img src='https://t3.ftcdn.net/jpg/05/90/59/88/360_F_590598870_TOcGd4cUZzPoEMlxSc7XYwcupHOE0vLM.jpg'/>
             </div>
             <div>
                <span>Md emon islam </span>
                <Link>create new posters </Link>
             </div>
           </div>
           <div className='nortification__box__container'>
             <div>
               <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-WZ3csovFVNqi3svLa9TAe7Q-TWzNheYrXvZ1tjrnHyeWzz5sGA_NYNmU9a8JCl1TGP8&usqp=CAU'/>
             </div>
             <div>
                <span>Md arif mia </span>
                <Link>create new posters </Link>
             </div>
           </div>
          </Typography>
        </Box>
      </Fade>
    </Modal>
  </div>
    </>
  )
}

export default NotificationBox