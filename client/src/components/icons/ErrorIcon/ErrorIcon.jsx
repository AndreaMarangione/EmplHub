import React from 'react';

const ErrorIcon = ({ classStyle }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`ionicon ${classStyle}`}
            viewBox="0 0 512 512"
            fill="red">
            <path
                d="M448 256c0-106-86-192-192-192S64 150 
            64 256s86 192 192 192 192-86 192-192z"
                stroke="red"
                strokeMiterlimit="10"
                strokeWidth="32" />
            <path
                d="M250.26 166.05L256 288l5.73-121.95a5.74 5.74 
            0 00-5.79-6h0a5.74 5.74 0 00-5.68 6z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32" />
            <path
                fill="white"
                d="M256 367.91a20 20 0 1120-20 
                20 20 0 01-20 20z" />
        </svg>
    )
}

export default ErrorIcon;
