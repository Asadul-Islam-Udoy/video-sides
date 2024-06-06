import React, { useState } from 'react';
import './Address.css';
import { Country, State, City }  from 'country-state-city';
import BadgeIcon from '@mui/icons-material/Badge';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import BungalowIcon from '@mui/icons-material/Bungalow';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { VideoAddressStoreAction } from '../../../action/PaymentVideosAction';
function Address() {
    const {id} = useParams();
    const{videoCost} = useParams();
    const{createUser} = useParams();
    const{video} = useParams();
    const navigate = useNavigate();
    const[address,setAddress] = useState('');
    const[stateCode,setStateCode]=useState('') ;
    const[state,setState]=useState('') 
    const[city,setCity]=useState('') 
    const[country,setCountry]=useState('');
    const[phone,setPhone]=useState(); 
    const dispatch = useDispatch();
    const{userInfo} = useSelector(state=>state.registerStore)
    const[username,setUsername] = useState(userInfo.user.username);
    const[email,setEmail] = useState(userInfo.user.email)
    const addressSubmit=(e)=>{
      e.preventDefault();
      dispatch(VideoAddressStoreAction({username,email,address,city,state,stateCode,country,phone,videoCost,id,createUser,video}));
      navigate('/payment/address/check');
    }
  return (
    <>
    <div className='address__container'>
        <div className='address__info'>
           <h2>User Personal Information</h2>
           <h4>If You want to Playing This Video them will be payment</h4>
        </div>
       <div className='address__box'>
       <form className='address__from' onSubmit={addressSubmit}>
                    <div>
                        <label>Address</label>
                         <div>
                            <BadgeIcon className='address__icon'/>
                           <input required value={address} type='text' onChange={(e)=>setAddress(e.target.value)} placeholder='enter the address...'/>
                        </div>
                    </div>
                    <div>
                        <label>State Code</label>
                         <div>
                            <BungalowIcon className='address__icon'/>
                           <input required  value={stateCode} type='text' onChange={(e)=>setStateCode(e.target.value)} placeholder='enter the state code...'/>
                        </div>
                    </div>
                    <div>
                        <label>Phone Number</label>
                         <div>
                            <PermPhoneMsgIcon className='address__icon'/>
                           <input required  value={phone} type='number' onChange={(e)=>setPhone(e.target.value)} placeholder='enter the number...'/>
                        </div>
                    </div>
                    <div>
                        <label>City</label>
                         <div>
                            <LocationCityIcon className='address__icon'/>
                           <input required  value={city} type='text' onChange={(e)=>setCity(e.target.value)} placeholder='enter the city...'/>
                        </div>
                    </div>
                    <div>
                      <select  required  value={country} onChange={(e)=>setCountry(e.target.value)}>
                        <option>Select Country</option>
                        {Country.getAllCountries().map((i)=>(
                            <option value={i.isoCode}>{i.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select required  onChange={(e)=>setState(e.target.value)}>
                        <option>Select State</option>
                        {State.getStatesOfCountry(country).map((i)=>(
                            <option value={i.isoCode}>{i.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                        <button type='submit'>Submit Now</button>
                    </div>
                </form>
       </div>
    </div>
    </>
  )
}

export default Address
