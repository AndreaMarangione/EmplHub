import React from 'react';
import useWindowSize from '../../Hooks/useWindowsSize';
import './dashButton.css';

const DashButton =
    ({
        classStyle,
        title,
        description,
        onClick,
        enableBtn
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
                            className='dashButton-description text-muted m-0'>
                            {description}
                        </p>
                        :
                        null
                    }
                </div>
                {enableBtn ?
                    <p
                        className='dashButton-btn text-muted m-0'>
                        +
                    </p>
                    :
                    null
                }
            </div>
        )
    }

export default DashButton;
