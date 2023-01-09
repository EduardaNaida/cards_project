import React, {ChangeEvent, useState} from 'react'
import SuperInputText from "../../common/components/SuperInputText/SuperInputText";
import SuperButton from "../../common/components/SuperButton/SuperButton";
import style from './SignUp.module.css';
import {setRegister} from "../../redux/authReducer";
import {AppDispatch} from "../../app/store";
import {NavLink} from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPass, setConfirmPass] = useState<string>('')
    const [error, setError] = useState<string>('')

    const dispatch = AppDispatch();

    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const onChangeConfirmPassHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPass(e.currentTarget.value)
    }

    const onSubmit = () => {
        if (password !== confirmPass) {
            setError('Password are not matching!')
            console.log('error')
        } else {
            dispatch(setRegister(email, password))
        }
    }
    // const formik = useFormik({
    //     initialValues: {
    //         email: '',
    //         password: '',
    //         confirmPassword: ''
    //     },
    //     onSubmit: values => {
    //         alert(JSON.stringify(values));
    //         dispatch(setRegister(values.email, values.password))
    //         console.log(email, password)
    //     },
    // })

    return (
        // <form onSubmit={formik.handleSubmit}>
        //     <div>
        //         <Field placeholder={'Email'}
        //                name={'email'}
        //                component={SuperInputText}
        //                onChange={formik.handleChange}
        //                value={formik.initialValues.email}
        //         />
        //     </div>
        //     <div>
        //         <Field placeholder={'Password'}
        //                type={'password'}
        //                name={'password'}
        //                component={SuperInputText}
        //
        //                value={formik.initialValues.password}/>
        //     </div>
        //     <div>
        //         <Field
        //             type={'password'}
        //             name={'confirmpassword'}
        //             component={SuperInputText}
        //             value={formik.initialValues.confirmPassword}/>
        //     </div>
        //     {error && <div className={style.error}>{error}</div>}
        //     <div>
        //         <SuperButton type="submit">Sign Up</SuperButton>
        //     </div>
        // </form>
        <div className={style.signUpBlock}>
            <h1>Sign Up</h1>
            <SuperInputText placeholder={'Email'}
                            onChange={onChangeEmailHandler}
                            value={email}/>
            <SuperInputText placeholder={'Password'}
                            onChange={onChangePasswordHandler}
                            value={password}/>
            <SuperInputText placeholder={'Confirm password'}
                            onChange={onChangeConfirmPassHandler}
                            value={confirmPass}/>
            {error && <div className={style.error}>{error}</div>}
            <SuperButton onClick={onSubmit}>Sign Up</SuperButton>
            <p className={style.text}>Already have an account?</p>
            <NavLink to={'/login'}>Sign In</NavLink>
        </div>
    )
}


export default SignUp
