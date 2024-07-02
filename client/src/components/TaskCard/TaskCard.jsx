import React, { useEffect, useState } from 'react';
import ModifyIcon from '../icons/ModifyIcon/ModifyIcon';
import DeleteIcon from '../icons/DeleteIcon/DeleteIcon';
import './taskCard.css';

const TaskCard =
    ({
        data,
        onClickModify,
        onClickDelete
    }) => {
        const [created, setCreated] = useState();
        const handleCreated = () => {
            const year = data.createdAt.slice(0, 4);
            const month = data.createdAt.slice(5, 7);
            const day = data.createdAt.slice(8, 10);
            setCreated(`${day}/${month}/${year}`);
        }
        useEffect(() => {
            handleCreated();
            // eslint-disable-next-line
        }, []);
        return (
            <div className='taskCard d-flex flex-column gap-3'>
                {data.role === 'admin' ?
                    <div className='taskCard-dummy-icon'>
                        <span>{data.status}</span>
                        <span>{created}</span>
                    </div>
                    :
                    <div>
                        <div
                            className='d-flex justify-content-between align-items-center'>
                            <span
                                className='taskCard-status text-muted'>
                                {data.status}
                            </span>
                            <div className='d-flex align-self-end gap-2'>
                                <ModifyIcon
                                    classStyle='taskCard-modify-icon'
                                    onClick={onClickModify} />
                                <DeleteIcon
                                    classStyle='taskCard-delete-icon'
                                    onClick={onClickDelete} />
                            </div>
                        </div>
                        <span
                            className='taskCard-created text-muted'>
                            {created}
                        </span>
                    </div>
                }
                <div>
                    <h3 className='taskCard-title'>{data.title}</h3>
                </div>
                <div className='d-flex flex-column h-100'>
                    <div className='taskCard-billing-container'>
                        <p className='taskCard-billing'>Billing</p>
                        <div className='d-flex align-items-center justify-content-between'>
                            <span>Total</span>
                            <div className='position-relative'>
                                <span className='taskCard-amount-icon text-muted'>€</span>
                                <input
                                    className='taskCard-amount-input'
                                    value={data.amount.total}
                                    type="number"
                                    step='0.01'
                                    min='0'
                                    disabled />
                            </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-between'>
                            <span>Invoice</span>
                            <div className='position-relative'>
                                <span className='taskCard-amount-icon text-muted'>€</span>
                                <input
                                    className='taskCard-amount-input'
                                    value={data.amount.invoice}
                                    type="number"
                                    step='0.01'
                                    min='0'
                                    disabled />
                            </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-between'>
                            <span>Residual</span>
                            <div className='position-relative'>
                                <span className='taskCard-amount-icon text-muted'>€</span>
                                <input
                                    className='taskCard-amount-input'
                                    value={data.amount.residual}
                                    type="number"
                                    step='0.01'
                                    min='0'
                                    disabled />
                            </div>
                        </div>
                    </div>
                    <div className='d-flex align-items-center justify-content-between'>
                        <span>Priority</span>
                        <input
                            className='taskCard-customer-input'
                            value={data.priority}
                            type="text"
                            disabled />
                    </div>
                    <div className='d-flex align-items-center justify-content-between'>
                        <span>Dead Line</span>
                        <input
                            className='taskCard-customer-input'
                            value={data.end}
                            type="text"
                            disabled />
                    </div>
                    <div className='d-flex align-items-center justify-content-between'>
                        <span>Customer</span>
                        <input
                            className='taskCard-customer-input'
                            value={data.customerId.name}
                            type="text"
                            disabled />
                    </div>
                    <div className='taskCard-employees'>
                        {data.employeeId.map((employee, index) => {
                            return <img
                                key={index}
                                src={employee.avatar}
                                alt="employee" />
                        })}
                    </div>
                </div>
            </div>
        )
    }

export default TaskCard;
