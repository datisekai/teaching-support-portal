import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div>AuthLayout
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default AuthLayout