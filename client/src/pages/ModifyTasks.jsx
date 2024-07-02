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
import './css/modifyTasks.css';

const ModifyTask = () => {
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { session } = useSession();
    const api = new AxiosApi();
    const [task, setTask] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [priority, setPriority] = useState([]);
    const [form, setForm] = useState({});
    const [waitingLoader, setWaitingLoader] = useState(true);
    const [modifyLoader, setModifyLoader] = useState(false);
    const [serverRes, setServerRes] = useState('');
    const [dateValue, setDateValue] = useState(null);
    const handleWaitingLoader = command => setWaitingLoader(command);
    const handleModifyLoader = command => setModifyLoader(command);
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
                customerId: e.value.toLowerCase()
            })
        } else {
            delete form.customerId;
        }
    }
    const handleEmployeeSelect = (e) => {
        if (e) {
            const data = e.map(option => option.value.toLowerCase())
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
    const getTask = async () => {
        try {
            const response = await api.get(`/task/${id}`);
            if (response.statusText) {
                const year = response.data.createdAt.slice(6, 10);
                const month = response.data.createdAt.slice(3, 5);
                const day = response.data.createdAt.slice(0, 2);
                setDateValue(`${month}/${day}/${year}`);
                setTask(response.data);
            }
        } catch (error) {
            console.error(error.response.data);
        } finally {
            handleWaitingLoader(false);
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
        let body = {};
        if (form && dateValue) {
            let day = dateValue.getDate();
            let month = dateValue.getMonth() + 1;
            if (day < 10) {
                day = `0${day}`;
            }
            if (month < 10) {
                month = `0${month}`;
            }
            const end = `${day}/${month}/${dateValue.getFullYear()}`
            body = {
                ...form,
                end
            }
        }
        try {
            const response = await api.post('/task/modify', body);
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
        dispatch(login(session));
        getEmployee();
        getCustomer();
        handlePriority();
        // eslint-disable-next-line
    }, []);
    return (
        <MainLayout childrens={
            <div className='p-5 d-flex justify-content-center'>
                <div className='modify-task-container'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3 className='modify-task-title m-0'>Modify Task</h3>
                        <CloseIcon
                            onClick={navigateToTasks}
                            classStyle='modify-task-close' />
                    </div>
                    <form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
                        <div className='d-flex flex-column justify-content-center gap-1'>
                            <label className='text-muted'>Title</label>
                            <input
                                onChange={handleFormInput}
                                className='modify-task-input'
                                type="text"
                                name='title'
                                required />
                        </div>
                        <div className='d-flex flex-column flex-md-row justify-content-between gap-3'>
                            <div className='w-100 d-flex flex-column justify-content-center align-self-start gap-1'>
                                <label className='text-muted'>Customer</label>
                                <SingleSelect
                                    classStyle='modify-task-input'
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
                                    classStyle='modify-task-multi'
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
                                    classStyle='modify-task-input'
                                    onChange={handlePrioritySelect}
                                    isClearable={true}
                                    isDisabled={false}
                                    options={priority}
                                />
                            </div>
                            <div className='w-100 d-flex flex-column justify-content-center gap-1'>
                                <label className='text-muted'>Dead Line</label>
                                <MyDatePicker
                                    classStyle='modify-task-input w-100'
                                    value={dateValue}
                                    setValue={setDateValue} />
                            </div>
                            <div className='w-100 d-flex flex-column justify-content-center gap-1'>
                                <label className='text-muted'>Amount</label>
                                <div className='position-relative'>
                                    <span className='modify-task-amount-icon text-muted'>€</span>
                                    <input
                                        onChange={handleFormInput}
                                        defaultValue='0'
                                        className='modify-task-input ps-4 w-100'
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
                                className='modify-task-text'
                                type="text"
                                name='description'
                                required />
                        </div>
                        <button
                            className='modify-task-btn mt-2 d-flex justify-content-center align-items-center'
                            type='submit'>
                            {loader ?
                                <span className="modify-task-loader"></span>
                                :
                                'Save'
                            }
                        </button>
                        {serverRes ?
                            <h4 className='modify-task-response'>{serverRes}</h4>
                            :
                            null
                        }
                    </form>
                </div>
            </div>
        } />
    )
}

export default ModifyTask;
