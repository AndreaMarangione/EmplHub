import React, { useEffect, useState } from 'react';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import ChangeArrowIcon from '../components/icons/ChangeArrowIcon/ChangeArrowIcon';
import AxiosApi from '../class/axiosApi';
import PasswordForm from '../components/PasswordForm/PasswordForm';
import { useDispatch, useSelector } from "react-redux";
import { loginState, login } from '../redux/sessionSlice';
import { jwtDecode } from "jwt-decode";
import './css/profile.css';

const Profile = () => {
    const api = new AxiosApi();
    const dispatch = useDispatch();
    const { session } = useSession();
    const sessionData = useSelector(loginState);
    const [showLoader, setShowLoader] = useState(false);
    const handleShowLoader = (command) => {
        setShowLoader(command);
    }
    const handleImage = async (e) => {
        const image = e.target.files[0];
        const data = new FormData();
        data.append('profileImage', image);
        handleShowLoader(true);
        try {
            const response = await api.patch('/profile/image',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            if (response.statusText) {
                const token = JSON.stringify(response.data);
                localStorage.setItem('token', token);
                dispatch(login(jwtDecode(token)));
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            handleShowLoader(false);
        }
    }
    useEffect(() => {
        if (session) {
            dispatch(login(session));
        }
        // eslint-disable-next-line
    }, []);
    return (
        <MainLayout childrens={
            <div className='profile-container d-flex align-items-center justify-content-center'>
                <div className='profile d-flex flex-column flex-md-row 
                align-items-center justify-content-md-around gap-4 gap-md-5 mt-4'>
                    <div className='d-flex flex-column align-items-center gap-3'>
                        {showLoader ?
                            <div className='profile-loader-container'>
                                <span className="loader"></span>
                            </div>
                            :
                            <div className='profile-image-container'>
                                <img className='profile-image' src={sessionData.avatar} alt="profile" />
                                <input
                                    onChange={handleImage}
                                    className='profile-change-image'
                                    type="file"
                                    id="file"
                                    name='profileImage'
                                />
                                <label className='profile-image-label' htmlFor='file'>
                                    <ChangeArrowIcon classStyle='profile-image-input' />
                                </label>
                            </div>
                        }
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
                                <p>{sessionData.dateOfBirthday}</p>
                            </div>
                        </div>
                    </div>
                    <PasswordForm sessionData={sessionData} />
                </div>
            </div>
        } />
    )
}

export default Profile;
