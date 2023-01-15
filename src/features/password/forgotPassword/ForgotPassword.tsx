import React, {FC} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Box, Button, Container, CssBaseline, TextField, Typography} from '@mui/material'
import {useFormik} from 'formik'
import * as yup from 'yup'
import {useAppDispatch} from '../../../app/store'
import {forgotPassword} from '../../../redux/authReducer'
import {Title} from "../../../common/components/Title/Title";

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
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
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
                    <Title title={'Forgot your password?'}/>
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} sx={{mt: 1}}>
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
                    <div>Enter your email address and we will send you further instructions</div>
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
                        Send instructions
                    </Button>
                    <div>Did you remember your password?</div>
                    <Link to="/login">Try login in</Link>
                </Box>
            </Box>
        </Container>
    )
}

export default ForgotPassword
