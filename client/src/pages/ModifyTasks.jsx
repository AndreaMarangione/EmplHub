import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { login } from '../redux/sessionSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import AxiosApi from '../class/axiosApi';
import CloseIcon from '../components/icons/CloseIcon/CloseIcon';
import MyDatePicker from '../components/MyDatePicker/MyDatePicker';
import SingleSelect from '../components/SingleSelect/SingleSelect';
import MultiSelect from '../components/MultiSelect/MultiSelect';
import './css/modifyTasks.css';

const ModifyTask = () => {
    const [params] = useSearchParams();
    const id = params.get("id");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { session } = useSession();
    const api = new AxiosApi();
    const [form, setForm] = useState({});
    const [employees, setEmployees] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [priority, setPriority] = useState([]);
    const [defaultCustomer, setDefaultCustomer] = useState(undefined);
    const [defaultEmployees, setDefaultEmployees] = useState([]);
    const [defaultPriority, setDefaultPriority] = useState(undefined);
    const [defaultAmount, setDefaultAmount] = useState(undefined);
    const [waitingLoader, setWaitingLoader] = useState(true);
    const [modifyLoader, setModifyLoader] = useState(false);
    const [serverRes, setServerRes] = useState('');
    const [startDateValue, setStartDateValue] = useState(null);
    const [endDateValue, setEndDateValue] = useState(null);
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
                customerId: e.value
            })
            setDefaultCustomer({
                value: e.value,
                label: e.label
            })
        } else {
            setDefaultCustomer(undefined);
            delete form.customerId;
        }
    }
    const handleEmployeeSelect = (e) => {
        if (e) {
            const data = e.map(option => option.value);
            setForm({
                ...form,
                employeeId: data
            })
            setDefaultEmployees(e);
        } else {
            setDefaultEmployees([]);
            delete form.employeeId;
        }
    }
    const handlePrioritySelect = (e) => {
        if (e) {
            setForm({
                ...form,
                priority: e.value
            })
            setDefaultPriority({
                value: e.value,
                label: e.label
            })
        } else {
            setDefaultPriority(undefined);
            delete form.priority;
        }
    }
    const getTask = async () => {
        try {
            const response = await api.get(`/task/${id}`);
            if (response.statusText) {
                const startYear = response.data.start.slice(6, 10);
                const startMonth = response.data.start.slice(3, 5);
                const startDay = response.data.start.slice(0, 2);
                setStartDateValue(`${startMonth}/${startDay}/${startYear}`);
                const endYear = response.data.end.slice(6, 10);
                const endMonth = response.data.end.slice(3, 5);
                const endDay = response.data.end.slice(0, 2);
                setEndDateValue(`${endMonth}/${endDay}/${endYear}`);
                setDefaultCustomer({
                    value: response.data.customerId._id,
                    label: response.data.customerId.name
                })
                setDefaultEmployees(
                    response.data.employeeId.map(employee => {
                        return {
                            value: employee._id,
                            label: `${employee.name} ${employee.surname}`
                        }
                    }))
                setDefaultPriority({
                    value: response.data.priority,
                    label: response.data.priority
                })
                setDefaultAmount(response.data.amount.total);
                setForm({
                    title: response.data.title,
                    description: response.data.description,
                    customerId: response.data.customerId._id,
                    employeeId: response.data.employeeId.map(employee => employee._id),
                    end: response.data.end,
                    priority: response.data.priority,
                    amount: response.data.amount.total
                });
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
        handleModifyLoader(true);
        let start = '';
        let end = '';
        if (typeof startDateValue === 'object') {
            let day = startDateValue.getDate();
            let month = startDateValue.getMonth() + 1;
            if (day < 10) {
                day = `0${day}`;
            }
            if (month < 10) {
                month = `0${month}`;
            }
            start = `${day}/${month}/${startDateValue.getFullYear()}`;
        } else {
            const year = startDateValue.slice(6, 10);
            const month = startDateValue.slice(3, 5);
            const day = startDateValue.slice(0, 2);
            start = `${month}/${day}/${year}`;
        }
        if (typeof endDateValue === 'object') {
            let day = endDateValue.getDate();
            let month = endDateValue.getMonth() + 1;
            if (day < 10) {
                day = `0${day}`;
            }
            if (month < 10) {
                month = `0${month}`;
            }
            end = `${day}/${month}/${endDateValue.getFullYear()}`;
        } else {
            const year = endDateValue.slice(6, 10);
            const month = endDateValue.slice(3, 5);
            const day = endDateValue.slice(0, 2);
            end = `${month}/${day}/${year}`;
        }
        const body = {
            ...form,
            start,
            end
        }
        try {
            const response = await api.put(`/task/modify/${id}`, body);
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
        if (session) {
            dispatch(login(session));
        }
        getTask();
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
                    {waitingLoader ?
                        <span className="waiting-task-loader"></span>
                        :
                        <form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
                            <div className='d-flex flex-column justify-content-center gap-1'>
                                <label className='text-muted'>Title</label>
                                <input
                                    onChange={handleFormInput}
                                    defaultValue={form.title}
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
                                        value={defaultCustomer}
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
                                        value={defaultEmployees}
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
                                        value={defaultPriority}
                                    />
                                </div>
                                <div className='w-100 d-flex flex-column justify-content-center gap-1'>
                                    <label className='text-muted'>Start</label>
                                    <MyDatePicker
                                        classStyle='modify-task-input w-100'
                                        value={startDateValue}
                                        setValue={setStartDateValue} />
                                </div>
                                <div className='w-100 d-flex flex-column justify-content-center gap-1'>
                                    <label className='text-muted'>End</label>
                                    <MyDatePicker
                                        classStyle='modify-task-input w-100'
                                        value={endDateValue}
                                        setValue={setEndDateValue} />
                                </div>
                                <div className='w-100 d-flex flex-column justify-content-center gap-1'>
                                    <label className='text-muted'>Amount</label>
                                    <div className='position-relative'>
                                        <span className='modify-task-amount-icon text-muted'>€</span>
                                        <input
                                            onChange={handleFormInput}
                                            defaultValue={defaultAmount}
                                            className='modify-task-input ps-4 w-100'
                                            type="text"
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
                                    defaultValue={form.description}
                                    className='modify-task-text'
                                    type="text"
                                    name='description'
                                    required />
                            </div>
                            <button
                                className='modify-task-btn mt-2 d-flex justify-content-center align-items-center'
                                type='submit'>
                                {modifyLoader ?
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
                    }
                </div>
            </div>
        } />
    )
}

export default ModifyTask;
