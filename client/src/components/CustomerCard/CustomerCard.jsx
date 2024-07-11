import React, { useEffect, useState } from 'react';
import ModifyIcon from '../icons/ModifyIcon/ModifyIcon';
import DeleteIcon from '../icons/DeleteIcon/DeleteIcon';
import './customerCard.css';

const CustomerCard =
    ({
        customerData,
        session,
        onClickModify,
        onClickDelete
    }) => {
        const [since, setSince] = useState();
        const handleSince = () => {
            const year = customerData.createdAt.slice(0, 4);
            const month = customerData.createdAt.slice(5, 7);
            const day = customerData.createdAt.slice(8, 10);
            setSince(`${day}/${month}/${year}`);
        }
        useEffect(() => {
            handleSince();
            // eslint-disable-next-line
        }, []);
        return (
            <div className="card">
                <div className="card-block customer-card">
                    {session.role === 'user' ?
                        <div className='customerCard-dummyContainer' />
                        :
                        <div className='d-flex justify-content-end gap-2'>
                            <ModifyIcon
                                tooltipActive={false}
                                tooltipMessage='Modify'
                                classStyle='customerCard-modify-icon'
                                onClick={onClickModify} />
                            <DeleteIcon
                                tooltipActive={false}
                                tooltipMessage='Delete'
                                classStyle='customerCard-delete-icon'
                                onClick={onClickDelete} />
                        </div>
                    }
                    <div className="row align-items-center justify-content-center">
                        <div className="col-auto">
                            <div className='task-img-container'>
                                <img
                                    className="task-img rounded-circle"
                                    src={customerData.logo}
                                    alt="dashboard-user" />
                            </div>
                        </div>
                        <div className="col">
                            <h5>{customerData.name}</h5>
                        </div>
                    </div>
                    <ul className="task-list-customer">
                        <li>
                            <i className="task-icon" />
                            <h6 className='task-list-data'>
                                Email
                            </h6>
                            <p className="task-email text-muted">
                                {customerData.email}
                            </p>
                        </li>
                        <li>
                            <i className="task-icon bg-c-green" />
                            <h6 className='task-list-data'>
                                Since
                            </h6>
                            <p className="text-muted">
                                {since}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

export default CustomerCard;
