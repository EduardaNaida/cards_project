import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import SuperButton from "../SuperButton/SuperButton";
import Login from "../../../features/login/Login";
import SignUp from "../../../features/register/SignUp";
import Profile from "../../../features/profile/Profile";
import {Navbar} from "../Navbar/navbar";
import Error404 from "../../../features/Error404/Error404";
import Password from "../../../features/password/Password";
import NewPassword from "../../../features/password/newPassword/NewPassword";
import ForgotPassword from "../../../features/password/forgotPassword/ForgotPassword";

const Main = () => {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Navigate to='/profile'/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/signup'} element={<SignUp/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/password'} element={<Password/>}/>
                <Route path={'/forgot'} element={<ForgotPassword/>}/>
                <Route path={'/newpassword'} element={<NewPassword/>}/>
                <Route path='*' element={<Error404/>}/>
                {/*<Route path={'/'} element={<SuperButton/>}/>*/}
            </Routes>
        </div>
    );
};

export default Main;