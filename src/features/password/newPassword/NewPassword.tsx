import React from 'react'
import {
  Box,
  Button,
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
import { useAppDispatch } from '../../../app/store'
import { useNavigate, useParams } from 'react-router-dom'
import { createNewPassword } from '../../../redux/authReducer'

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '35px 33px 42px 33px',
          background: '#FFFFFF',
          boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1)',
          borderRadius: '2px',
        }}
      >
        <Typography component="h2" variant="h5">
          <b>Created new password</b>
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              background: '#366EFF',
              boxShadow:
                '0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)',
              borderRadius: '30px',
            }}
          >
            Created new password
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default NewPassword
