import React from 'react'
import s from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../../app/store'
import { UserType } from '../../../API/API'

export const Navbar = () => {
  const user = useSelector<AppRootStateType, UserType>((state) => state.user)

  return (
    <nav className={s.navBlock}>
      {user.email !== null ? (
        <>
          <div className={s.item}>
            <NavLink to={'/profile'}>Profile</NavLink>
          </div>
        </>
      ) : (
        <>
          <div className={s.item}>
            <NavLink to={'/login'}>Login</NavLink>
          </div>
          <div className={s.item}>
            <NavLink to={'/signup'}>Register</NavLink>
          </div>
        </>
      )}
    </nav>
  )
}
