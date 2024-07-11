import React from 'react';
import useWindowSize from '../../../Hooks/useWindowsSize';
import './userIcon.css';

const UserIcon = ({ sessionData, onClick }) => {
    const { width } = useWindowSize();
    return (
        <div className='user-container d-flex align-items-center gap-2 gap-lg-4'
            onClick={onClick}>
            <div className='avatar-container'>
                <img src={sessionData.avatar} alt="user-avatar-image" />
            </div>
            {width <= 768 ? <span className='user-name'>{sessionData.name}</span> : null}
        </div>
    )
}

export default UserIcon;
