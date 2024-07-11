import React from 'react';
import ChangeArrowIcon from '../icons/ChangeArrowIcon/ChangeArrowIcon';
import './profileDropdown.css';

const ProfileDropdown =
    ({
        sessionData,
        classStyle,
        onChange,
        onClick,
        showLoader,
        serverRes
    }) => {
        return (
            <div className={`card ${classStyle}`}>
                <div className="card-block profile-card">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-auto">
                            <div className='task-img-container'>
                                <img
                                    className="task-img rounded-circle"
                                    src={sessionData.avatar}
                                    alt="dashboard-user" />
                            </div>
                        </div>
                        <div className="col">
                            <h5>{sessionData.name} {sessionData.surname}</h5>
                        </div>
                    </div>
                    <ul className="task-list-profile">
                        <li>
                            <i className="task-icon" />
                            <h6 className='task-list-data'>
                                Email
                            </h6>
                            <p className="task-email text-muted">
                                {sessionData.email}
                            </p>
                        </li>
                        <li>
                            <i className="task-icon bg-c-green" />
                            <h6 className='task-list-data'>
                                Date of birthday
                            </h6>
                            <p className="text-muted">
                                {sessionData.dateOfBirthday}
                            </p>
                        </li>
                    </ul>
                    <p
                        onClick={onClick}
                        className='dropdown-profile-password'>
                        Change your password
                    </p>
                </div>
            </div>
        )
    }

export default ProfileDropdown;
