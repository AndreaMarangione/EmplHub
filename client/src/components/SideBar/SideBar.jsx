import React from 'react';
import DashboardIcon from '../icons/DashboardIcon/DashboardIcon';
import EmployeeIcon from '../icons/EmployeeIcon/EmployeeIcon';
import CustomerIcon from '../icons/CustomerIcon/CustomerIcon';
import ToDoIcon from '../icons/ToDoIcon/ToDoIcon';
import LogoutIcon from '../icons/LogoutIcon/LogoutIcon';
import { useDispatch, useSelector } from "react-redux";
import { loginState } from '../../redux/sessionSlice';
import { logout } from '../../redux/sessionSlice';
import { useNavigate } from 'react-router-dom';
import useWindowSize from '../../Hooks/useWindowsSize';
import UserIcon from '../icons/UserIcon/UserIcon';
import './sidebar.css';

const SideBar = () => {
    const navigate = useNavigate();
    const { width } = useWindowSize();
    const sessionData = useSelector(loginState);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    }
    const handleNavigate = (e) => {
        navigate(`/${e.target.name}`);
    }
    return (
        <div className='sidebar d-flex flex-column gap-4 py-5 px-0'>
            <a
                name=''
                onClick={handleNavigate}
                className='sidebar-link-container d-flex align-items-center gap-2'>
                <DashboardIcon classStyle='sidebar-icons' />
                Dashboard
            </a>
            <a
                name='employees'
                onClick={handleNavigate}
                className='sidebar-link-container d-flex align-items-center gap-2'>
                <EmployeeIcon classStyle='sidebar-icons' />
                Employees
            </a>
            <a
                name='customers'
                onClick={handleNavigate}
                className='sidebar-link-container d-flex align-items-center gap-2'>
                <CustomerIcon classStyle='sidebar-icons' />
                Customers
            </a>
            <a
                name='toDo'
                onClick={handleNavigate}
                className='sidebar-link-container d-flex align-items-center gap-2'>
                <ToDoIcon classStyle='sidebar-icons' />
                To do
            </a>
            {width <= 768 ?
                <a className='sidebar-link-container mt-auto'>
                    <UserIcon
                        sessionData={sessionData}
                        onClick={() => navigate('/profile')} />
                </a>
                : null}
            <a className='sidebar-link-container d-flex align-items-center gap-2 m-0 mt-lg-auto'
                onClick={handleLogout}>
                <LogoutIcon classStyle='sidebar-icons' />
                Logout
            </a>
        </div>
    )
}

export default SideBar;
