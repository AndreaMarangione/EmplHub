import React, { useEffect } from 'react';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import ChangeArrowIcon from '../components/icons/ChangeArrowIcon/ChangeArrowIcon';
import AxiosApi from '../class/axiosApi';
import './css/profile.css';

const Profile = () => {
    const api = new AxiosApi();
    const { sessionData } = useSession();
    const handleImage = async (e) => {
        const image = e.target.files[0];
        const data = new FormData();
        data.append('profileImage', image);
        try {
            const response = await api.patch('/profile/image',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            // if (response.statusText) {
            //     localStorage.setItem('token', JSON.stringify(response.data));
            //     navigate('/');
            // }
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <MainLayout childrens={
            <div className='profile-container d-flex align-items-center justify-content-center'>
                <div className='profile d-flex flex-column flex-md-row 
                align-items-center justify-content-md-around gap-4 gap-md-5 mt-4'>
                    <div className='d-flex flex-column align-items-center gap-3'>
                        <div className='profile-image-container'>
                            <img className='profile-image' src={sessionData.avatar} alt="profile-image" />
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
                    <form className='change-password-container d-flex flex-column gap-3 align-self-md-end'>
                        <div className='change-password-title d-flex justify-content-center'>
                            <h4>Change your password</h4>
                        </div>
                        <div className='d-flex flex-column justify-content-center gap-1'>
                            <label>Password</label>
                            <input type="password" required />
                        </div>
                        <div className='d-flex flex-column justify-content-center gap-1'>
                            <label>New Password</label>
                            <input type="password" required />
                        </div>
                        <div className='d-flex flex-column justify-content-center gap-1'>
                            <label>Confirm Password</label>
                            <input type="password" required />
                        </div>
                        <button className='mt-2' type='submit'>Set Password</button>
                    </form>
                </div>
            </div>
        } />
    )
}

export default Profile;
