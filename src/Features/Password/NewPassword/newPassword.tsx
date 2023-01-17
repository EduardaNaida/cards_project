import React from 'react'
import {
  Box,
  Container,
  CssBaseline,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useAppDispatch } from '../../../App/store'
import { useNavigate, useParams } from 'react-router-dom'
import { createNewPassword } from '../../authReducer'
import { Title } from '../../../Common/Components/Title/title'
import style from './newPassword.module.css'
import styleC from '../../../Common/Components/Styles/container.module.css'
import SuperButton from '../../../Common/Components/SuperButton/superButton'

const NewPassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let { token } = useParams()
  const validationSchema = yup.object({
    password: yup.string().min(7, 'Password is too short - should be 7 chars minimum.'),
  })

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (token)
        dispatch(
          createNewPassword({ password: values.password, resetPasswordToken: token }, navigate),
        )
    },
  })

  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Container component="main" maxWidth="xs" className={style.mainBlock}>
      <CssBaseline />
      <Box className={`${styleC.container} ${style.box}`}>
        <Typography component="h2" variant="h5">
          <Title title={'Create new Password'} />
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} className={style.boxSecond}>
          <FormControl sx={{ width: '100% ' }} variant="standard" fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              fullWidth
              id="password"
              name="password"
              required
              error={formik.touched.password && Boolean(formik.errors.password)}
              value={formik.values.password}
              onChange={formik.handleChange}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText
              id="password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              disabled={formik.touched.password && !Boolean(formik.errors.password)}
            >
              {formik.errors.password}
            </FormHelperText>
          </FormControl>
          <div>Create new password and we will send you further instructions to email</div>
          <SuperButton>Create new password</SuperButton>
        </Box>
      </Box>
    </Container>
  )
}

export default NewPassword
