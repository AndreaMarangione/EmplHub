import React, { useEffect, useState } from 'react';
import ModifyIcon from '../icons/ModifyIcon/ModifyIcon';
import DeleteIcon from '../icons/DeleteIcon/DeleteIcon';
import './employeeCard.css';

const EmployeeCard =
    ({
        employeeData,
        session,
        onClickModify,
        onClickDelete
    }) => {
        const [hired, setHired] = useState();
        const handleHire = () => {
            const year = employeeData.createdAt.slice(0, 4);
            const month = employeeData.createdAt.slice(5, 7);
            const day = employeeData.createdAt.slice(8, 10);
            setHired(`${day}/${month}/${year}`);
        }
        useEffect(() => {
            handleHire();
            // eslint-disable-next-line
        }, []);
        return (
            <div className="employeeCard-wrapper">
                <div className="employeeCard-note">
                    <div className="employeeCard-spiral-part">
                        <div className="employeeCard-spiral">
                            <div className="employeeCard-hole"></div>
                            <div className="employeeCard-wire"></div>
                        </div>
                        <div className="employeeCard-spiral">
                            <div className="employeeCard-hole"></div>
                            <div className="employeeCard-wire"></div>
                        </div>
                        <div className="employeeCard-spiral">
                            <div className="employeeCard-hole"></div>
                            <div className="employeeCard-wire"></div>
                        </div>
                        <div className="employeeCard-spiral">
                            <div className="employeeCard-hole"></div>
                            <div className="employeeCard-wire"></div>
                        </div>
                        <div className="employeeCard-spiral">
                            <div className="employeeCard-hole"></div>
                            <div className="employeeCard-wire"></div>
                        </div>
                        <div className="employeeCard-spiral">
                            <div className="employeeCard-hole"></div>
                            <div className="employeeCard-wire"></div>
                        </div>
                    </div>
                    <div className="employeeCard-note-lines">
                        <div className="employeeCard-line">
                            {session.role === 'user' || employeeData.role === 'admin' ?
                                <div className='employeeCard-dummy-icon' />
                                :
                                <div className='d-flex justify-content-end gap-2'>
                                    <ModifyIcon
                                        tooltipActive={false}
                                        tooltipMessage='Modify'
                                        classStyle='employeeCard-modify-icon'
                                        onClick={onClickModify} />
                                    <DeleteIcon
                                        tooltipActive={false}
                                        tooltipMessage='Delete'
                                        classStyle='employeeCard-delete-icon'
                                        onClick={onClickDelete} />
                                </div>
                            }
                        </div>
                        <div className='d-flex justify-content-center align-items-center my-2'>
                            <div className='employeeCard-img-container'>
                                <img
                                    className='employeeCard-img'
                                    src={employeeData.avatar}
                                    alt="profile" />
                            </div>
                        </div>
                        <div className="employeeCard-line d-flex align-items-center gap-2">
                            <span
                                className='fw-bold'>
                                {employeeData.name}
                            </span>
                            <span
                                className='fw-bold'>
                                {employeeData.surname}
                            </span>
                        </div>
                        <div className="employeeCard-line d-flex align-items-center">
                            <span
                                className='employeeCard-email'>
                                {employeeData.email}
                            </span>
                        </div>
                        <div className="employeeCard-line d-flex align-items-center">
                            <span
                                className='employeeCard-data'>
                                <span
                                    className='text-muted'>
                                    Birthday:
                                </span>
                                {employeeData.dateOfBirthday}
                            </span>
                        </div>
                        <div className="employeeCard-line d-flex align-items-center">
                            <span
                                className='employeeCard-data'>
                                <span
                                    className='text-muted'>
                                    Hired:
                                </span>
                                {hired}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default EmployeeCard;
