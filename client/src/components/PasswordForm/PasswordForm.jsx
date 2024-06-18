import React from 'react';
import './passwordForm.css';

const PasswordForm = ({ clicked, onMouseDown }) => {
    return (
        <>
            <form className={`${clicked ? 'change-password-container d-flex flex-column gap-3 align-self-md-end z-1 ' : 'hide'}`}>
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
            <div
                onMouseDown={onMouseDown}
                className={`change-password-background ${clicked ? '' : 'hide'}`}>
            </div>
        </>
    )
}

export default PasswordForm;
