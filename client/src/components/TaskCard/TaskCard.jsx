import React, { useEffect, useState } from 'react';
import ModifyIcon from '../icons/ModifyIcon/ModifyIcon';
import DeleteIcon from '../icons/DeleteIcon/DeleteIcon';
import PriorityIcon from '../PriorityIcon/PriorityIcon';
import SliderContainer from '../SliderContainer/SliderContainer';
import StatusIcon from '../StatusIcon/StatusIcon';
import './taskCard.css';

const NewCard =
    ({
        taskData,
        session,
        tooltipActive,
        onClickModify,
        onClickDelete,
        onChangeStatus
    }) => {
        const [created, setCreated] = useState();
        const handleCreated = () => {
            const year = taskData.createdAt.slice(0, 4);
            const month = taskData.createdAt.slice(5, 7);
            const day = taskData.createdAt.slice(8, 10);
            setCreated(`${day}/${month}/${year}`);
        }
        useEffect(() => {
            if (taskData) {
                handleCreated();
            }
            // eslint-disable-next-line
        }, []);
        return (
            <div className="taskCard-wrapper">
                <div className="taskCard-note">
                    <div className="taskCard-spiral-part">
                        <div className="taskCard-spiral">
                            <div className="taskCard-hole"></div>
                            <div className="taskCard-wire"></div>
                        </div>
                        <div className="taskCard-spiral">
                            <div className="taskCard-hole"></div>
                            <div className="taskCard-wire"></div>
                        </div>
                        <div className="taskCard-spiral">
                            <div className="taskCard-hole"></div>
                            <div className="taskCard-wire"></div>
                        </div>
                        <div className="taskCard-spiral">
                            <div className="taskCard-hole"></div>
                            <div className="taskCard-wire"></div>
                        </div>
                        <div className="taskCard-spiral">
                            <div className="taskCard-hole"></div>
                            <div className="taskCard-wire"></div>
                        </div>
                        <div className="taskCard-spiral">
                            <div className="taskCard-hole"></div>
                            <div className="taskCard-wire"></div>
                        </div>
                    </div>
                    <div className="taskCard-note-lines">
                        <div className="taskCard-line">
                            {session.role === 'admin' ?
                                <div className='taskCard-dummy-icon'>
                                    <StatusIcon
                                        onChange={onChangeStatus}
                                        text={taskData.status} />
                                </div>
                                :
                                <div
                                    className='d-flex justify-content-between align-items-center'>
                                    <StatusIcon
                                        onChange={onChangeStatus}
                                        text={taskData.status} />
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
                            }
                        </div>
                        <div className="taskCard-line d-flex align-items-center justify-content-center">
                            <h5 className='taskCard-title'>{taskData.title}</h5>
                        </div>
                        <div className="taskCard-line d-flex align-items-center justify-content-between">
                            <span>Customer</span>
                            <span
                                className='taskCard-customer fw-bold'>
                                {taskData.customerId.name}
                            </span>
                        </div>
                        <div className="taskCard-line d-flex align-items-center justify-content-between">
                            <span>Priority</span>
                            <PriorityIcon text={taskData.priority} />
                        </div>
                        <div className="taskCard-line d-flex align-items-center justify-content-between">
                            <span>Start</span>
                            <span
                                className='taskCard-end'>
                                {taskData.start}
                            </span>
                        </div>
                        <div className="taskCard-line d-flex align-items-center justify-content-between">
                            <span>End</span>
                            <span
                                className='taskCard-end'>
                                {taskData.end}
                            </span>
                        </div>
                    </div>
                    <div className='taskCard-billing-container'>
                        <p className='taskCard-billing'>Billing</p>
                        <div className='d-flex align-items-center justify-content-between'>
                            <span>Total</span>
                            <div className='position-relative'>
                                <span className='taskCard-amount-icon text-muted'>€</span>
                                <input
                                    className='taskCard-amount-input'
                                    value={taskData.amount.total}
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
                                    value={taskData.amount.invoice}
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
                                    value={taskData.amount.residual}
                                    type="number"
                                    step='0.01'
                                    min='0'
                                    disabled />
                            </div>
                        </div>
                    </div>
                    <div className='taskCard-employees'>
                        <SliderContainer
                            items={taskData.employeeId.map((employee, index) => {
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

export default NewCard
