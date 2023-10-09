import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

import Login from '../Pages/Login'

const ProtectedRoute = () => {
    const {currentUser} = useSelector((state)=> state.user)

  return (
    currentUser  ? <Outlet /> : <Navigate to='/login' />
  )
}

export default ProtectedRoute