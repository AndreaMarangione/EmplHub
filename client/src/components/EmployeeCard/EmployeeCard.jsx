import React, { useEffect, useState } from 'react';
import ModifyIcon from '../icons/ModifyIcon/ModifyIcon';
import DeleteIcon from '../icons/DeleteIcon/DeleteIcon';
import './employeeCard.css';

const EmployeeCard =
    ({
        data,
        onClickModify,
        onClickDelete
    }) => {
        const [hired, setHired] = useState();
        const handleHire = () => {
            const year = data.createdAt.slice(0, 4);
            const month = data.createdAt.slice(5, 7);
            const day = data.createdAt.slice(8, 10);
            setHired(`${day}/${month}/${year}`);
        }
        useEffect(() => {
            handleHire();
            // eslint-disable-next-line
        }, []);
        return (
            <div className='employeeCard d-flex flex-column align-items-center gap-3'>
                {data.role === 'admin' ?
                    <div className='employeeCard-dummy-icon'></div>
                    :
                    <div className='d-flex align-self-end gap-2'>
                        <ModifyIcon
                            classStyle='employeeCard-modify-icon'
                            onClick={onClickModify} />
                        <DeleteIcon
                            classStyle='employeeCard-delete-icon'
                            onClick={onClickDelete} />
                    </div>
                }
                <div className='employeeCard-img-container'>
                    <img
                        className='employeeCard-img'
                        src={data.avatar}
                        alt="profile" />
                </div>
                <div className='d-flex flex-column align-self-start gap-1'>
                    <div className='d-flex gap-1'>
                        <span
                            className='fw-bold'>
                            {data.name}
                        </span>
                        <span
                            className='fw-bold'>
                            {data.surname}
                        </span>
                    </div>
                    <span
                        className='employeeCard-data'>
                        {data.email}
                    </span>
                    <span
                        className='employeeCard-data'>
                        <span className='text-muted'>Bth:</span> {data.dateOfBirthday}
                    </span>
                    <span
                        className='employeeCard-data'>
                        <span className='text-muted'>Hired:</span> {hired}
                    </span>
                </div>
            </div>
        )
    }

export default EmployeeCard;
