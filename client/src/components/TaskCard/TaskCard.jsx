import React from 'react';
import ModifyIcon from '../icons/ModifyIcon/ModifyIcon';
import DeleteIcon from '../icons/DeleteIcon/DeleteIcon';
import SliderContainer from '../SliderContainer/SliderContainer';
import StatusIcon from '../StatusIcon/StatusIcon';
import './taskCard.css';

const TaskCard =
    ({
        taskData,
        session,
        tooltipActive,
        onClickModify,
        onClickDelete,
        onClickComment,
        onChangeStatus,
        loaderUpdating
    }) => {
        return (
            <div className="card task-card-container">
                {session.role === 'user' ?
                    <div className='taskCard-dummy-icon mb-1'>
                        {loaderUpdating.command && loaderUpdating.id === taskData._id ?
                            <span className="taskCard-loader"></span>
                            :
                            <StatusIcon
                                onChange={onChangeStatus}
                                text={taskData.status}
                            />
                        }
                    </div>
                    :
                    <div
                        className='taskCard-icon d-flex justify-content-between align-items-center mb-1'>
                        {loaderUpdating.command && loaderUpdating.id === taskData._id ?
                            <span className="taskCard-loader"></span>
                            :
                            <StatusIcon
                                onChange={onChangeStatus}
                                text={taskData.status}
                            />
                        }
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
                <div
                    onClick={onClickComment}
                    className="card-block task-card">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-auto">
                            <div className='task-img-container'>
                                <img
                                    className="task-img rounded-circle"
                                    src={taskData.customerId.logo}
                                    alt="dashboard-user" />
                            </div>
                        </div>
                        <div className="col">
                            <h5>{taskData.customerId.name}</h5>
                        </div>
                    </div>
                    <ul className="task-list-task">
                        <li>
                            <i className="task-icon bg-c-green" />
                            <h6 className='task-list-data'>
                                Title
                            </h6>
                            <p className="text-muted">
                                {taskData.title}
                            </p>
                        </li>
                        <li>
                            <i className="task-icon" />
                            <h6 className='task-list-data'>
                                Priority
                            </h6>
                            <p className="text-muted">
                                {taskData.priority}
                            </p>
                        </li>
                        <li>
                            <i className="task-icon bg-c-green" />
                            <h6 className='task-list-data'>
                                Start
                            </h6>
                            <p className="text-muted">
                                {taskData.start}
                            </p>
                        </li>
                        <li>
                            <i className="task-icon bg-c-green" />
                            <h6 className='task-list-data'>
                                End
                            </h6>
                            <p className="text-muted">
                                {taskData.end}
                            </p>
                        </li>
                    </ul>
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
        )
    }

export default TaskCard;
