import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Main from "../common/components/Main/main";
import Login from "../features/login/Login";
import SuperButton from "../common/components/SuperButton/SuperButton";
import {Navbar} from "../common/components/Navbar/navbar";

function App() {
    return (
        <div className="App">
            <Main/>
        </div>
    );
}

export default App;
