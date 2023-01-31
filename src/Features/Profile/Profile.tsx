import React, { FC } from 'react'
import { AppDispatch, UseAppSelector } from '../../App/store'
import SuperButton from '../../Common/Components/SuperButton/superButton'
import s from './profile.module.css'
import avatar from '../../Assets/Img/avatar.jpg'
import EditableSpan from '../../Common/Components/EditableSpan/editableSpan'
import { Logout } from '@mui/icons-material'
import { changeProfileTC, logoutTC } from '../userReducer'
import { Title } from '../../Common/Components/Title/title'
import styleC from '../../Common/Components/Styles/container.module.css'
import { NavToMain } from '../../Common/Components/NavToMain/navToMain'

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
    <div className={s.wrapper}>
      <NavToMain />
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
    </div>
  )
}

export default Profile
