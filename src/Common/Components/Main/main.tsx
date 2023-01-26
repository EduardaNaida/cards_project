import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../../../Features/Login/login'
import SignUp from '../../../Features/Register/signUp'
import Profile from '../../../Features/profile/Profile'
import { Navbar } from '../Navbar/navbar'
import Password from '../../../Features/Password/password'
import NewPassword from '../../../Features/Password/NewPassword/newPassword'
import ForgotPassword from '../../../Features/Password/ForgotPassword/forgotPassword'
import { UseAppSelector } from '../../../App/store'
import CheckEmailPage from '../../../Features/Password/CheckEmailPage/checkEmailPage'
import { PacksList } from '../../../Features/Main/PacksList/packsList'
import { FriendsPack } from '../../../Features/Main/FriendsPack/friendsPack'
import { MyPack } from '../../../Features/Main/MyPack/myPack'
import { Learn } from '../../../Features/Learn/learn'

const Main = () => {
  const userId = UseAppSelector((state) => state.user._id)
  const isUserLogined = userId !== null
  return (
    <div>
      <Navbar />
      <Routes>
        {isUserLogined ? (
          <>
            <Route path={'/Profile'} element={<Profile />} />
            <Route path={'/packs-list'} element={<PacksList />} />
            <Route path={'/friends-pack/:packId'} element={<FriendsPack />} />
            <Route path={'/my-pack/:packId'} element={<MyPack />} />
            <Route path={'/learn/:packId'} element={<Learn />} />
            <Route path="/login" element={<Navigate to="/profile" replace />} />
            <Route path="*" element={<Navigate to="/profile" replace />} />
          </>
        ) : (
          <>
            <Route path={'/signup'} element={<SignUp />} />
            <Route path={'/Login'} element={<Login />} />
            <Route path={'/Password'} element={<Password />} />
            <Route path={'/forgot-Password'} element={<ForgotPassword />} />
            <Route path={'/check-email-page'} element={<CheckEmailPage />} />
            <Route path={'/create-new-Password/:token'} element={<NewPassword />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </div>
  )
}

export default Main
