import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWindowSize from '../Hooks/useWindowsSize';
import LoginForm from '../components/LoginForm/LoginForm';
import AxiosApi from '../class/axiosApi';
import './css/login.css';

const Login = () => {
    const { width } = useWindowSize();
    const navigate = useNavogate();
    const api = new AxiosApi();
    const [form, setForm] = useState({});
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
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-lg-8 sidebar-container d-flex align-items-center justify-content-center">
                    {width <= 768 ? <LoginForm /> : null}
                </div>
                {width > 768 ?
                    <div className="col-4 login-container d-flex align-items-center justify-content-center">
                        <LoginForm onChange={handleForm} onSubmit={submitForm} />
                    </div>
                    : null}
            </div>
        </div>
    )
}

export default Login;
