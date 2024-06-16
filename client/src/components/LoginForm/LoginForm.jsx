import React from 'react';
import EmailIcon from '../icons/EmailIcon/EmailIcon';
import LockIcon from '../icons/LockIcon/LockIcon';
import './loginForm.css';

const LoginForm = ({ onChange, onSubmit }) => {
    return (
        <div className='form-container d-flex flex-column align-items-center justify-content-center align-items-lg-start'>
            <div>
                <h3 className=''>Welcome</h3>
                <p className='mb-5'>Please log in with your credentials</p>
            </div>
            <form onSubmit={onSubmit} className='form-size d-flex flex-column gap-3'>
                <div className='position-relative'>
                    <EmailIcon classStyle='icon' />
                    <input onChange={onChange} className='input' type="email" placeholder='Email Address' name='email' required />
                </div>
                <div className="position-relative">
                    <LockIcon classStyle='icon' />
                    <input onChange={onChange} className='input' type="password" placeholder='Password' name='password' required />
                </div>
                <button className='btn-login' type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm;
