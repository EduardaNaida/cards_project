import React from 'react'
import { Popover } from '@mui/material'
import { useAppDispatch, UseAppSelector } from '../../../App/store'
import avatar from '../../../Assets/Img/avatar.jpg'
import s from './userNavbarAvatar.module.css'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import { logoutTC } from '../../../Features/userReducer'
import { useNavigate } from 'react-router-dom'

export const UserNavbarAvatar = () => {
  const userAvatar = UseAppSelector((state) => state.user.avatar)
  const currentUserAvatar = userAvatar ? userAvatar : avatar
  const [anchorEl, setAnchorEl] = React.useState<any>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logoutTC())
    handleClose()
  }

  const handleNavigateProfile = () => {
    navigate('/profile')
    handleClose()
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return (
    <>
      <div onClick={handleClick} className={s.avatar}>
        <img src={currentUserAvatar} alt="avatar" style={{ width: '100%', height: '100%' }} />
      </div>
      <Popover
        sx={{ display: 'flex', flexDirection: 'column' }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
      >
        <div className={s.buttonWrapper}>
          <button className={s.profileLink} onClick={handleNavigateProfile}>
            <PersonIcon />
            Profile
          </button>
          <button className={s.logoutLink} onClick={handleLogout}>
            <LogoutIcon />
            Logout
          </button>
        </div>
      </Popover>
    </>
  )
}
