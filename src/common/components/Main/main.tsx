import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../../../features/login/Login'
import SignUp from '../../../features/register/SignUp'
import Profile from '../../../features/profile/Profile'
import { Navbar } from '../Navbar/navbar'
import Password from '../../../features/password/Password'
import NewPassword from '../../../features/password/newPassword/NewPassword'
import ForgotPassword from '../../../features/password/forgotPassword/ForgotPassword'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../../app/store'
import { UserType } from '../../../API/API'

const Main = () => {
  const user = useSelector<AppRootStateType, UserType>((state) => state.user)

  return (
    <div>
      <Navbar />
      <Routes>
        {user.email !== null ? (
          <>
            <Route path={'/profile'} element={<Profile />} />
            <Route path="/login" element={<Navigate to="/profile" replace />} />
            <Route path="*" element={<Navigate to="/profile" replace />} />
          </>
        ) : (
          <>
            <Route path={'/signup'} element={<SignUp />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/password'} element={<Password />} />
            <Route path={'/forgot-password'} element={<ForgotPassword />} />
            <Route path={'/create-new-password/:token'} element={<NewPassword />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </div>
  )
}

export default Main
