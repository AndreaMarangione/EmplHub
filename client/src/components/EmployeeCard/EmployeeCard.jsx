import React from 'react';
import ModifyIcon from '../icons/ModifyIcon/ModifyIcon';
import DeleteIcon from '../icons/DeleteIcon/DeleteIcon';
import './employeeCard.css';

const EmployeeCard =
    ({
        logo,
        data,
        onClick
    }) => {
        return (
            <div className='employeeCard d-flex flex-column align-items-center gap-3'>
                <div className='d-flex align-self-end gap-2'>
                    <ModifyIcon
                        classStyle='employeeCard-modify-icon'
                        onClick={onClick} />
                    <DeleteIcon
                        classStyle='employeeCard-delete-icon'
                        onClick={onClick} />
                </div>
                <img
                    className='employeeCard-img'
                    src={logo}
                    alt="profile" />
                <div className='d-flex flex-column align-self-start gap-1'>
                    <div className='d-flex gap-1'>
                        <span
                            className='employeeCard-data fw-bold'>
                            {data.name}
                        </span>
                        <span
                            className='employeeCard-data fw-bold'>
                            {data.surname}
                        </span>
                    </div>
                    <span
                        className='employeeCard-data'>
                        {data.email}
                    </span>
                    <span
                        className='employeeCard-data'>
                        {data.hire}
                    </span>
                    <span
                        className='employeeCard-data'>
                        Hire:
                    </span>
                </div>
            </div>
        )
    }

export default EmployeeCard;
