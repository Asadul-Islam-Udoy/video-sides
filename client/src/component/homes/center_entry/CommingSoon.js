import React, { useEffect, useRef, useState } from 'react';
import './CommingSoon.css';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { getAllPosterAction } from '../../../action/VideosAction';
import { useDispatch, useSelector } from 'react-redux';
import Lodder from '../../../lodders/Lodder';
import { useAlert } from 'react-alert';
import ReviewsModel from '../reviews/ReviewsModel';
import { API_URLS } from '../../url/Api_Urls';
function CommingSoon({setCoursolHeight}) {
const alert = useAlert();
const[posterId,setPosterId] = useState();
const clhidref = useRef();
const [value, setValue] = React.useState(5);
const[reviewShow,setReviewShow] = useState(false);
const dispatch = useDispatch();
const {error,lodding,posters} = useSelector(state=>state.posterStore);

  useEffect(()=>{
   const scr = clhidref.current;
   const squares = scr.querySelectorAll('img');
    const obsers = new IntersectionObserver((squares)=>{
      squares.forEach((square)=>{
        if(square.isIntersecting){
          square.target.classList.add('invidual')
        
        }
        else{
            square.target.classList.remove('invidual')
         
        }
      })
    })
    squares.forEach((square)=>obsers.observe(square))
   },[]);

function mouseEnter(){
   setCoursolHeight(true)
}
function mouseLeves(){
    setCoursolHeight(false)  
}

useEffect(()=>{
  if(error){
    alert.error(error)
  }
  dispatch(getAllPosterAction())
},[alert,error]);


const reviewChangeHandler=(id)=>{
setReviewShow((pre)=>!pre)
setPosterId(id)
}

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
   {reviewShow && <div><ReviewsModel posterId={posterId}/></div>}
   {lodding && <Lodder/>}
    <div onMouseEnter={mouseEnter} onMouseLeave={mouseLeves} className='commingSoon__video__container'>
        <div className='comming__tax__container'>
            <h4>THIS VIDEOS IS COMMING SOON</h4>
        </div>

        <div ref={clhidref} className='comming__soon__videos__container'>
          <div>
             <div>
               {posters?.map((item)=>(
                   
                   <div  className='comming__soon__box'>
                     <div>
                     <Link to={`/single/poster/page/${item._id}`}>
                        <img  src={API_URLS+`/images/posters/${item.PosterImages[0].image}`} alt={item._id}/>
                      </Link>
                     </div>
                     <div>
                       <div>
                          <Typography component="legend">View Rating</Typography>
                          <Rating name="read-only" value={reviewFun(item.reviews)/item.reviews.length} readOnly />
                       </div>

                        <div>
                          <Link to={`/single/poster/page/${item._id}`}>
                             <h3 style={{color:'green'}}>{item.title}</h3>
                           </Link>
                        </div>
                       <div><p>{item.description}</p></div>
                       <div className='comming__poster__bottom'><button onClick={()=>reviewChangeHandler(item._id)}>Review</button></div>
                     </div>
                   </div>
                   
                ))}
               </div>
        
            </div>
        </div>

    </div>
    </>
  )
}


export default CommingSoon