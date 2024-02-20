import AuthContext from "./contexts/AuthContext";
import { Router } from "./routes";
import React from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



export default function App() {
    return (
        <AuthContext>
            <Router/>
            <ToastContainer theme="colored"/>
        </AuthContext>
    )
}
