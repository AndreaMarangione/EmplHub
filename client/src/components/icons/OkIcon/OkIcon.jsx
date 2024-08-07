import React from 'react';

const OkIcon = ({ classStyle }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`ionicon ${classStyle}`}
            viewBox="0 0 512 512">
            <path
                d="M448 256c0-106-86-192-192-192S64 150 64 
            256s86 192 192 192 192-86 192-192z"
                fill="green"
                stroke="green"
                strokeMiterlimit="10"
                strokeWidth="32" />
            <path
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M352 176L217.6 336 160 272" />
        </svg>
    )
}

export default OkIcon;
