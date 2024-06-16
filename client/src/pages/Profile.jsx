import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loginState, login } from '../redux/sessionSlice';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import './css/profile.css';

const Profile = () => {
    const dispatch = useDispatch();
    const { session } = useSession();
    const sessionData = useSelector(loginState);
    console.log(sessionData);
    useEffect(() => {
        if (session) {
            dispatch(login(session));
        }
    }, []);
    return (
        <MainLayout childrens={
            <div className='profile-data-container'>
                <img src={sessionData.avatar} alt="profile-image" />
                <h3>Name: {sessionData.name}</h3>
                <h3>Surname: {sessionData.surname}</h3>
                <h3>Email: {sessionData.email}</h3>
            </div>
        } />
    )
}

export default Profile;
