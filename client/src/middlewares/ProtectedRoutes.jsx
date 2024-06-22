import React from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../pages/Login';
import useSession from '../Hooks/useSession';

const ProtectedRoutes = () => {
    const { session } = useSession();
    return session.role === 'admin' ? <Outlet /> : <Login />
}

export default ProtectedRoutes;
