import React from 'react'
import { Outlet } from 'react-router-dom';
import Login from '../pages/Login';

const ProtectedRoutes = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    return token ? <Outlet /> : <Login />
}

export default ProtectedRoutes;
