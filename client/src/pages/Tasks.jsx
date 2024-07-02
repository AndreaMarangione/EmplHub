import React, { useState, useEffect } from 'react';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import { useDispatch } from "react-redux";
import { login } from '../redux/sessionSlice';
import { useNavigate } from 'react-router-dom';
import AxiosApi from '../class/axiosApi';
import SearchIcon from '../components/icons/SearchIcon/SearchIcon';
import TaskCard from '../components/TaskCard/TaskCard';
import MyToast from '../components/Toast/Toast';
import useWindowSize from '../Hooks/useWindowsSize';
import './css/task.css';

const Tasks = () => {
    const api = new AxiosApi();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { session } = useSession();
    const { width } = useWindowSize();
    const [tasks, setTasks] = useState([]);
    const [singleTask, setSingleTask] = useState([]);
    const [loader, setLoader] = useState(false);
    const [singleTaskLoader, setSingleTaskLoader] = useState(false);
    const [deleteLoader, setDeleteLoader] = useState(false);
    const [searchTasks, setSearchTasks] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const handleLoader = command => setLoader(command);
    const handleSingleTaskLoader = command => setSingleTaskLoader(command);
    const handleDeleteLoader = command => setDeleteLoader(command);
    const handleHideToast = () => setShowToast(false);
    const handleShowToast = (id) => {
        handleSingleTaskLoader(true);
        setShowToast(!showToast);
        getSingleTask(id);
    };
    const showFilteredTasks = () => {
        const filteredTask = tasks.filter(task =>
            task.title.toLowerCase().includes(searchTasks.toLowerCase()));
        setTasks(filteredTask);
    }
    const checkInputValue = (e) => {
        setSearchTasks(e.target.value);
        if (e.target.value === "") {
            setRefresh(!refresh);
        }
    }
    const handleNavCreateTask = () => {
        navigate('/tasks/create');
    }
    const getTasks = async () => {
        handleLoader(true);
        try {
            const response = await api.get('/task');
            if (response.statusText) {
                const data = response.data.map(task => {
                    return {
                        ...task,
                        amount: {
                            ...task.amount,
                            residual: task.amount.total - task.amount.invoice
                        }
                    }
                })
                setTasks(data);
            }
        } catch (error) {
            console.error(error.response.data);
        } finally {
            handleLoader(false);
        }
    }
    const getSingleTask = async (id) => {
        try {
            const response = await api.get(`/task/${id}`);
            if (response.statusText) {
                setSingleTask(response.data);
            }
        } catch (error) {
            console.error(error.response.data);
        } finally {
            handleSingleTaskLoader(false);
        }
    }
    const deleteSingleTask = async (id) => {
        handleDeleteLoader(true);
        try {
            await api.delete(`/task/delete/${id}`);
        } catch (error) {
            console.error(error.response.data);
        } finally {
            handleDeleteLoader(false);
            handleHideToast();
            setRefresh(!refresh);
        }
    }
    useEffect(() => {
        if (session) {
            dispatch(login(session));
        }
        getTasks();
    }, [refresh]);
    return (
        <MainLayout childrens={
            <div className='p-5 d-flex justify-content-center'>
                <div className='list-task-container'>
                    <div className='d-flex flex-column gap-2 gap-md-0 flex-lg-row align-items-center position-relative mb-5'>
                        <div className='position-relative w-100'>
                            <SearchIcon classStyle='list-task-search-icon' />
                            <input
                                onChange={checkInputValue}
                                className='list-task-input'
                                type="text"
                                placeholder='Search here...' />
                        </div>
                        <button
                            onClick={showFilteredTasks}
                            className='list-task-btn'>
                            Search
                        </button>
                        {width > 768 ?
                            <button onClick={handleNavCreateTask}
                                className='list-task-create-btn'>
                                +
                            </button>
                            :
                            <button
                                onClick={handleNavCreateTask}
                                className='list-task-create-mobile-btn'>
                                Create new task
                            </button>
                        }
                    </div>
                    <div className='row row-gap-5'>
                        {loader ?
                            <div>
                                <span className="task-loader"></span>
                            </div>
                            :
                            <>
                                {tasks.map((task, index) => {
                                    return <div
                                        key={index}
                                        className="col-12 col-md-6 col-xl-3 d-flex justify-content-center" >
                                        <TaskCard
                                            data={task}
                                            tooltipActive={width > 768 ? true : false}
                                            onClickModify={() => navigate(`/tasks/modify?id=${task._id}`)}
                                            onClickDelete={() => handleShowToast(task._id)} />
                                    </div>
                                })}
                                <MyToast
                                    show={showToast}
                                    handleShow={handleHideToast}
                                    imgShow={false}
                                    classStyle='myToast-style'
                                    body={singleTaskLoader ?
                                        <div className='d-flex justify-content-center'>
                                            <span className="single-task-loader"></span>
                                        </div>
                                        :
                                        <div className='d-flex flex-column gap-2'>
                                            <strong className='m-0'>Are you sure you want delete this task?</strong>
                                            <div className='d-flex gap-1'>
                                                <span>{singleTask.title}</span>
                                            </div>
                                            <div className='d-flex gap-2'>
                                                <button
                                                    onClick={handleHideToast}
                                                    className='toast-button-cancel'>
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => deleteSingleTask(singleTask._id)}
                                                    className='toast-button-delete'>
                                                    {deleteLoader ?
                                                        <span className="delete-task-loader"></span>
                                                        :
                                                        'Delete'
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    }
                                />
                            </>
                        }
                    </div>
                </div>
            </div >
        } />
    )
}

export default Tasks;
