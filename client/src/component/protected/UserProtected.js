import React from 'react'
import {Navigate} from 'react-router-dom';
import {useAlert} from 'react-alert';
function UserProtected({isUser,children}) {
  const alert = useAlert()
  if(!isUser){
    alert.error('you are not user?please loin now!')
    return <Navigate to='/' replece/>
  }
  return children
}

export default UserProtected