import React, { useState } from 'react';
import useWindowSize from '../../Hooks/useWindowsSize';
import AxiosApi from '../../class/axiosApi';
import OkIcon from '../icons/OkIcon/OkIcon';
import { useDispatch } from "react-redux";
import { logout } from '../../redux/sessionSlice';
import './passwordForm.css';

const PasswordForm = ({ clicked, onMouseDown }) => {
    const api = new AxiosApi();
    const dispatch = useDispatch();
    const [form, setForm] = useState({});
    const [serverRes, setServerRes] = useState('');
    const [loader, setLoader] = useState(false);
    const { width } = useWindowSize();
    const show = clicked || width <= 768;
    const closeForm = serverRes ? null : onMouseDown;
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
        handleLoader(true);
        try {
            const response = await api.patch('/profile/password', form);
            if (response.statusText) {
                setServerRes(response.data);
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error(error.response.data);
        } finally {
            handleLoader(false);
        }
    }
    return (
        <>
            {!serverRes ?
                <form onSubmit={handleSubmit} className={`${show ? 'change-password-container d-flex flex-column gap-3 align-self-md-end' : 'hide'}`}>
                    <div className='change-password-title d-flex justify-content-center'>
                        <h4>Change your password</h4>
                    </div>
                    <div className='d-flex flex-column justify-content-center gap-1'>
                        <label>Password</label>
                        <input onChange={handleForm} type="password" name='password' required />
                    </div>
                    <div className='d-flex flex-column justify-content-center gap-1'>
                        <label>New Password</label>
                        <input onChange={handleForm} type="password" name='newPassword' required />
                    </div>
                    <div className='d-flex flex-column justify-content-center gap-1'>
                        <label>Confirm Password</label>
                        <input onChange={handleForm} type="password" name='checkNew' required />
                    </div>
                    <button
                        className='mt-2 d-flex justify-content-center align-items-center'
                        type='submit'>
                        {loader ?
                            <span className="loader-password"></span>
                            :
                            'Set Password'
                        }
                    </button>
                </form>
                :
                <div className='change-password-ok-container d-flex flex-column justify-content-between align-items-center gap-3 z-1'>
                    <OkIcon classStyle='change-password-ok' />
                    <h3 className='text-center'>{serverRes}!</h3>
                    <p className='text-muted'>Please login to your account again</p>
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
