import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useDispatch, useSelector } from 'react-redux';
import { userPaymentVideoAction } from '../../../action/PaymentVideosAction';
import { API_URLS } from '../../url/Api_Urls';
import { format } from "timeago.js";
function Profict_Body() {
  const dispatch = useDispatch();
  const{userInfo} = useSelector(state=>state.registerStore);
  const{lodding,paymentVideoShow} = useSelector(state=>state.mePaymentVideoShowStore);
  useEffect(()=>{ 
   dispatch(userPaymentVideoAction())
  },[]);

  const deleteHandler=()=>{
    
  }

  const tatalPriceHandler=(listItems)=>{
    let sum = 0;
    listItems.forEach(element => {
      sum += element.videoCost  
    });
    return sum
  }
  return (
    <>
     <div className='profict__container'>
       <div className='profict__box'>
       <Table className='video__table__container' striped bordered hover>
        <thead>
        <tr>
          <th>Id</th>
          <th>Address</th>
          <th>Videos</th>
          <th>User Name</th>
          <th>Cost</th>
          <th>Payment Date</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {paymentVideoShow?.map((item,index)=>(
          <tr key={index}>
          <td>{item._id.substring(0,10)}..</td>
          <td>{item.addressInfos[0].city},{item.addressInfos[0].address},{item.addressInfos[0].country},{item.addressInfos[0].state}</td>
          <td>
             <video style={{width:'100px',height:'70px'}} controls>
               <source src={API_URLS+`/images/videos/${item.video}`} type="video/mp4"/>
             </video>
          </td>
          <td>{item.username}</td>
          <td>${item.videoCost}</td>
          <td>{format(item.createdAt)}</td>
          <td>{item.addressInfos[0].phone}</td>
          <td>
            <div className='icon__section'>
               <div onClick={()=>deleteHandler(item._id,item.video)} title='delete'><DeleteSweepIcon className='delete__icon'/></div>
             </div>
          </td>
        </tr>
           ))}
           <tr>
            <td style={{color:'green',fontWeight:'bold'}} colSpan="4">Total Amount</td>
            <td style={{color:'red',fontWeight:'bold'}} colSpan="5">${tatalPriceHandler(paymentVideoShow)}</td>
           </tr>
      </tbody>
    </Table>
       </div>
     </div>
     <div className='profit__bar__plot'>

     </div>
    </>
  )
}

export default Profict_Body