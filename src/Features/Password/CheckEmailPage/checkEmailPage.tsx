import React, { FC } from 'react'
import { Container } from '@mui/material'
import check from '../../../Assets/Img/check.svg'
import s from './checkEmailPage.module.css'
import { Title } from '../../../Common/Components/Title/title'
import styleC from '../../../Common/Components/Styles/container.module.css'
import SuperButton from '../../../Common/Components/SuperButton/superButton'

const CheckEmailPage: FC = () => {
  return (
    <Container component="main" maxWidth="xs" className={`${styleC.container} ${s.container}`}>
      <Title title={'Check Email'} />
      <div className={s.imgContainer}>
        <img src={check} className={s.img} alt="check" />
      </div>
      <p>We’ve sent an Email with instructions to example@mail.com</p>
      <SuperButton>Back to login</SuperButton>
    </Container>
  )
}

export default CheckEmailPage
