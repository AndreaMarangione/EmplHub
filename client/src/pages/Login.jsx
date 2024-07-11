import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWindowSize from '../Hooks/useWindowsSize';
import LoginForm from '../components/LoginForm/LoginForm';
import AxiosApi from '../class/axiosApi';
import Logo from '../components/Logo/Logo';
import './css/login.css';

const Login = () => {
    const { width } = useWindowSize();
    const navigate = useNavigate();
    const api = new AxiosApi();
    const [form, setForm] = useState({});
    const [serverRes, setServerRes] = useState('');
    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', form);
            if (response.statusText) {
                localStorage.setItem('token', JSON.stringify(response.data));
                navigate('/');
            }
        } catch (error) {
            setServerRes(error.response.data.message);
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-lg-8 header-container d-flex flex-column align-items-center justify-content-center">
                    {width <= 768 ?
                        <>
                            <div className='login-logo-container d-flex flex-column mb-auto mt-5'>
                                <Logo className='login-logo' />
                            </div>
                            <LoginForm onChange={handleForm} onSubmit={submitForm} />
                            <div className='login-response'>{serverRes}</div>
                        </>
                        :
                        <Logo className='login-logo' />
                    }
                </div>
                {width > 768 ?
                    <div className="col-4 login-container d-flex flex-column align-items-center justify-content-center">
                        <LoginForm onChange={handleForm} onSubmit={submitForm} />
                        {serverRes ?
                            <div className='login-response'>{serverRes}</div>
                            :
                            <div className='login-response'></div>
                        }
                    </div>
                    : null}
            </div>
        </div>
    )
}

export default Login;
