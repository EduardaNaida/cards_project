import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Container, CssBaseline, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAppDispatch } from '../../../App/store'
import { forgotPassword } from '../../authReducer'
import { Title } from '../../../Common/Components/Title/title'
import style from './forgotPassword.module.css'
import styleC from '../../../Common/Components/Styles/container.module.css'
import SuperButton from '../../../Common/Components/SuperButton/superButton'

const ForgotPassword: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(forgotPassword(values.email, navigate))
    },
  })

  /*  const toCheckEmailPage = () => {
      navigate('/check-email-page')
    }*/

  return (
    <Container component="main" className={style.mainBlock}>
      <CssBaseline />
      <Box className={`${styleC.container} ${style.box}`}>
        <Typography component="h2" variant="h5">
          <Title title={'Forgot your Password?'} />
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} className={style.secondBox}>
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="Email"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            value={formik.values.email}
            onChange={formik.handleChange}
            autoComplete="email"
            autoFocus
          />
          <div className={style.text}>
            Enter your email address and we will send you further instructions
          </div>
          <div className={style.thirdBox}>
            <SuperButton>Send instructions</SuperButton>
            <div className={style.secondText}>Did you remember your password?</div>
            <Link to="/login">Try login in</Link>
          </div>
        </Box>
      </Box>
    </Container>
  )
}

export default ForgotPassword
