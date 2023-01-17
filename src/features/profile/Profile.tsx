import React, { FC } from 'react'
import { AppDispatch, UseAppSelector } from '../../app/store'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import s from './Profile.module.css'
import avatar from './../../assets/img/avatar.jpg'
import EditableSpan from '../../common/components/EditableSpan/EditableSpan'
import { Logout } from '@mui/icons-material'
import { changeProfileTC, logoutTC } from '../userReducer'
import { Title } from '../../common/components/Title/Title'
import styleC from '../../common/components/styles/Container.module.css'

const Profile: FC = () => {
  const dispatch = AppDispatch()
  const user = UseAppSelector((s) => s.user)
  const userAvatar = user.avatar ? user.avatar : avatar

  const changeNameHandler = (name: string | null) => {
    dispatch(changeProfileTC({ name }))
  }

  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <div className={`${styleC.container} ${s.mainBlock}`}>
      <Title title={'Personal Information'} />
      <img src={userAvatar} className={s.avatar} alt="avatar" />
      <div>
        <EditableSpan name={user.name} changeName={changeNameHandler} />
      </div>
      <div className={s.mail}>{user.email}</div>

      <SuperButton onClick={logoutHandler} className={s.profileButton}>
        <Logout fontSize="small" style={{ verticalAlign: 'middle' }} />
        log out
      </SuperButton>
    </div>
  )
}

export default Profile
