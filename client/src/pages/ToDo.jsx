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

const ToDo = () => {
    const api = new AxiosApi();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { session } = useSession();
    const { width } = useWindowSize();
    const [tasks, setTasks] = useState([]);
    const [searchTasks, setSearchTasks] = useState('');
    useEffect(() => {
        if (session) {
            dispatch(login(session));
        }
    }, []);
    return (
        <MainLayout childrens={''} />
    )
}

export default ToDo;
