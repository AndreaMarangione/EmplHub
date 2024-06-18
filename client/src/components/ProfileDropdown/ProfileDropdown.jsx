import React, { useEffect, useState } from 'react';
import ChangeArrowIcon from '../icons/ChangeArrowIcon/ChangeArrowIcon';
import './profileDropdown.css';

const ProfileDropdown = ({ sessionData, classStyle, onChange, onClick }) => {
    return (
        <div className={classStyle}>
            <div className='dropdown-arrow' />
            <div className='d-flex flex-column align-items-center gap-3'>
                <div className='dropdown-image-container'>
                    <img className='dropdown-image' src={sessionData.avatar} alt="profile-image" />
                    <input
                        onChange={onChange}
                        className='dropdown-change-image'
                        type="file"
                        id="file"
                        name='profileImage'
                    />
                    <label className='dropdown-image-label' htmlFor='file'>
                        <ChangeArrowIcon classStyle='dropdown-image-input' />
                    </label>
                </div>
                <div>
                    <div className='dropdown-profile-data'>
                        <label>Name</label>
                        <p>{sessionData.name}</p>
                    </div>
                    <div className='dropdown-profile-data'>
                        <label>Surname</label>
                        <p>{sessionData.surname}</p>
                    </div>
                    <div className='dropdown-profile-data'>
                        <label>Email</label>
                        <p>{sessionData.email}</p>
                    </div>
                    <div className='dropdown-profile-data'>
                        <label>Date of birthday</label>
                        <p>Data di nascita</p>
                    </div>
                </div>
                <p
                    onClick={onClick}
                    className='dropdown-profile-password'>
                    Change your password
                </p>
            </div>
        </div>
    )
}

export default ProfileDropdown;
