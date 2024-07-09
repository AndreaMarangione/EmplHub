import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from '../redux/sessionSlice';
import { useNavigate } from 'react-router-dom';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import AxiosApi from '../class/axiosApi';
import CloseIcon from '../components/icons/CloseIcon/CloseIcon';
import ServerResponse from '../components/ServerResponse/ServerResponse';
import './css/createCustomer.css';

const CreateCustomer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { session } = useSession();
    const api = new AxiosApi();
    const [customerLogo, setCustomerLogo] = useState(null);
    const [form, setForm] = useState({});
    const [loader, setLoader] = useState(false);
    const [serverRes, setServerRes] = useState('');
    const handleLoader = command => setLoader(command);
    const navigateToCustomer = () => navigate('/customers');
    const reseLogo = () => {
        setCustomerLogo(null);
        const img = document.querySelector('#customerImg');
        img.src = '';
    }
    const handleLogo = (e) => {
        if (e.target.files[0]) {
            setCustomerLogo(e.target.files[0]);
            const file = new FileReader();
            file.readAsDataURL(e.target.files[0]);
            file.onload = function () {
                const img = document.querySelector('#customerImg');
                img.src = this.result
            }
        } else {
            reseLogo();
        }
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
        if (!customerLogo) {
            return setServerRes({
                status: 400,
                message: 'Please select a logo'
            });
        }
        handleLoader(true);
        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            data.append(key, value);
        })
        data.append('customerLogo', customerLogo);
        try {
            const response = await api.post('/customer/register',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            if (response.statusText) {
                setServerRes({
                    status: response.data.status,
                    message: response.data.message
                });
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
        if (session) {
            dispatch(login(session));
        }
        // eslint-disable-next-line
    }, []);
    return (
        <MainLayout childrens={
            <div className='pt-5 p-lg-5 d-flex justify-content-center'>
                <div className='create-customer-container'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3 className='create-customer-title m-0'>Create Customer</h3>
                        <CloseIcon
                            onClick={navigateToCustomer}
                            classStyle='create-customer-close' />
                    </div>
                    <form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
                        <div className='create-customer-logo-container mx-auto position-relative mb-4'>
                            {customerLogo ?
                                <>
                                    <img id='customerImg' alt="customer" />
                                    <span
                                        onClick={reseLogo}
                                        className='customerImg-reset'>
                                        Reset logo
                                    </span>
                                </>
                                :
                                'No logo selected'
                            }
                        </div>
                        <div className='d-flex flex-column justify-content-center gap-1'>
                            <label
                                className='create-customer-logo'
                                htmlFor='customerLogoInput'>
                                Select Logo
                            </label>
                            <input
                                id='customerLogoInput'
                                onChange={handleLogo}
                                className='create-customer-file'
                                type='file'
                                name='customerModifyLogo' />
                        </div>
                        <div className='d-flex flex-column justify-content-center gap-1'>
                            <label className='text-muted'>Name</label>
                            <input
                                onChange={handleForm}
                                className='create-customer-input'
                                type='text'
                                name='name'
                                required />
                        </div>
                        <div className='d-flex flex-column justify-content-center gap-1'>
                            <label className='text-muted'>Email</label>
                            <input
                                onChange={handleForm}
                                className='create-customer-input'
                                type='email'
                                name='email'
                                required />
                        </div>
                        <button
                            className='create-customer-btn mt-2 d-flex justify-content-center align-items-center'
                            type='submit'>
                            {loader ?
                                <span className="create-customer-loader"></span>
                                :
                                'Save'
                            }
                        </button>
                        {serverRes ?
                            <ServerResponse
                                statusCode={serverRes.status}
                                text={serverRes.message} />
                            :
                            null
                        }
                    </form>
                </div>
            </div>
        } />
    )
}

export default CreateCustomer;
