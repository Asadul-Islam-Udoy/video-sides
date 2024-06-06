import React, { useEffect, useRef, useState } from 'react';
import './PosterSingle.css';
import Rating from '@mui/material/Rating';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import E_Footer from '../footer/E_Footer';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePosterAction } from '../../../action/VideosAction';
import Lodder from '../../../lodders/Lodder';
import { API_URLS } from '../../url/Api_Urls';

function PosterSingle() {
    const dispatch = useDispatch()
    const [singlePoser,setSinglePoster] = useState(0);
    const btnref = useRef();
    const{id} = useParams();
    const {lodding,error,singlePoster} = useSelector(state=>state.posterStore);
    const [ratingShow,setRatingShow] = useState(0)
    const leftHandler=()=>{
        if(singlePoser > 0){
            setSinglePoster(singlePoser-1)
          }
    }

    const rightHandler=()=>{
    if(singlePoster[0]?.PosterImages?.length !== singlePoser){
        setSinglePoster(singlePoser+1)   
       }
    }
    useEffect(()=>{
     const current_node = btnref.current;
     const node = current_node.querySelectorAll('img')[singlePoser] ;
     if(node){
        node.scrollIntoView({behavior:'smooth'})
     } 
    },[singlePoser]);

    useEffect(()=>{
      dispatch(getSinglePosterAction(id))
  },[id]);
    const reviewFun=(reviewList)=>{
      let sum = 0 ;
      if(reviewList?.length > 0){
        reviewList?.forEach(element => {
          sum += element.rating
        });
      }
      return sum
      }

  return (
   <>
   {lodding && <Lodder/>}
    <div className='poster__single__container'>
        <div ref={btnref} className='poster__single__box__1'>
         {
           singlePoster?.PosterImages?.map((i,index)=>(
               <div>
                  <div>
                    <div onClick={leftHandler}><button><ArrowBackIosIcon/></button></div>
                    <div onClick={rightHandler}><button><ArrowForwardIosIcon/></button></div>
                  </div>
                  <img src={API_URLS+`/images/posters/${i.image}`} alt={index} />
               </div>
            ))
         }
        </div>
        <div  className='poster__single__box__2'>
          <div>
            <h1><TagFacesIcon style={{color:'red'}} /></h1>
            <h1><Rating name="read-only" size='large'  value={reviewFun(singlePoster?.reviews)/singlePoster?.reviews?.length} readOnly /></h1>
            <span>123k views</span>
          </div>
           <div >
             {singlePoster?.PosterImages?.map((i,index)=>(
                 <img className={singlePoser === index ?'image__border':'carosel__image'}  onClick={()=>setSinglePoster(index)} src={API_URLS+`/images/posters/${i.image}`} alt={index}/>
             ))}
          </div>
        </div>
        <div className='poster__single__box__3'>
          <h1>{singlePoster?.title}</h1>
        </div>
        <div className='poster__single__box__4'>
          <p>
           {singlePoster?.description}
             </p>
        </div>
    </div>
    <E_Footer/>
   </>
  )
}

export default PosterSingle