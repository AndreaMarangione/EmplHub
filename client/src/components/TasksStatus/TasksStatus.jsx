import React, { useEffect, useState } from 'react';
import './tasksStatus.css';

const TasksStatus = ({ tasks }) => {
    const [pending, setPending] = useState(0);
    const [inProgress, setInProgress] = useState(0);
    const [done, setDone] = useState(0);
    const handleTasksStatus = () => {
        const tasksPending = tasks.filter(task => task.status === 'Pending');
        const tasksInProgress = tasks.filter(task => task.status === 'In Progress');
        const tasksDone = tasks.filter(task => task.status === 'Done');
        setPending(tasksPending.length);
        setInProgress(tasksInProgress.length);
        setDone(tasksDone.length);
    }
    useEffect(() => {
        handleTasksStatus();
    }, [tasks])
    return (
        <div className='tasksStatus-container'>
            <h3>Tasks Status</h3>
            <div className='taskStatus-data'>
                <div className='d-flex align-items-center justify-content-between'>
                    <p className='text-muted m-0'>Pending:</p>
                    <h5 className='tasksStatus-pending m-0'>{pending}</h5>
                </div>
                <div className='d-flex align-items-center justify-content-between'>
                    <p className='text-muted m-0'>In Progress:</p>
                    <h5 className='tasksStatus-inProgress m-0'>{inProgress}</h5>
                </div>
                <div className='d-flex align-items-center justify-content-between'>
                    <p className='text-muted m-0'>Done:</p>
                    <h5 className='tasksStatus-done m-0'>{done}</h5>
                </div>
            </div>
        </div>
    )
}

export default TasksStatus;
