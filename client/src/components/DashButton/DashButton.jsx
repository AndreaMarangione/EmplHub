import React from 'react';
import useWindowSize from '../../Hooks/useWindowsSize';
import './dashButton.css';

const DashButton =
    ({
        classStyle,
        title,
        description,
        onClick
    }) => {
        const { width } = useWindowSize();
        return (
            <div
                onClick={onClick}
                className={`dashButton-container ${classStyle}`}>
                <div>
                    <h3
                        className='dashButton-title m-0'>
                        {title}
                    </h3>
                    {width > 768 ?
                        <p
                            className='dashButton-description m-0'>
                            {description}
                        </p>
                        :
                        null
                    }
                </div>
                <p
                    className='dashButton-btn m-0'>
                    +
                </p>
            </div>
        )
    }

export default DashButton;
