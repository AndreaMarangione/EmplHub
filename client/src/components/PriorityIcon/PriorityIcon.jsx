import React, { useEffect, useState } from 'react';
import './priorityIcon.css';

const PriorityIcon = ({ text }) => {
    const [color, setColor] = useState('');
    const handleColor = () => {
        switch (text) {
            case 'Low':
                setColor('priority-icon-green');
                break;
            case 'Medium':
                setColor('priority-icon-yellow');
                break;
            case 'High':
                setColor('priority-icon-orange');
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
            className={`priority-icon ${color}`}>
            {text}
        </p>
    )
}

export default PriorityIcon;
