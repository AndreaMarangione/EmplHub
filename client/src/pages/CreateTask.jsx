import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from '../redux/sessionSlice';
import { useNavigate } from 'react-router-dom';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import AxiosApi from '../class/axiosApi';
import CloseIcon from '../components/icons/CloseIcon/CloseIcon';
import MyDatePicker from '../components/MyDatePicker/MyDatePicker';
import SingleSelect from '../components/SingleSelect/SingleSelect';
import MultiSelect from '../components/MultiSelect/MultiSelect';
import './css/createTask.css';

const CreateTask = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { session } = useSession();
    const api = new AxiosApi();
    const [employees, setEmployees] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [priority, setPriority] = useState([]);
    const [form, setForm] = useState({});
    const [loader, setLoader] = useState(false);
    const [serverRes, setServerRes] = useState('');
    const [startDateValue, setStartDateValue] = useState(null);
    const [endDateValue, setEndDateValue] = useState(null);
    const handleLoader = command => setLoader(command);
    const navigateToTasks = () => navigate('/tasks');
    const handleFormInput = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleCustomerSelect = (e) => {
        if (e) {
            setForm({
                ...form,
                customerId: e.value
            })
        } else {
            delete form.customerId;
        }
    }
    const handleEmployeeSelect = (e) => {
        if (e) {
            const data = e.map(option => option.value)
            setForm({
                ...form,
                employeeId: data
            })
        } else {
            delete form.employeeId;
        }
    }
    const handlePrioritySelect = (e) => {
        if (e) {
            setForm({
                ...form,
                priority: e.value
            })
        } else {
            delete form.priority;
        }
    }
    const getEmployee = async () => {
        try {
            const response = await api.get('/employee');
            if (response.statusText) {
                const data = response.data.map(employee => {
                    return {
                        value: employee._id,
                        label: `${employee.name} ${employee.surname}`
                    }
                })
                setEmployees(data);
            }
        } catch (error) {
            console.error(error.message);
        }
    }
    const getCustomer = async () => {
        try {
            const response = await api.get('/customer');
            if (response.statusText) {
                const data = response.data.map(customer => {
                    return {
                        value: customer._id,
                        label: customer.name
                    }
                })
                setCustomers(data);
            }
        } catch (error) {
            console.error(error.message);
        }
    }
    const handlePriority = () => {
        const data = ['High', 'Medium', 'Low'].map(prior => {
            return {
                value: prior,
                label: prior
            }
        })
        setPriority(data);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        handleLoader(true);
        let start = '';
        let end = '';
        if (startDateValue) {
            let day = startDateValue.getDate();
            let month = startDateValue.getMonth() + 1;
            if (day < 10) {
                day = `0${day}`;
            }
            if (month < 10) {
                month = `0${month}`;
            }
            start = `${day}/${month}/${startDateValue.getFullYear()}`;
        }
        if (endDateValue) {
            let day = endDateValue.getDate();
            let month = endDateValue.getMonth() + 1;
            if (day < 10) {
                day = `0${day}`;
            }
            if (month < 10) {
                month = `0${month}`;
            }
            end = `${day}/${month}/${endDateValue.getFullYear()}`;
        }
        const body = {
            ...form,
            start,
            end
        }
        try {
            const response = await api.post('/task/create', body);
            if (response.statusText) {
                setServerRes(response.data.message);
            }
        } catch (error) {
            console.error(error.response.data);
        } finally {
            handleLoader(false);
        }
    }
    useEffect(() => {
        if (session) {
            dispatch(login(session));
        }
        getEmployee();
        getCustomer();
        handlePriority();
        // eslint-disable-next-line
    }, []);
    return (
        <MainLayout childrens={
            <div className='pt-5 p-lg-5 d-flex justify-content-center'>
                <div className='create-task-container'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3 className='create-task-title m-0'>Create Task</h3>
                        <CloseIcon
                            onClick={navigateToTasks}
                            classStyle='create-task-close' />
                    </div>
                    <form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
                        <div className='d-flex flex-column justify-content-center gap-1'>
                            <label className='text-muted'>Title</label>
                            <input
                                onChange={handleFormInput}
                                className='create-task-input'
                                type="text"
                                name='title'
                                required />
                        </div>
                        <div className='d-flex flex-column flex-md-row justify-content-between gap-3'>
                            <div className='w-100 d-flex flex-column justify-content-center align-self-start gap-1'>
                                <label className='text-muted'>Customer</label>
                                <SingleSelect
                                    classStyle='create-task-input'
                                    onChange={handleCustomerSelect}
                                    isClearable={true}
                                    isDisabled={false}
                                    isSearchable={true}
                                    options={customers}
                                />
                            </div>
                            <div className='w-100 d-flex flex-column justify-content-center gap-1'>
                                <label className='text-muted'>Employee</label>
                                <MultiSelect
                                    classStyle='create-task-multi'
                                    onChange={handleEmployeeSelect}
                                    isClearable={true}
                                    isDisabled={false}
                                    isSearchable={true}
                                    options={employees}
                                />
                            </div>
                        </div>
                        <div className='d-flex flex-column flex-md-row justify-content-between gap-3'>
                            <div className='w-100 d-flex flex-column justify-content-center gap-1'>
                                <label className='text-muted'>Priority</label>
                                <SingleSelect
                                    classStyle='create-task-input'
                                    onChange={handlePrioritySelect}
                                    isClearable={true}
                                    isDisabled={false}
                                    options={priority}
                                />
                            </div>
                            <div className='w-100 d-flex flex-column justify-content-center gap-1'>
                                <label className='text-muted'>Start</label>
                                <MyDatePicker
                                    classStyle='create-task-input w-100'
                                    value={startDateValue}
                                    setValue={setStartDateValue} />
                            </div>
                            <div className='w-100 d-flex flex-column justify-content-center gap-1'>
                                <label className='text-muted'>End</label>
                                <MyDatePicker
                                    classStyle='create-task-input w-100'
                                    value={endDateValue}
                                    setValue={setEndDateValue} />
                            </div>
                            <div className='w-100 d-flex flex-column justify-content-center gap-1'>
                                <label className='text-muted'>Amount</label>
                                <div className='position-relative'>
                                    <span className='create-task-amount-icon text-muted'>€</span>
                                    <input
                                        onChange={handleFormInput}
                                        defaultValue='0'
                                        className='create-task-input ps-4 w-100'
                                        type="number"
                                        name='amount'
                                        step='0.01'
                                        min='0'
                                        required />
                                </div>
                            </div>
                        </div>
                        <div className='d-flex flex-column justify-content-center gap-1'>
                            <label className='text-muted'>Description</label>
                            <textarea
                                onChange={handleFormInput}
                                className='create-task-text'
                                type="text"
                                name='description'
                                required />
                        </div>
                        <button
                            className='create-task-btn mt-2 d-flex justify-content-center align-items-center'
                            type='submit'>
                            {loader ?
                                <span className="create-task-loader"></span>
                                :
                                'Save'
                            }
                        </button>
                        {serverRes ?
                            <h4 className='create-task-response'>{serverRes}</h4>
                            :
                            null
                        }
                    </form>
                </div>
            </div>
        } />
    )
}

export default CreateTask;
