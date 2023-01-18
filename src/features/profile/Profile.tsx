import React, {FC} from 'react'
import {AppDispatch, UseAppSelector} from '../../app/store'
import SuperButton from '../../common/components/SuperButton/SuperButton'
import s from './Profile.module.css'
import avatar from './../../assets/img/avatar.jpg'
import EditableSpan from '../../common/components/EditableSpan/EditableSpan'
import {Logout} from '@mui/icons-material'
import {changeProfileTC, logoutTC} from '../userReducer'
import {Title} from '../../common/components/Title/Title'
import styleC from '../../common/components/styles/Container.module.css'
import {addCardsTC, getCardsTC, removeCardsTC, updateCardsTC} from "../cardReducer";

const Profile: FC = () => {
    const dispatch = AppDispatch()
    const user = UseAppSelector((s) => s.user)
    const userAvatar = user.avatar ? user.avatar : avatar

    const changeNameHandler = (name: string | null) => {
        dispatch(changeProfileTC({name}))
    }

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    const get = () => {
        dispatch(getCardsTC('63c5752d1a649e2a70686311'))
    }
    const add = () => {
        dispatch(addCardsTC({
            cardsPack_id: '63c5752d1a649e2a70686311',
            question: 'how are you?',
            answer: 'Fine'
        }))
    }
    const remove = () => {
        dispatch(removeCardsTC('63c8439f0efc5a091a74e6d7'))
    }
    const update = () => {
      dispatch(updateCardsTC({_id: '63c856320efc5a091a74e6db', question: 'hwwwwwww'}))
    }

    return (
        <div className={`${styleC.container} ${s.mainBlock}`}>
            <button onClick={get}>get</button>
            <button onClick={remove}>remove</button>
            <button onClick={add}>add</button>
            <button onClick={update}>update</button>
            <Title title={'Personal Information'}/>
            <img src={userAvatar} className={s.avatar} alt="avatar"/>
            <div>
                <EditableSpan name={user.name} changeName={changeNameHandler}/>
            </div>
            <div className={s.mail}>{user.email}</div>

            <SuperButton onClick={logoutHandler} className={s.profileButton}>
                <Logout fontSize="small" style={{verticalAlign: 'middle'}}/>
                log out
            </SuperButton>
        </div>
    )
}

export default Profile
