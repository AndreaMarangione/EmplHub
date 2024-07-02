import React, { useEffect, useState } from 'react';
import './statusIcon.css';

const StatusIcon = ({ text }) => {
    const [color, setColor] = useState('');
    const handleColor = () => {
        switch (text) {
            case 'Pending':
                setColor('status-icon-red');
                break;
            case 'In progress':
                setColor('status-icon-yellow');
                break;
            case 'Done':
                setColor('status-icon-green');
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        handleColor();
        // eslint-disable-next-line
    }, [text])
    return (
        <p
            className={`status-icon ${color}`}>
            {text}
        </p>
    )
}

export default StatusIcon;
