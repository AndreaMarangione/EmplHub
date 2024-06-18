import React, { useEffect } from 'react';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import { useDispatch, useSelector } from "react-redux";
import { loginState, login } from '../redux/sessionSlice';

const Customers = () => {
    const dispatch = useDispatch();
    const { session } = useSession();
    const sessionData = useSelector(loginState);
    useEffect(() => {
        if (session) {
            dispatch(login(session));
        }
    }, []);
    return (
        <MainLayout childrens={''} />
    )
}

export default Customers;
