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
                                {showLoader ?
                                    <div className='dropdown-loader-container'>
                                        <span className="loader"></span>
                                    </div>
                                    :
                                    <>
                                        <img
                                            className="task-img rounded-circle"
                                            src={sessionData.avatar}
                                            alt="dashboard-user" />
                                        <input
                                            onChange={onChange}
                                            className='dropdown-change-image'
                                            type="file"
                                            id="file"
                                            name='profileImage'
                                        />
                                        <label className='dropdown-image-label' htmlFor='file'>
                                            <ChangeArrowIcon classStyle='dropdown-image-input' />
                                        </label>
                                    </>
                                }
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
