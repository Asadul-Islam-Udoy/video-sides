import React, { useEffect, useState } from 'react'
import './Pagination.css'
import {useSelector} from 'react-redux';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
function Pagination({paginationbar,setPaginationbar}) {
    const {videos} = useSelector(state=>state.videoStore);
    const[initialPagination,setInitialShowPagination] = useState(0)
    const[lastPagination,setLastShowPagination] = useState(5)
     const PaginationList = [];
  let totel_lenth = (Math.round(Number(videos.total)))
  console.log(totel_lenth);
 [...Array(Math.round(Number(videos.total/10)) || 1).keys()].forEach(element => {
    PaginationList.push(element+1)
 })
const paginationHandler=(item)=>{
  setPaginationbar(item)
};
const deHandlaer=()=>{
  if(paginationbar > 1){
    if(initialPagination === paginationbar){
        setInitialShowPagination((pre)=>pre-5)
        setLastShowPagination((pre)=>pre-5)
      }
   setPaginationbar((pre)=>pre-1)
  }

}
const inHandlaer=()=>{
    if(PaginationList.length > paginationbar){
      if(lastPagination === paginationbar){
        setInitialShowPagination((pre)=>pre+5)
        setLastShowPagination((pre)=>pre+5)
      }
       setPaginationbar((pre)=>pre+1)  
    }
}
  return (
    <>
      <div className='pagination__container'>
        <div className='pagination__box'>
         {paginationbar !==1 && <div onClick={deHandlaer} className='pagination__bar__pre'><ArrowLeftIcon className='left__icon'/><span className='pre'>pre</span></div>  }
          {PaginationList?.slice(initialPagination,lastPagination).map((item,index)=>(
             <div key={index} onClick={()=>paginationHandler(item)} style={{backgroundColor:paginationbar === item?'#adb5bd':''}} className='pagination__number'>{item}</div> 
           ))}
         <div  onClick={inHandlaer} className='pagination__bar__next'><span className='next'>next</span><ArrowRightIcon  className='rights__icon'/></div> 
        </div>
      </div>
    </>
  )
}

export default Pagination
