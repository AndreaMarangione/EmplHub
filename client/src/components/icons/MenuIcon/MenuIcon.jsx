import React from 'react';

const MenuIcon = ({ classStyle, onClick }) => {
    return (
        <svg
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            className={`ionicon ${classStyle}`}
            viewBox="0 0 512 512">
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="32"
                d="M80 160h352M80 256h352M80 352h352" />
        </svg>
    )
}

export default MenuIcon;
