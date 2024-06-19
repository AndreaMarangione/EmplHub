import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import useWindowSize from '../Hooks/useWindowsSize';
import { useSelector } from "react-redux";
import { showMenu } from '../redux/menuMobileSlice';
import './mainLayout.css';

const MainLayout = ({ childrens }) => {
    const { width } = useWindowSize();
    const menu = useSelector(showMenu);
    return (
        <div>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className={`d-flex justify-content-center 
                        ${width > 768 ?
                            'sidebar-desktop col-2'
                            :
                            'sidebar-mobile'} 
                            ${menu ? 'sidebar-mobile-show z-2' : ''}`}>
                        <SideBar />
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
