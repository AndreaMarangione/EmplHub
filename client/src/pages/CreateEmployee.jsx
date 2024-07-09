import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from '../redux/sessionSlice';
import { useNavigate } from 'react-router-dom';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import AxiosApi from '../class/axiosApi';
import CloseIcon from '../components/icons/CloseIcon/CloseIcon';
import MyDatePicker from '../components/MyDatePicker/MyDatePicker';
import ServerResponse from '../components/ServerResponse/ServerResponse';
import './css/createEmployee.css';

const CreateEmployee = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { session } = useSession();
    const api = new AxiosApi();
    const [dateValue, setDateValue] = useState(null);
    const [form, setForm] = useState({});
    const [emailValue, setEmailValue] = useState('');
    const [loader, setLoader] = useState(false);
    const [serverRes, setServerRes] = useState('');
    const handleLoader = (command) => {
        setLoader(command);
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        let body = {};
        if (form && emailValue && dateValue) {
            let day = dateValue.getDate();
            let month = dateValue.getMonth() + 1;
            if (day < 10) {
                day = `0${day}`;
            }
            if (month < 10) {
                month = `0${month}`;
            }
            const dateOfBirthday = `${day}/${month}/${dateValue.getFullYear()}`
            body = {
                ...form,
                email: emailValue,
                dateOfBirthday
            }
        }
        handleLoader(true);
        try {
            const response = await api.post('/employee/register', body);
            if (response.statusText) {
                setServerRes(response.data);
            }
        } catch (error) {
            setServerRes(error.response.data);
        } finally {
            handleLoader(false);
        }
    }
    useEffect(() => {
        if (session) {
            dispatch(login(session));
        }
        handleEmail();
        // eslint-disable-next-line
    }, [form]);
    return (
        <MainLayout childrens={
            <div className='pt-5 p-lg-5 d-flex justify-content-center'>
                <div className='create-employee-container'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3 className='create-employee-title m-0'>Create Employee</h3>
                        <CloseIcon
                            onClick={navigateToEmployee}
                            classStyle='create-employee-close' />
                    </div>
                    <form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
                        <div className='d-flex flex-column justify-content-center gap-1'>
                            <label className='text-muted'>Name</label>
                            <input
                                onChange={handleForm}
                                className='create-employee-input'
                                type="text"
                                name='name'
                                required />
                        </div>
                        <div className='d-flex flex-column justify-content-center gap-1'>
                            <label className='text-muted'>Surname</label>
                            <input
                                onChange={handleForm}
                                className='create-employee-input'
                                type="text"
                                name='surname'
                                required />
                        </div>
                        <div className='d-flex flex-column justify-content-center gap-1'>
                            <label className='text-muted'>Email</label>
                            <input
                                className='create-employee-input'
                                type="email"
                                name='email'
                                value={emailValue}
                                required
                                disabled />
                        </div>
                        <div className='d-flex flex-column justify-content-center gap-1'>
                            <label className='text-muted'>Date of Birthday</label>
                            <MyDatePicker
                                classStyle='create-employee-date'
                                value={dateValue}
                                setValue={setDateValue} />
                        </div>
                        <button
                            className='create-employee-btn mt-2 d-flex justify-content-center align-items-center'
                            type='submit'>
                            {loader ?
                                <span className="create-employee-loader"></span>
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

export default CreateEmployee;
