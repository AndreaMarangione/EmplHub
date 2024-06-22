import React, { useEffect } from 'react';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import { useDispatch} from "react-redux";
import { login } from '../redux/sessionSlice';

const ToDo = () => {
    const dispatch = useDispatch();
    const { session } = useSession();
    useEffect(() => {
        if (session) {
            dispatch(login(session));
        }
    }, []);
    return (
        <MainLayout childrens={''} />
    )
}

export default ToDo;
