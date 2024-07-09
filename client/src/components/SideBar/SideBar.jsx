import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loginState, logout } from '../../redux/sessionSlice';
import DashboardIcon from '../icons/DashboardIcon/DashboardIcon';
import EmployeeIcon from '../icons/EmployeeIcon/EmployeeIcon';
import CustomerIcon from '../icons/CustomerIcon/CustomerIcon';
import ToDoIcon from '../icons/ToDoIcon/ToDoIcon';
import LogoutIcon from '../icons/LogoutIcon/LogoutIcon';
import { useLocation, useNavigate } from 'react-router-dom';
import useWindowSize from '../../Hooks/useWindowsSize';
import UserIcon from '../icons/UserIcon/UserIcon';
import useSession from '../../Hooks/useSession';
import PasswordAlert from '../PasswordAlert/PasswordAlert';
import './sidebar.css';

const SideBar = ({ handlePassForm }) => {
    useSession();
    const location = useLocation();
    const dispatch = useDispatch();
    const sessionData = useSelector(loginState);
    const navigate = useNavigate();
    const { width } = useWindowSize();
    const handleLogout = () => {
        dispatch(logout());
    }
    const handleNavigate = (e) => {
        navigate(`/${e.target.ariaValueText}`);
    }
    const linkActive = () => {
        const path = location.pathname.slice(1);
        const links = document.querySelectorAll('.sidebar-link-container');
        links.forEach(link => {
            if (link.ariaValueText === path) {
                link.classList.add('sidebar-link-container-active');
            }
        })
    }
    useEffect(() => {
        if (width > 768) {
            linkActive();
        }
        // eslint-disable-next-line
    }, []);
    return (
        <div className='sidebar d-flex flex-column gap-4 py-5 px-0'>
            <button
                aria-valuetext=''
                onClick={handleNavigate}
                className='sidebar-link-container d-flex align-items-center gap-2'>
                <DashboardIcon
                    valueText=''
                    onClick={handleNavigate}
                    classStyle='sidebar-icons' />
                Dashboard
            </button>
            <button
                aria-valuetext='employees'
                onClick={handleNavigate}
                className='sidebar-link-container d-flex align-items-center gap-2'>
                <EmployeeIcon
                    valueText='employees'
                    onClick={handleNavigate}
                    classStyle='sidebar-icons' />
                Employees
            </button>
            <button
                aria-valuetext='customers'
                onClick={handleNavigate}
                className='sidebar-link-container d-flex align-items-center gap-2'>
                <CustomerIcon
                    valueText='customers'
                    onClick={handleNavigate}
                    classStyle='sidebar-icons' />
                Customers
            </button>
            <button
                aria-valuetext='tasks'
                onClick={handleNavigate}
                className='sidebar-link-container d-flex align-items-center gap-2'>
                <ToDoIcon
                    valueText='tasks'
                    onClick={handleNavigate}
                    classStyle='sidebar-icons' />
                Tasks
            </button>
            {width <= 768 ?
                <button className='sidebar-link-container mt-auto'>
                    <UserIcon
                        sessionData={sessionData}
                        onClick={() => navigate('/profile')} />
                </button>
                :
                null}
            {width >= 1024 && !sessionData.personalPass ?
                <PasswordAlert
                    handlePassForm={handlePassForm}
                />
                :
                null}
            <button
                name='logout'
                className='sidebar-link-container d-flex align-items-center gap-2 m-0 mt-lg-auto'
                onClick={handleLogout}>
                <LogoutIcon classStyle='sidebar-icons' />
                Logout
            </button>
        </div>
    )
}

export default SideBar;
