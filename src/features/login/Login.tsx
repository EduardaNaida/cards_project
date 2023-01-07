import React from 'react';
import SuperInputText from "../../common/components/SuperInputText/SuperInputText";
import SuperButton from "../../common/components/SuperButton/SuperButton";
import SuperCheckbox from "../../common/components/SuperCheckbox/SuperCheckbox"
import style from './Login.module.css';


const Login = () => {
    return (
        <div className={style.login}><h1>Login</h1>
            <SuperInputText
                value={'email'}/>
            <SuperInputText
                value={'password'}/>
            <SuperButton>login</SuperButton>
            <SuperCheckbox>remember me</SuperCheckbox>
        </div>
    );
};

export default Login;