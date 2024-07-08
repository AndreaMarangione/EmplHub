import React from 'react';
import passwordAlertImg from '../../assets/password-alert.png';
import './passwordAlert.css';

const PasswordAlert = ({ handlePassForm }) => {
    return (
        <div
            className='passwordAlert-container d-flex flex-column align-items-center justify-content-center gap-2'>
            <img
                className='passwordAlert-img'
                src={passwordAlertImg}
                alt="password-alert" />
            <h5
                className='m-0'>
                Change your password
            </h5>
            <p
                className='m-0'>
                You still have the default password set, please change it
                to keep your account safe
            </p>
            <button
                onClick={handlePassForm}
                className='passwordAlert-btn'>
                Change
            </button>
        </div>
    )
}

export default PasswordAlert;
