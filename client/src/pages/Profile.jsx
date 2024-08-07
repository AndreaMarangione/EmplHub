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
    const [serverRes, setServerRes] = useState('');
    const handleShowLoader = (command) => {
        setShowLoader(command);
    }
    const handleImage = async (e) => {
        setServerRes({ status: 0, message: '' });
        const image = e.target.files[0];
        if (image.size > 2500000) {
            return setServerRes({ status: 400, message: 'Size of 2.5mb exceeded' });
        }
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
                    <div className='d-flex flex-column align-items-center gap-3 position-relative'>
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
                        {serverRes ?
                            <div className='profile-image-error'>{serverRes.message}</div>
                            :
                            null
                        }
                        <div>
                            <div className='profile-data'>
                                <label>Name</label>
                                <p className='text-muted'>{sessionData.name}</p>
                            </div>
                            <div className='profile-data'>
                                <label>Surname</label>
                                <p className='text-muted'>{sessionData.surname}</p>
                            </div>
                            <div className='profile-data'>
                                <label>Email</label>
                                <p className='text-muted'>{sessionData.email}</p>
                            </div>
                            <div className='profile-data'>
                                <label>Date of birthday</label>
                                <p className='text-muted'>{sessionData.dateOfBirthday}</p>
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
