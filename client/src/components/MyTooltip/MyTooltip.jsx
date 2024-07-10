import React from 'react';
import './myTooltip.css';

const MyTooltip = ({ classStyle, text }) => {
    return (
        <div className={`my-tooltip-container ${classStyle}`}>
            <div className='my-tooltip'>
                {text}
            </div>
            <div className='my-tooltip-arrow'></div>
        </div>
    )
}

export default MyTooltip;
