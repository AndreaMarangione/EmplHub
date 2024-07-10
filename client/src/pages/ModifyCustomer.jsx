import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from '../redux/sessionSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import AxiosApi from '../class/axiosApi';
import CloseIcon from '../components/icons/CloseIcon/CloseIcon';
import ChangeArrowIcon from '../components/icons/ChangeArrowIcon/ChangeArrowIcon';
import ServerResponse from '../components/ServerResponse/ServerResponse';
import './css/modifyCustomer.css';

const ModifyEmployee = () => {
    const [params] = useSearchParams();
    const id = params.get("id");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { session } = useSession();
    const api = new AxiosApi();
    const [waitingLoader, setWaitingLoader] = useState(true);
    const [modifyLoader, setModifyLoader] = useState(false);
    const [logoLoader, setLogoLoader] = useState(false);
    const [form, setForm] = useState('');
    const [serverRes, setServerRes] = useState('');
    const handleWaitingLoader = command => setWaitingLoader(command);
    const handleModifyLoader = command => setModifyLoader(command);
    const handleLogoLoader = command => setLogoLoader(command);
    const navigateToCustomer = () => navigate('/customers');
    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const getCustomer = async () => {
        try {
            const response = await api.get(`/customer/${id}`);
            if (response.statusText) {
                const year = response.data.createdAt.slice(0, 4);
                const month = response.data.createdAt.slice(8, 10);
                const day = response.data.createdAt.slice(5, 7);
                setForm({
                    id: response.data._id,
                    logo: response.data.logo,
                    name: response.data.name,
                    email: response.data.email,
                    since: `${month}/${day}/${year}`
                });
            }
        } catch (error) {
            console.error(error.response.data);
        } finally {
            handleWaitingLoader(false);
        }
    }
    const handleLogo = async (e) => {
        setServerRes({ status: 0, message: '' });
        const logo = e.target.files[0];
        if (logo.size > 2500000) {
            return setServerRes({ status: 400, message: 'Maximum allowed size of 2.5mb exceeded' });
        }
        handleLogoLoader(true);
        const data = new FormData();
        data.append('customerModifyLogo', logo);
        try {
            const response = await api.patch(`/customer/logo/${form.id}`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            if (response.statusText) {
                setForm({
                    ...form,
                    logo: response.data.logo
                })
            }
        } catch (error) {
            setServerRes({
                status: error.response.data.status,
                message: error.response.data.message
            });
        } finally {
            handleLogoLoader(false);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        handleModifyLoader(true);
        try {
            const response = await api.put(`/customer/modify/${id}`, form);
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
            handleModifyLoader(false);
        }
    }
    useEffect(() => {
        dispatch(login(session));
        if (id && !form) {
            getCustomer();
        }
        // eslint-disable-next-line
    }, []);
    return (
        <MainLayout childrens={
            <div className='pt-5 p-lg-5 d-flex justify-content-center'>
                <div className='modify-customer-container'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3 className='modify-customer-title m-0'>Modify Customer</h3>
                        <CloseIcon
                            onClick={navigateToCustomer}
                            classStyle='modify-customer-close' />
                    </div>
                    {waitingLoader ?
                        <span className="waiting-customer-loader"></span>
                        :
                        <form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
                            <div className='d-flex justify-content-center align-items-center'>
                                <div className='modify-customer-img-container'>
                                    {logoLoader ?
                                        <div className='customer-logo-loader-container'>
                                            <span className="customer-logo-loader"></span>
                                        </div>
                                        :
                                        <>
                                            <img className='modify-customer-img' src={form.logo} alt="customer" />
                                            <input
                                                onChange={handleLogo}
                                                className='modify-customer-file'
                                                type="file"
                                                id="customerFile"
                                                name='customerLogo'
                                            />
                                            <label className='modify-customer-label' htmlFor='customerFile'>
                                                <ChangeArrowIcon classStyle='modify-customer-image-input' />
                                            </label>
                                        </>
                                    }
                                </div>
                            </div>
                            <div className='d-flex flex-column justify-content-center gap-1'>
                                <label className='text-muted'>Name</label>
                                <input
                                    onChange={handleForm}
                                    defaultValue={form.name}
                                    className='modify-customer-input'
                                    type="text"
                                    name='name'
                                    required />
                            </div>
                            <div className='d-flex flex-column justify-content-center gap-1'>
                                <label className='text-muted'>Email</label>
                                <input
                                    onChange={handleForm}
                                    defaultValue={form.email}
                                    className='modify-customer-input'
                                    type="email"
                                    name='email'
                                    required />
                            </div>
                            <div className='d-flex flex-column justify-content-center gap-1'>
                                <label className='text-muted'>Since</label>
                                <input
                                    defaultValue={form.since}
                                    className='modify-customer-input'
                                    type="text"
                                    name='since'
                                    required
                                    disabled />
                            </div>
                            <button
                                className='modify-customer-btn mt-2 d-flex justify-content-center align-items-center'
                                type='submit'>
                                {modifyLoader ?
                                    <span className="modify-customer-loader"></span>
                                    :
                                    'Modify'
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
                    }
                </div>
            </div>
        } />
    )
}

export default ModifyEmployee;
