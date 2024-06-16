import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loginState } from '../../redux/sessionSlice';
import { toggleMenu } from '../../redux/menuMobileSlice';
import { showMenu } from '../../redux/menuMobileSlice';
import { useNavigate } from 'react-router-dom';
import useWindowSize from '../../Hooks/useWindowsSize';
import NotifyIcon from '../icons/NotifyIcon/NotifyIcon';
import UserIcon from '../icons/UserIcon/UserIcon';
import MenuIcon from '../icons/MenuIcon/MenuIcon';
import Logo from '../Logo/Logo';
import useClick from '../../Hooks/useClick';
import './navbar.css';

const Navbar = () => {
    const click = useClick();
    const dispatch = useDispatch();
    const { width } = useWindowSize();
    const sessionData = useSelector(loginState);
    const menu = useSelector(showMenu);
    const navigate = useNavigate();
    useEffect(() => {
        if (menu && click.x > 210) {
            dispatch(toggleMenu());
        }
    }, [click])
    return (
        <nav className="container-fluid navbar-container py-2">
            {width > 768 ?
                <div className="row">
                    <div className="col-2 d-flex align-items-center justify-content-center">
                        <Logo />
                    </div>
                    <div className="col-7 col-xl-8"></div>
                    <div className="col-3 col-xl-2 d-flex align-items-center justify-content-center gap-4">
                        <NotifyIcon classStyle='notify-icon' />
                        <UserIcon
                            sessionData={sessionData}
                            onClick={() => navigate('/profile')} />
                    </div>
                </div>
                :
                <div className="row">
                    <div className="col d-flex align-items-center justify-content-between">
                        <MenuIcon
                            onClick={() => dispatch(toggleMenu())}
                            classStyle='menu-icon z-1' />
                        <Logo />
                        <div className="d-flex align-items-center justify-content-center gap-4">
                            <NotifyIcon classStyle='notify-icon' />
                        </div>
                    </div>
                </div>
            }
        </nav>
    )
}

export default Navbar;
