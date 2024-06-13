import React from 'react';
import './css/login.css';
import EmailIcon from '../components/EmailIcon/EmailIcon';
import LockIcon from '../components/LockIcon/LockIcon';

const Login = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-8 sidebar-container">
                    sidebar
                </div>
                <div className="col-4 login-container d-flex align-items-center justify-content-center">
                    <div className="login">
                        <h3 className=''>Welcome</h3>
                        <p className='mb-5'>Please log in with your credentials</p>
                        <form className='form-login d-flex flex-column gap-3'>
                            <div className='position-relative'>
                                <EmailIcon classStyle='icon' />
                                <input className='input' type="email" placeholder='Email Address' />
                            </div>
                            <div className="position-relative">
                                <LockIcon classStyle='icon' />
                                <input className='input' type="password" placeholder='Password' />
                            </div>
                            <button className='btn-login' type='submit'>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
