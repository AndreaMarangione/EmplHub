import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from '../redux/sessionSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import AxiosApi from '../class/axiosApi';
import CloseIcon from '../components/icons/CloseIcon/CloseIcon';
import MyDatePicker from '../components/MyDatePicker/MyDatePicker';
import './css/modifyEmployee.css';

const ModifyEmployee = () => {
    const [params] = useSearchParams();
    const id = params.get('id');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { session } = useSession();
    const api = new AxiosApi();
    const [dateValue, setDateValue] = useState(null);
    const [waitingLoader, setWaitingLoader] = useState(true);
    const [modifyLoader, setModifyLoader] = useState(false);
    const [form, setForm] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [serverRes, setServerRes] = useState('');
    const handleWaitingLoader = (command) => {
        setWaitingLoader(command);
    }
    const handleModifyLoader = (command) => {
        setModifyLoader(command);
    }
    const navigateToEmployee = () => {
        navigate('/employees');
    }
    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleEmail = () => {
        if (form.name && form.surname) {
            const name = form.name.slice(0, 1);
            const surname = form.surname;
            setEmailValue(`${name.toLowerCase()}.${surname.toLowerCase()}@emplhub.com`);
        }
    }
    const getEmployee = async () => {
        try {
            const response = await api.get(`/employee/${id}`);
            if (response.statusText) {
                const year = response.data.dateOfBirthday.slice(6, 10);
                const month = response.data.dateOfBirthday.slice(3, 5);
                const day = response.data.dateOfBirthday.slice(0, 2);
                setDateValue(`${month}/${day}/${year}`);
                setForm({
                    avatar: response.data.avatar,
                    name: response.data.name,
                    surname: response.data.surname,
                    email: response.data.email,
                    dateOfBirthday: response.data.dateOfBirthday
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
        let dateOfBirthday = '';
        let body = {};
        if (typeof dateValue === 'object') {
            let day = dateValue.getDate();
            let month = dateValue.getMonth() + 1;
            if (day < 10) {
                day = `0${day}`;
            }
            if (month < 10) {
                month = `0${month}`;
            }
            dateOfBirthday = `${day}/${month}/${dateValue.getFullYear()}`;
        } else {
            const year = dateValue.slice(6, 10);
            const month = dateValue.slice(3, 5);
            const day = dateValue.slice(0, 2);
            dateOfBirthday = `${month}/${day}/${year}`;
        }
        if (form && emailValue && dateValue) {
            body = {
                ...form,
                email: emailValue,
                dateOfBirthday
            }
        }
        handleModifyLoader(true);
        try {
            const response = await api.put(`/employee/modify/${id}`, body);
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
            getEmployee();
        }
        handleEmail();
        // eslint-disable-next-line
    }, [form]);
    return (
        <MainLayout childrens={
            <div className='pt-5 p-lg-5 d-flex justify-content-center'>
                <div className='modify-employee-container'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3 className='modify-employee-title m-0'>Modify Employee</h3>
                        <CloseIcon
                            onClick={navigateToEmployee}
                            classStyle='modify-employee-close' />
                    </div>
                    {waitingLoader ?
                        <span className="waiting-employee-loader"></span>
                        :
                        <form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
                            <img className='modify-employee-img mx-auto' src={form.avatar} alt="profile" />
                            <div className='d-flex flex-column justify-content-center gap-1'>
                                <label className='text-muted'>Name</label>
                                <input
                                    onChange={handleForm}
                                    defaultValue={form.name}
                                    className='modify-employee-input'
                                    type="text"
                                    name='name'
                                    required />
                            </div>
                            <div className='d-flex flex-column justify-content-center gap-1'>
                                <label className='text-muted'>Surname</label>
                                <input
                                    onChange={handleForm}
                                    defaultValue={form.surname}
                                    className='modify-employee-input'
                                    type="text"
                                    name='surname'
                                    required />
                            </div>
                            <div className='d-flex flex-column justify-content-center gap-1'>
                                <label className='text-muted'>Email</label>
                                <input
                                    value={emailValue}
                                    className='modify-employee-input'
                                    type="email"
                                    name='email'
                                    required
                                    disabled />
                            </div>
                            <div className='d-flex flex-column justify-content-center gap-1'>
                                <label className='text-muted'>Date of Birthday</label>
                                <MyDatePicker
                                    classStyle='modify-employee-date'
                                    value={dateValue}
                                    setValue={setDateValue} />
                            </div>
                            <button
                                className='modify-employee-btn mt-2 d-flex justify-content-center align-items-center'
                                type='submit'>
                                {modifyLoader ?
                                    <span className="modify-employee-loader"></span>
                                    :
                                    'Modify'
                                }
                            </button>
                            {serverRes ?
                                <h4 className='modify-employee-response'>{serverRes}</h4>
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
