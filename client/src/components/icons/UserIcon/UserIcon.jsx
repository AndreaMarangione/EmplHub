import React from 'react';
import './userIcon.css';

const UserIcon = ({ sessionData, onClick }) => {
    return (
        <div className='user-container d-flex align-items-center gap-2 gap-lg-4'
            onClick={onClick}>
            <div className='avatar-container'>
                <img src={sessionData.avatar} alt="user-avatar-image" />
            </div>
            <span className='user-name'>{sessionData.name}</span>
        </div>
    )
}

export default UserIcon;
