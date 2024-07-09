import React from 'react';
import OkIcon from '../icons/OkIcon/OkIcon';
import ErrorIcon from '../icons/ErrorIcon/ErrorIcon';
import './serverResponse.css';

const ServerResponse =
    ({
        classStyle,
        statusCode,
        text
    }) => {
        return (
            <div className='d-flex flex-column flex-lg-row align-items-center justify-content-center'>
                {statusCode > 0 ?
                    statusCode >= 400 ?
                        <ErrorIcon classStyle='serverResponse-errorIcon' />
                        :
                        <OkIcon classStyle='serverResponse-okIcon' />
                    :
                    null
                }
                <h4 className={`m-0 text-center ${classStyle} 
            ${statusCode >= 400 ?
                        'serverResponse-error'
                        :
                        'serverResponse-ok'}`}>
                    {text}
                </h4>
            </div>
        )
    }

export default ServerResponse;
