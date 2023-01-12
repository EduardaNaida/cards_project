import React, {useState} from 'react'
import SuperButton from "../../common/components/SuperButton/SuperButton";
import style from './SignUp.module.css';
import {setRegister} from "../../redux/authReducer";
import {AppDispatch} from "../../app/store";
import {NavLink, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {Box, FormHelperText, IconButton, Input, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from '@mui/icons-material'
import * as yup from 'yup'

const SignUp = () => {

    const dispatch = AppDispatch();
    const navigate = useNavigate();

    const validationSchema = yup.object({
        email: yup.string()
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup.string()
            .min(7, 'Password is too short - should be 7 chars minimum.')
            .required('Password is required'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Password are not matching!')
            .required('Confirm password is required')
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            dispatch(setRegister(values.email, values.password, navigate));
        },
    })

    const [showPassword, setShowPassword] = React.useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show)
    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }
    return (
        <div className={style.main}>
            <div className={style.signUpBlock}>
                <Box
                    sx={{
                        height: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-evenly'
                    }}
                    component="form" onSubmit={formik.handleSubmit}>
                    <h1>Sign Up</h1>
                    <div className={style.inputBlock}>
                        <Input placeholder={'Email'}
                               id={'email'}
                               name={'email'}
                               onChange={formik.handleChange}
                               value={formik.values.email.trim()}
                               className={style.input}
                               error={formik.touched.email && Boolean(formik.errors.email)}
                        />
                        {Boolean(formik.errors.email) && formik.touched.email ? (
                            <div className={style.error}>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className={style.inputBlock}>
                        <Input placeholder={'Password'}
                               name={'password'}
                               onChange={formik.handleChange}
                               value={formik.values.password.trim()}
                               className={style.input}
                               type={showPassword ? 'text' : 'password'}
                               error={formik.touched.password && Boolean(formik.errors.password)}
                               endAdornment={
                                   <InputAdornment position="end">
                                       <IconButton
                                           aria-label="toggle password visibility"
                                           onClick={handleClickShowPassword}
                                           onMouseDown={handleMouseDownPassword}
                                       >
                                           {showPassword ? <VisibilityOff/> : <Visibility/>}
                                       </IconButton>
                                   </InputAdornment>
                               }
                        />
                        {formik.errors.password && formik.touched.password ? (
                            <div className={style.error}>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className={style.inputBlock}>
                        <Input
                            placeholder={'Confirm password'}
                            name={'confirmPassword'}
                            id={'confirmPassword'}
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword.trim()}
                            className={style.input}
                            type={showConfirmPassword ? 'text' : 'password'}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownConfirmPassword}
                                    >
                                        {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }/>
                        {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                            <div className={style.error}>{formik.errors.confirmPassword}</div>
                        ) : null}
                    </div>
                    <SuperButton type="submit">Sign Up</SuperButton>
                    <p className={style.text}>Already have an account?</p>
                    <NavLink to={'/login'}>Sign In</NavLink>
                </Box>
            </div>
        </div>
    )
}

export default SignUp
