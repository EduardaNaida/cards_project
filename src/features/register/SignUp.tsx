import React, {useState} from 'react'
import SuperButton from "../../common/components/SuperButton/SuperButton";
import style from './SignUp.module.css';
import {setRegister} from "../../redux/authReducer";
import {AppDispatch} from "../../app/store";
import {NavLink, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {Box, IconButton, Input, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from '@mui/icons-material'

const SignUp = () => {
    const [error, setError] = useState<string>('')

    const dispatch = AppDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        onSubmit: values => {
            if (values.password !== values.confirmPassword) {
                setError('Password are not matching!')
            } else {
                dispatch(setRegister(values.email, values.password, navigate));
            }
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
                               value={formik.values.email}
                               className={style.input}
                        />
                    </div>
                    <div className={style.inputBlock}>
                        <Input placeholder={'Password'}
                               name={'password'}
                               onChange={formik.handleChange}
                               value={formik.values.password.trim()}
                               className={style.input}
                               type={showPassword ? 'text' : 'password'}
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
                    </div>
                    {error && <div className={style.error}>{error}</div>}
                    <SuperButton type="submit">Sign Up</SuperButton>
                    <p className={style.text}>Already have an account?</p>
                    <NavLink to={'/login'}>Sign In</NavLink>
                </Box>
            </div>
        </div>
    )
}


export default SignUp
