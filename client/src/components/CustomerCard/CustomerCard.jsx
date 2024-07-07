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
            <div className="customerCard-wrapper">
                <div className="customerCard-note">
                    <div className="customerCard-spiral-part">
                        <div className="customerCard-spiral">
                            <div className="customerCard-hole"></div>
                            <div className="customerCard-wire"></div>
                        </div>
                        <div className="customerCard-spiral">
                            <div className="customerCard-hole"></div>
                            <div className="customerCard-wire"></div>
                        </div>
                        <div className="customerCard-spiral">
                            <div className="customerCard-hole"></div>
                            <div className="customerCard-wire"></div>
                        </div>
                        <div className="customerCard-spiral">
                            <div className="customerCard-hole"></div>
                            <div className="customerCard-wire"></div>
                        </div>
                        <div className="customerCard-spiral">
                            <div className="customerCard-hole"></div>
                            <div className="customerCard-wire"></div>
                        </div>
                        <div className="customerCard-spiral">
                            <div className="customerCard-hole"></div>
                            <div className="customerCard-wire"></div>
                        </div>
                    </div>
                    <div className="customerCard-note-lines">
                        <div className="customerCard-line">
                            {session.role === 'user' ?
                                <div className='customerCard-dummy-icon' />
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
                        </div>
                        <div className='d-flex justify-content-center align-items-center my-2'>
                            <div className='customerCard-img-container'>
                                <img
                                    className='customerCard-img'
                                    src={customerData.logo}
                                    alt="logo" />
                            </div>
                        </div>
                        <div className="customerCard-line">
                            <span
                                className='fw-bold'>
                                {customerData.name}
                            </span>
                        </div>
                        <div className="customerCard-line">
                            <span
                                className='customerCard-data'>
                                {customerData.email}
                            </span>
                        </div>
                        <div className="customerCard-line">
                            <span
                                className='customerCard-data'>
                                <span className='text-muted'>Since:</span> {since}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default CustomerCard;
