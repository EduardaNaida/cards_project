import React from 'react';
import './index.css';
import App from './app/App';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./app/store";
import {createRoot} from "react-dom/client";

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);

root.render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>
);

