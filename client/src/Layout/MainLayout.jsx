import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import useWindowSize from '../Hooks/useWindowsSize';
import { useSelector } from "react-redux";
import { showMenu } from '../redux/menuMobileSlice';
import './mainLayout.css';

const MainLayout = ({ childrens }) => {
    const { width } = useWindowSize();
    const menu = useSelector(showMenu);
    const [showPassForm, setShowPassForm] = useState(false);
    const handlePassForm = () => setShowPassForm(!showPassForm);
    return (
        <div>
            <Navbar
                handlePassForm={handlePassForm}
                showPassForm={showPassForm}
            />
            <div className="container-fluid">
                <div className="row">
                    <div className={`d-flex justify-content-center 
                        ${width > 768 ?
                            'sidebar-desktop col-2'
                            :
                            'sidebar-mobile'} 
                            ${menu ? 'sidebar-mobile-show' : ''}`}>
                        <SideBar
                            handlePassForm={handlePassForm}
                        />
                    </div>
                    <div className="main-container col-12 col-lg-10">
                        {childrens}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainLayout;
