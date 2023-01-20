import React from 'react'
import s from './navbar.module.css'
import {NavLink, useParams} from 'react-router-dom'
import {UseAppSelector} from '../../../App/store'
import {UserNavbarAvatar} from '../UserNavbarAvatar/userNavbarAvatar'

export const Navbar = () => {
    const userName = UseAppSelector((state) => state.user.name)
    const userId = UseAppSelector((state) => state.user._id)
    const packId = '63c5752d1a649e2a70686311'

    const userNavLinks =
        userId !== null ? (
            <>
                <div className={s.profile}>
                    <NavLink to={'/Profile'}>{userName}</NavLink>
                    <UserNavbarAvatar/>
                </div>
                <div className={s.item}>
                    <NavLink to={`/my-pack/${packId}`}>My pack</NavLink>
                </div>
            </>
        ) : (
            <>
                <div className={s.item}>
                    <NavLink to={'/Login'}>sign in</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to={'/signup'}>sign up</NavLink>
                </div>
            </>
        )

    return (
        <nav className={s.navBlock}>
            <div className={s.wrapper}>{userNavLinks}</div>
        </nav>
    )
}
