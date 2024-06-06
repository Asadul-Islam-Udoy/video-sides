import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import {useDispatch, useSelector} from 'react-redux'

import {useAlert} from 'react-alert';
import './Single_Videos.css'
import Single_Create from '../create/Single_Create';
import { getsingleVideoOfUser } from '../../../action/VideosAction';
import SingleVideoUpdate from '../update/SingleVideoUpdate';
import SingleVideoDelete from '../delete/SingleVideoDelete';
import { API_URLS } from '../../url/Api_Urls';
function Single_Videos() {
    const alert = useAlert()
    const[create,setCreate] = useState(false);
    const[deletes,setDeletes] = useState(false);
    const[update,setUpdate] = useState(false);
    const[videoId,setVideoId] = useState()
    const[videoName,setVideoName] = useState('')
    const {lodding,error,videosFile} = useSelector(state=>state.userVideoFileStore);

    const dispatch = useDispatch()

    useEffect(()=>{
       dispatch(getsingleVideoOfUser())
    },[])

    const upateHandler=(id,title)=>{
        setVideoId(id)
        setVideoName(title)
        setUpdate((pre)=>!pre)
    }
    const delteHandler=(id,title)=>{
      setVideoId(id)
      setVideoName(title)
      setDeletes((pre)=>!pre)
    }
  return (
   <>
    {create && <Single_Create/>}
    {update && <SingleVideoUpdate videosFile={videosFile} videoName={videoName} videoId={videoId}/>}
     {deletes && <SingleVideoDelete videoId={videoId} videoName={videoName}/>}
     <div className='user__profile__videos__container'>
         <div style={{padding:'5px',marginTop:'80px'}} className='user__profile__videos__box'>
         <div className='user__profile__add__button'><button onClick={()=>setCreate((pre)=>!pre)}>Add</button></div>
        <Table className='video__table__container' striped bordered hover>
        <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Description</th>
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
          <td>{item._id.substring(0,10)}..</td>
          <td>{item.title}</td>
          <td>{item.description}</td>
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
               <div onClick={()=>upateHandler(item._id,item.title)} title='edit'><EditIcon className='edit__icon'/></div>
               <div onClick={()=>delteHandler(item._id,item.title)} title='delete'><DeleteSweepIcon className='delete__icon'/></div>
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

export default Single_Videos