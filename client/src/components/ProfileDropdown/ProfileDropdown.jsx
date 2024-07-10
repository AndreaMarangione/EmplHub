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
            <div className={classStyle}>
                <div className='dropdown-arrow' />
                <div className='d-flex flex-column align-items-center gap-3 position-relative'>
                    {showLoader ?
                        <div className='dropdown-loader-container'>
                            <span className="loader"></span>
                        </div>
                        :
                        <div className='dropdown-image-container'>
                            <img className='dropdown-image' src={sessionData.avatar} alt="profile" />
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
                        </div>
                    }
                    {serverRes ?
                        <div className='dropdown-image-error'>{serverRes.message}</div>
                        :
                        null
                    }
                    <div>
                        <div className='dropdown-profile-data'>
                            <label>Name</label>
                            <p>{sessionData.name}</p>
                        </div>
                        <div className='dropdown-profile-data'>
                            <label>Surname</label>
                            <p>{sessionData.surname}</p>
                        </div>
                        <div className='dropdown-profile-data'>
                            <label>Email</label>
                            <p>{sessionData.email}</p>
                        </div>
                        <div className='dropdown-profile-data'>
                            <label>Date of birthday</label>
                            <p>{sessionData.dateOfBirthday}</p>
                        </div>
                    </div>
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
