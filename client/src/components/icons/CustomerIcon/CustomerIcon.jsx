import React from 'react';

const CustomerIcon =
  ({
    classStyle,
    valueText,
    onClick
  }) => {
    return (
      <svg
        onClick={onClick}
        aria-valuetext={valueText}
        xmlns="http://www.w3.org/2000/svg"
        className={`ionicon ${classStyle}`}
        viewBox="0 0 512 512">
        <path
          onClick={onClick}
          aria-valuetext={valueText}
          d="M48 336v96a48.14 48.14 0 0048 48h320a48.14 48.14 0 0048-48v-96"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="32" />
        <path
          onClick={onClick}
          aria-valuetext={valueText}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
          d="M48 336h144M320 336h144M192 336a64 64 0 00128 0" />
        <path
          onClick={onClick}
          aria-valuetext={valueText}
          d="M384 32H128c-26 0-43 14-48 40L48 192v96a48.14 48.14 0 0048 
      48h320a48.14 48.14 0 0048-48v-96L432 72c-5-27-23-40-48-40z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="32" />
        <path
          onClick={onClick}
          aria-valuetext={valueText}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
          d="M48 192h144M320 192h144M192 192a64 64 0 00128 0" />
      </svg>
    )
  }

export default CustomerIcon;
