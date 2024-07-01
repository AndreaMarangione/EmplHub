import React, { useState, useEffect } from 'react';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import { useDispatch } from "react-redux";
import { login } from '../redux/sessionSlice';
import { useNavigate } from 'react-router-dom';
import AxiosApi from '../class/axiosApi';
import SearchIcon from '../components/icons/SearchIcon/SearchIcon';
import ModifyIcon from '../components/icons/ModifyIcon/ModifyIcon';
import DeleteIcon from '../components/icons/DeleteIcon/DeleteIcon';
import MyToast from '../components/Toast/Toast';
import useWindowSize from '../Hooks/useWindowsSize';
import './css/toDo.css';

const Tasks = () => {
    const api = new AxiosApi();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { session } = useSession();
    const { width } = useWindowSize();
    const [tasks, setTasks] = useState([]);
    const [mobileLoader, setMobileLoader] = useState(false);
    const [searchTasks, setSearchTasks] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const handleMobileLoader = command => setMobileLoader(command);
    const showFilteredTasks = () => {
        const filteredTask = tasks.filter(task =>
            task.name.toLowerCase().includes(searchTasks.toLowerCase()));
            setTasks(filteredTask);
    }
    const checkInputValue = (e) => {
        setSearchTasks(e.target.value);
        if (e.target.value === "") {
            setRefresh(!refresh);
        }
    }
    const handleNavCreateTask = () => {
        navigate('/task/create');
    }
    const getTasks = async () => {
        handleMobileLoader(true);
        try {
            const response = await api.get('/task');
            if (response.statusText) {
                setTasks(response.data);
            }
        } catch (error) {
            console.error(error.response.data);
        } finally {
            handleMobileLoader(false);
        }
    }
    useEffect(() => {
        if (session) {
            dispatch(login(session));
        }
        getTasks();
    }, [refresh]);
    console.log(tasks);
    return (
        <MainLayout childrens={
            <div className='p-5 d-flex justify-content-center'>
                <div className='list-employee-container'>
                    <div className='d-flex flex-column gap-2 gap-md-0 flex-lg-row align-items-center position-relative mb-5'>
                        <div className='position-relative w-100'>
                            <SearchIcon classStyle='list-employee-search-icon' />
                            <input
                                onChange={checkInputValue}
                                className='list-employee-input'
                                type="text"
                                placeholder='Search here...' />
                        </div>
                        <button
                            onClick={showFilteredTasks}
                            className='list-employee-btn'>
                            Search
                        </button>
                        {width > 768 ?
                            <button onClick={handleNavCreateTask}
                                className='list-employee-create-btn'>
                                +
                            </button>
                            :
                            <button
                                onClick={handleNavCreateTask}
                                className='list-employee-create-mobile-btn'>
                                Create new task
                            </button>
                        }
                    </div>
                </div>
            </div >
        } />
    )
}

export default Tasks;
