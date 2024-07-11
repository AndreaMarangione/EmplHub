import React, { useEffect, useState } from 'react';
import helloIcon from '../../assets/hello-icon.svg';
import './welcomeUser.css';

const WelcomeUser = ({ userData }) => {
    const [welcome, setWelcome] = useState('');
    const utcHour = new Date().getUTCHours();
    const offset = new Date().getTimezoneOffset();
    const actualHour = utcHour + ((offset * -1) / 60);
    const handleWelcome = () => {
        if (actualHour >= 0 && actualHour < 12) {
            setWelcome('Good morning');
        } else if (actualHour >= 12 && actualHour < 18) {
            setWelcome('Good afternoon');
        } else if (actualHour >= 18 && actualHour < 24) {
            setWelcome('Good evening');
        }
    }
    useEffect(() => {
        handleWelcome();
    }, [])
    return (
        <div className='welcome-container'>
            <div className='welcome-text'>
                <h1 className='m-0'>{`${welcome} ${userData.name}`}</h1>
                <p className='m-0'>Manage all your tasks and daily work here</p>
            </div>
            <img className='welcome-hello' src={helloIcon} alt="hello-icon" />
        </div>
    )
}

export default WelcomeUser;
