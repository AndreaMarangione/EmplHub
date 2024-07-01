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
            <div className='taskCard d-flex flex-column align-items-center gap-3'>
                {data.role === 'admin' ?
                    <div className='taskCard-dummy-icon'>
                        <span>{data.status}</span>
                        <span>{created}</span>
                    </div>
                    :
                    <>
                        <span>{data.status}</span>
                        <div className='d-flex align-self-end gap-2'>
                            <ModifyIcon
                                classStyle='taskCard-modify-icon'
                                onClick={onClickModify} />
                            <DeleteIcon
                                classStyle='taskCard-delete-icon'
                                onClick={onClickDelete} />
                        </div>
                        <span>{created}</span>
                    </>
                }
                <div className='taskCard-header'>
                    <h3>{data.title}</h3>
                </div>
                <div className='d-flex flex-column align-self-start gap-1'>
                    <span
                        className='fw-bold'>
                        {data.customerId.name}
                    </span>
                    <div>
                        <span
                            className='taskCard-data'>
                            {data.end}
                        </span>
                        <span
                            className='taskCard-data'>
                            {data.priority}
                        </span>
                    </div>
                </div>
            </div>
        )
    }

export default TaskCard;
