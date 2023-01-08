import React from 'react'
import s from './Navbar.module.css'

import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className={s.navBlock}>
      <div className={s.item}>
        <NavLink to={'/'}>Main</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to={'/profile'}>Profile</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to={'/login'}>Login</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to={'/signup'}>Register</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to={'/password'}>Password</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to={'/newpassword'}>New Password</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to={'/404'}>Error404</NavLink>
      </div>
    </nav>
  )
}
