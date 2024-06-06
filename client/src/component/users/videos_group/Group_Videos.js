import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import './GroupVideo.css';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useAlert} from 'react-alert';
import Groups2Icon from '@mui/icons-material/Groups2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Group_Create from '../create/Group_Create';
import Group_Video_Create from '../create/Group_Video_Create';
import { getgroupsVideoOfUser } from '../../../action/VideosAction';
import GroupVideoSModels from './GroupVideoSModels';
import { API_URLS } from '../../url/Api_Urls';
import Lodder from '../../../lodders/Lodder';
function Group_Videos() {
    const alert = useAlert()
    const[create,setCreate] = useState(false);
    const[getGroups,setGetGroups] = useState(false);
    const[createGroup,setCreateGroup]  = useState(false);
    const[deletes,setDeletes] = useState(false);
    const[update,setUpdate] = useState(false);
    const[videoId,setVideoId] = useState('')
    const[videoName,setVideoName] = useState('')
    const {lodding,error,videosFile} = useSelector(state=>state.userVideoFileStore);
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getgroupsVideoOfUser())
    },[]);

  const groupsHandler=(group_id)=>{
   setGetGroups((pre)=>!pre);
   setVideoId(group_id)
  }

  return (
    <>
    {createGroup &&  <div><Group_Create setCreateGroup={setCreateGroup}/></div>}
    {create &&  <div><Group_Video_Create setCreate={setCreate}/></div>}
    {getGroups && <div><GroupVideoSModels groupId={videoId}/></div>}
    {lodding && <Lodder/>}
    <div className='user__groups__videos__container'>
        <div style={{padding:'5px',marginTop:'80px'}}className='user__groups__videos__box'>
            <div className='user__groups__add__button'>
                 <button onClick={()=>setCreateGroup((pre)=>!pre)}>Groups</button>
                 <button onClick={()=>setCreate((pre)=>!pre)}>Add</button>
            </div>
       <Table className='video__groups__table__container' striped bordered hover>
       <thead>
       <tr>
         <th>Id</th>
         <th>Title</th>
         <th>Description</th>
         <th>Group Name</th>
         <th>Videos</th>
         <th>Cost</th>
         <th>Likes</th>
         <th>Views</th>
         <th>Action</th>
       </tr>
     </thead>
     <tbody>
      {videosFile?.map((item,index)=>(
         <tr key={index}>
         <td>{item._id.substring(0,7)}..</td>
         <td>{item.title}</td>
         <td>{item.description}</td>
         <td>{item?.groupVideos[0]?.groupname}</td>
         <td>
            <video style={{width:'100px',height:'70px'}} controls>
            <source src={API_URLS+`/images/videos/${item.video}`} type="video/mp4"/>
            </video>
         </td>
         <td>{item.videoCost}</td>
         <td></td>
         <td></td>
         <td>
           <div className='icon__section'>
           <div className='groups__section' style={{zIndex:'999'}} onClick={()=>groupsHandler(item.groupVideos[0].group_id)} title='groups videos'><Groups2Icon className='groups__icon'/></div>
            </div>
         </td>
       </tr>
))}
     </tbody>
   </Table>
        </div>
    </div>
  </>
  )
}

export default Group_Videos