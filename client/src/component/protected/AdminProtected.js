import React from 'react'
import {useAlert} from 'react-alert';
import {Navigate} from 'react-router-dom'
function AdminProtected({adminAuth,children}) {
    const alert = useAlert()
    if(!adminAuth){
      alert.error('you are not superuser');
     return <Navigate to='/' replace/>
    }

  return children
}

export default AdminProtected
