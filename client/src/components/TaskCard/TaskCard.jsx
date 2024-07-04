import React, { useEffect, useState } from 'react';
import ModifyIcon from '../icons/ModifyIcon/ModifyIcon';
import DeleteIcon from '../icons/DeleteIcon/DeleteIcon';
import PriorityIcon from '../PriorityIcon/PriorityIcon';
import SliderContainer from '../SliderContainer/SliderContainer';
import StatusIcon from '../StatusIcon/StatusIcon';
import './taskCard.css';

const TaskCard =
    ({
        data,
        tooltipActive,
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
                        <span
                            className='taskCard-status text-muted'>
                            {data.status}
                        </span>
                        <span
                            className='taskCard-created text-muted'>
                            {created}
                        </span>
                    </div>
                    :
                    <div>
                        <div
                            className='d-flex justify-content-between align-items-center'>
                            <StatusIcon text={data.status} />
                            <div className='d-flex align-self-end gap-2'>
                                <ModifyIcon
                                    tooltipActive={tooltipActive}
                                    tooltipMessage='Modify'
                                    classStyle='taskCard-modify-icon'
                                    onClick={onClickModify} />
                                <DeleteIcon
                                    tooltipActive={tooltipActive}
                                    tooltipMessage='Delete'
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
                    <div className='taskcard-data-container'>
                        <div className='d-flex align-items-center justify-content-between'>
                            <span>Customer</span>
                            <span
                                className='taskCard-customer fw-bold'>
                                {data.customerId.name}
                            </span>
                        </div>
                        <div className='d-flex align-items-center justify-content-between'>
                            <span>Priority</span>
                            <PriorityIcon text={data.priority} />
                        </div>
                        <div className='d-flex align-items-center justify-content-between'>
                            <span>Start</span>
                            <span
                                className='taskCard-end'>
                                {data.start}
                            </span>
                        </div>
                        <div className='d-flex align-items-center justify-content-between'>
                            <span>End</span>
                            <span
                                className='taskCard-end'>
                                {data.end}
                            </span>
                        </div>
                    </div>
                    <div className='taskCard-billing-container'>
                        <p className='taskCard-billing'>Billing</p>
                        <div className='d-flex align-items-center justify-content-between'>
                            <span>Total contract</span>
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
                            <span>Invoiced</span>
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
                    <div className='taskCard-employees'>
                        <SliderContainer
                            items={data.employeeId.map((employee, index) => {
                                return <img
                                    key={index}
                                    className='taskCard-avatar'
                                    src={employee.avatar}
                                    alt="employee" />
                            })} />
                    </div>
                </div>
            </div>
        )
    }

export default TaskCard;
