import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const ModifyIcon =
    ({
        classStyle,
        tooltipActive,
        tooltipMessage,
        onClick
    }) => {
        const tooltip = (
            <Tooltip id="tooltip">
                <strong>{tooltipMessage}</strong>
            </Tooltip>
        );
        return (
            <>
                {tooltipActive ?
                    <OverlayTrigger placement="top" overlay={tooltip}>
                        <svg
                            onClick={onClick}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`ionicon ${classStyle}`}
                            viewBox="0 0 512 512">
                            <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="32"
                                d="M364.13 125.25L87 403l-23 45 44.99-23 
                277.76-277.13-22.62-22.62zM420.69 68.69l-22.62 
                22.62 22.62 22.63 22.62-22.63a16 16 0 000-22.62h0a16 
                16 0 00-22.62 0z"/>
                        </svg>
                    </OverlayTrigger>
                    :
                    <svg
                        onClick={onClick}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`ionicon ${classStyle}`}
                        viewBox="0 0 512 512">
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="32"
                            d="M364.13 125.25L87 403l-23 45 44.99-23 
        277.76-277.13-22.62-22.62zM420.69 68.69l-22.62 
        22.62 22.62 22.63 22.62-22.63a16 16 0 000-22.62h0a16 
        16 0 00-22.62 0z"/>
                    </svg>
                }
            </>
        )
    }

export default ModifyIcon;
