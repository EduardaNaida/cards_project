import React, { FC } from 'react'
import { Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import check from '../../../assets/img/check.svg'
import s from './CheckEmailPage.module.css'

const CheckEmailPage: FC = () => {
  const navigate = useNavigate()
  const toLogin = () => {
    navigate('/login')
  }

  return (
    <Container component="main" maxWidth="xs">
      <b>Check Email</b>
      <div className={s.imgContainer}>
        <img src={check} className={s.img} alt="check" />
      </div>
      <p>We’ve sent an Email with instructions to example@mail.com</p>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={toLogin}
        sx={{
          mt: 3,
          mb: 2,
          background: '#366EFF',
          boxShadow:
            '0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
          borderRadius: '30px',
        }}
      >
        Back to login
      </Button>
    </Container>
  )
}

export default CheckEmailPage
