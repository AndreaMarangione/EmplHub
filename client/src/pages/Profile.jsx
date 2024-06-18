import React, { useEffect } from 'react';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import ChangeArrowIcon from '../components/icons/ChangeArrowIcon/ChangeArrowIcon';
import AxiosApi from '../class/axiosApi';
import PasswordForm from '../components/PasswordForm/PasswordForm';
import { useDispatch, useSelector } from "react-redux";
import { loginState, login } from '../redux/sessionSlice';
import './css/profile.css';

const Profile = () => {
    const dispatch = useDispatch();
    const { session } = useSession();
    const sessionData = useSelector(loginState);
    useEffect(() => {
        if (session) {
            dispatch(login(session));
        }
    }, []);
    return (
        <MainLayout childrens={
            <div className='profile-container d-flex align-items-center justify-content-center'>
                <div className='profile d-flex flex-column flex-md-row 
                align-items-center justify-content-md-around gap-4 gap-md-5 mt-4'>
                    <div className='d-flex flex-column align-items-center gap-3'>
                        <div className='profile-image-container'>
                            <img className='profile-image' src={sessionData.avatar} alt="profile-image" />
                            <input
                                // onChange={handleImage}
                                className='profile-change-image'
                                type="file"
                                id="file"
                                name='profileImage'
                            />
                            <label className='profile-image-label' htmlFor='file'>
                                <ChangeArrowIcon classStyle='profile-image-input' />
                            </label>
                        </div>
                        <div>
                            <div className='profile-data'>
                                <label>Name</label>
                                <p>{sessionData.name}</p>
                            </div>
                            <div className='profile-data'>
                                <label>Surname</label>
                                <p>{sessionData.surname}</p>
                            </div>
                            <div className='profile-data'>
                                <label>Email</label>
                                <p>{sessionData.email}</p>
                            </div>
                            <div className='profile-data'>
                                <label>Date of birthday</label>
                                <p>Data di nascita</p>
                            </div>
                        </div>
                    </div>
                    <PasswordForm />
                </div>
            </div>
        } />
    )
}

export default Profile;
