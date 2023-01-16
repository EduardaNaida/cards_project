import React from 'react'
import s from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../../app/store'
import { UserType } from '../../../API/authApi/authApi'
import { Avatar } from '@mui/material'
import avatar from '../../../assets/img/avatar.jpg'

export const Navbar = () => {
  const user = useSelector<AppRootStateType, UserType>((state) => state.user)
  const userAvatar = user.avatar ? user.avatar : avatar
  const userNavLinks =
    user._id !== null ? (
      <>
        <div className={s.profile}>
          <NavLink to={'/profile'}>{user.name}</NavLink>
          <Avatar alt="avatar" src={userAvatar} />
        </div>
      </>
    ) : (
      <>
        <div className={s.item}>
          <NavLink to={'/login'}>sign in</NavLink>
        </div>
        <div className={s.item}>
          <NavLink to={'/signup'}>sign up</NavLink>
        </div>
      </>
    )

  return (
    <nav className={s.navBlock}>
      <div className={s.wrapper}>{userNavLinks}</div>
    </nav>
  )
}
