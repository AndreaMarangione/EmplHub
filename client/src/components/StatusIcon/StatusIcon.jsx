import React, { useEffect, useState } from 'react';
import './statusIcon.css';

const StatusIcon = ({ text, onChange }) => {
    const [color, setColor] = useState('');
    const handleColor = () => {
        switch (text) {
            case 'Pending':
                setColor('status-icon-red');
                break;
            case 'In Progress':
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
        <select
            onChange={onChange}
            className={`status-icon ${color}`}
            name="status"
            defaultValue={text}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
        </select>
    )
}

export default StatusIcon;
