import React, {FC} from 'react'
import {Button, Container} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import check from '../../../assets/img/check.svg'
import s from './CheckEmailPage.module.css'
import {Title} from "../../../common/components/Title/Title";
import styleC from "../../../common/components/styles/Container.module.css";
import SuperButton from "../../../common/components/SuperButton/SuperButton";

const CheckEmailPage: FC = () => {
    const navigate = useNavigate()
    const toLogin = () => {
        navigate('/login')
    }

    return (
        <Container component="main" maxWidth="xs" className={`${styleC.container} ${s.container}`}>
            <Title title={'Check Email'}/>
            <div className={s.imgContainer}>
                <img src={check} className={s.img} alt="check"/>
            </div>
            <p>We’ve sent an Email with instructions to example@mail.com</p>
            <SuperButton>Back to login</SuperButton>
        </Container>
    )
}

export default CheckEmailPage
