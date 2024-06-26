import React from 'react';

const DashboardIcon = ({ classStyle }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`ionicon ${classStyle}`}
            viewBox="0 0 512 512">
            <rect
                x="48"
                y="48"
                width="176"
                height="176"
                rx="20"
                ry="20"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32" />
            <rect
                x="288"
                y="48"
                width="176"
                height="176"
                rx="20"
                ry="20"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32" />
            <rect
                x="48"
                y="288"
                width="176"
                height="176"
                rx="20"
                ry="20"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32" />
            <rect
                x="288"
                y="288"
                width="176"
                height="176"
                rx="20"
                ry="20"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32" />
        </svg>
    )
}

export default DashboardIcon;
