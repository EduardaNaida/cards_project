import React from 'react'
import {useAppDispatch} from '../../app/store'
import {userLoginTC} from '../userReducer'
import {Link} from 'react-router-dom'
import {
    Box,
    Checkbox,
    Container,
    CssBaseline,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    TextField,
    Typography,
} from '@mui/material'
import {useFormik} from 'formik'
import * as yup from 'yup'
import {Visibility, VisibilityOff} from '@mui/icons-material'
import {Title} from "../../common/components/Title/Title";
import style from './Login.module.css';
import styleC from "../../common/components/styles/Container.module.css";
import SuperButton from "../../common/components/SuperButton/SuperButton";

const Login = () => {
    const dispatch = useAppDispatch()

    const validationSchema = yup.object({
        email: yup.string().email('Enter a valid email').required('Email is required'),
        password: yup.string().min(7, 'Password is too short - should be 7 chars minimum.'),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(
                userLoginTC({
                    ...values,
                }),
            )
        },
    })

    const [showPassword, setShowPassword] = React.useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    return (
        <Container component="main" className={style.mainBlock}>
            <CssBaseline/>
            <Box className={`${styleC.container} ${style.box}`}>
                <Typography component="h2" variant="h5">
                    <Title title={'Sign In'}/>
                </Typography>
                <Box className={style.boxSecond} component="form" onSubmit={formik.handleSubmit} sx={{mt: 1}}>
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
                    <FormControl sx={{width: '100% '}} variant="standard" fullWidth>
                        <InputLabel htmlFor="password">Password *</InputLabel>
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
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
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
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <FormControlLabel
                            control={<Checkbox value="rememberMe" color="primary"/>}
                            id="rememberMe"
                            name="rememberMe"
                            label="Remember me"
                            value={formik.values.rememberMe}
                            onChange={formik.handleChange}
                        />
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <SuperButton type="submit">Sign In</SuperButton>
                    <div>
                        <div className={style.text}>Don't have an account?</div>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </Box>
            </Box>
        </Container>
    )
}

export default Login
