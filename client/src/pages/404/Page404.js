import React from 'react'
import './Page404.css';
import { useNavigate } from 'react-router-dom';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
function Page404() {
    const navigate = useNavigate();
  return (
    <>
    <div className='page__404__containar'>
      <div className='back__button__section'><button onClick={()=>navigate(-1)}><NavigateBeforeIcon className='back__left__icon'/>Back</button></div>
      <div className='page__404__box'>
        <h4>Page Not Found</h4>
        <h1>404</h1>
      </div>
    </div>
    </>
  )
}

export default Page404