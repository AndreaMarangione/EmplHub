import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from '../redux/sessionSlice';
import { useNavigate } from 'react-router-dom';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import AxiosApi from '../class/axiosApi';
import CloseIcon from '../components/icons/CloseIcon/CloseIcon';
import './css/modifyCustomer.css';

const ModifyEmployee = () => {
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { session } = useSession();
    const api = new AxiosApi();
    const [waitingLoader, setWaitingLoader] = useState(true);
    const [modifyLoader, setModifyLoader] = useState(false);
    const [form, setForm] = useState('');
    const [serverRes, setServerRes] = useState('');
    const handleWaitingLoader = command => setWaitingLoader(command);
    const handleModifyLoader = command => setModifyLoader(command);
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
                setForm({
                    logo: response.data.logo,
                    name: response.data.name,
                    email: response.data.email,
                    since: response.data.createdAt
                });
            }
        } catch (error) {
            console.error(error.response.data);
        } finally {
            handleWaitingLoader(false);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        handleModifyLoader(true);
        try {
            const response = await api.put(`/customer/modify/${id}`, form);
            if (response.statusText) {
                setServerRes(response.data.message);
            }
        } catch (error) {
            console.error(error.response.data);
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
            <div className='p-5 d-flex justify-content-center'>
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
                            <img className='modify-customer-img mx-auto' src={form.logo} alt="customer" />
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
                                <h4 className='modify-customer-response'>{serverRes}</h4>
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
