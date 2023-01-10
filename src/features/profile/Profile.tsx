import React, { FC } from 'react'
import { AppDispatch, UseAppSelector } from '../../app/store'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import s from './Profile.module.css'
import avatar from './../../assets/img/avatar.jpg'

import EditableSpan from '../../common/components/EditableSpan/EditableSpan'

import { Logout } from '@mui/icons-material'
import { changeProfileTC, logoutTC } from '../userReducer'

const Profile: FC = () => {
  const dispatch = AppDispatch()
  const user = UseAppSelector((s) => s.user)

  const changeNameHandler = (name: string | null) => {
    dispatch(changeProfileTC({ name }))
  }

  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <div>
      <h3 className={s.title}>Personal information</h3>
      <img src={avatar} className={s.avatar} alt="avatar" />
      <div>
        <EditableSpan name={user.name} changeName={changeNameHandler} />
      </div>
      <div className={s.mail}>{user.email}</div>

      <SuperButton onClick={logoutHandler} className={s.profileBtn}>
        <Logout fontSize="small" style={{ verticalAlign: 'middle' }} />
        log out
      </SuperButton>
    </div>
  )
}

export default Profile
