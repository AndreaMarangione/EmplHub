import React, { useEffect, useState } from 'react';
import useWindowSize from '../../Hooks/useWindowsSize';
import AxiosApi from '../../class/axiosApi';
import { useDispatch } from "react-redux";
import { logout } from '../../redux/sessionSlice';
import ServerResponse from '../ServerResponse/ServerResponse';
import './passwordForm.css';

const PasswordForm = ({ clicked, onMouseDown }) => {
    const api = new AxiosApi();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        password: '',
        newPassword: '',
        checkNew: ''
    });
    const [serverRes, setServerRes] = useState({ status: 0, message: '' });
    const [loader, setLoader] = useState(false);
    const { width } = useWindowSize();
    const show = clicked || width <= 768;
    const closeForm = serverRes.status < 300 && serverRes.status > 0 ? null : onMouseDown;
    const handleLoader = (command) => {
        setLoader(command);
    }
    const handleLogout = () => {
        dispatch(logout());
    }
    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerRes({ status: 0, message: '' });
        handleLoader(true);
        try {
            const response = await api.patch('/profile/password', form);
            if (response.statusText) {
                setServerRes({
                    status: response.data.status,
                    message: response.data.message
                });
                localStorage.removeItem('token');
            }
        } catch (error) {
            setServerRes({
                status: error.response.data.status,
                message: error.response.data.message
            });
        } finally {
            handleLoader(false);
        }
    }
    useEffect(() => {
        setForm({
            password: '',
            newPassword: '',
            checkNew: ''
        });
        setServerRes({ status: 0, message: '' });
    }, [show])
    return (
        <>
            {serverRes.status > 299 || !serverRes.message ?
                <>
                    <form onSubmit={handleSubmit} className={`${show ? 'change-password-container d-flex flex-column gap-3 align-self-md-end' : 'hide'}`}>
                        <div className='change-password-title d-flex justify-content-center'>
                            <h4 className='text-muted'>Change your password</h4>
                        </div>
                        <div className='d-flex flex-column justify-content-center gap-1'>
                            <label className='text-muted'>Old Password</label>
                            <input
                                value={form.password}
                                onChange={handleForm}
                                type="password"
                                name='password'
                                required />
                        </div>
                        <div className='d-flex flex-column justify-content-center gap-1'>
                            <label className='text-muted'>New Password (min. 6 characters)</label>
                            <input
                                value={form.newPassword}
                                onChange={handleForm}
                                type="password"
                                name='newPassword'
                                required />
                        </div>
                        <div className='d-flex flex-column justify-content-center gap-1'>
                            <label className='text-muted'>Confirm Password</label>
                            <input
                                value={form.checkNew}
                                onChange={handleForm}
                                type="password"
                                name='checkNew'
                                required />
                        </div>
                        <button
                            className='mt-2 d-flex justify-content-center align-items-center text-muted'
                            type='submit'>
                            {loader ?
                                <span className="loader-password"></span>
                                :
                                'Set Password'
                            }
                        </button>
                    </form>
                    {serverRes.status > 299 && show ?
                        <div className='change-password-error-container d-flex flex-column justify-content-between align-items-center gap-3'>
                            <ServerResponse
                                statusCode={serverRes.status}
                                text={serverRes.message} />
                        </div>
                        :
                        null
                    }
                </>
                :
                <div className='change-password-ok-container d-flex flex-column justify-content-between align-items-center gap-3'>
                    <ServerResponse
                        statusCode={serverRes.status}
                        text={serverRes.message} />
                    <p>Please login to your account again</p>
                    <button onClick={handleLogout}>Login Now</button>
                </div>
            }
            <div
                onMouseDown={closeForm}
                className={`change-password-background ${show ? '' : 'hide'}`}>
            </div>
        </>
    )
}

export default PasswordForm;
