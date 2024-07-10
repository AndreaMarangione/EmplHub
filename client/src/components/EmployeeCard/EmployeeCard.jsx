import React, { useEffect, useState } from 'react';
import ModifyIcon from '../icons/ModifyIcon/ModifyIcon';
import DeleteIcon from '../icons/DeleteIcon/DeleteIcon';
import './employeeCard.css';

const NewEmployeeCard =
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
            <div className="card">
                <div className="card-block employee-card">
                    {session.role === 'user' || employeeData.role === 'admin' ?
                        <div className='employeeCard-dummyContainer'></div>
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
                    <div className="row align-items-center justify-content-center">
                        <div className="col-auto">
                            <div className='task-img-container'>
                                <img
                                    className="task-img rounded-circle"
                                    src={employeeData.avatar}
                                    alt="dashboard-user" />
                            </div>
                        </div>
                        <div className="col">
                            <h5>{`${employeeData.name} ${employeeData.surname}`}</h5>
                        </div>
                    </div>
                    <ul className="task-list-employee">
                        <li>
                            <i className="task-icon" />
                            <h6 className='task-list-data'>
                                Email
                            </h6>
                            <p className="task-email text-muted">
                                {employeeData.email}
                            </p>
                        </li>
                        <li>
                            <i className="task-icon bg-c-green" />
                            <h6 className='task-list-data'>
                                Birthday
                            </h6>
                            <p className="text-muted">
                                {employeeData.dateOfBirthday}
                            </p>
                        </li>
                        <li>
                            <i className="task-icon bg-c-green" />
                            <h6 className='task-list-data'>
                                Hired
                            </h6>
                            <p className="text-muted">
                                {hired}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

export default NewEmployeeCard;
