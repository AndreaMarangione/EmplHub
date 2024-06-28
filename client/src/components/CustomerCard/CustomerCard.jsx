import React, { useEffect, useState } from 'react';
import ModifyIcon from '../icons/ModifyIcon/ModifyIcon';
import DeleteIcon from '../icons/DeleteIcon/DeleteIcon';
import './customerCard.css';

const CustomerCard =
    ({
        session,
        customerData,
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
            <div className='customerCard d-flex flex-column align-items-center gap-3'>
                {session.role === 'admin' ?
                    <div className='d-flex align-self-end gap-2'>
                        <ModifyIcon
                            classStyle='customerCard-modify-icon'
                            onClick={onClickModify} />
                        <DeleteIcon
                            classStyle='customerCard-delete-icon'
                            onClick={onClickDelete} />
                    </div>
                    :
                    <div className='customerCard-dummy-icon'></div>
                }
                <div className='customerCard-img-container'>
                    <img
                        className='customerCard-img'
                        src={customerData.logo}
                        alt="logo" />
                </div>
                <div className='d-flex flex-column align-self-start gap-1'>
                    <span
                        className='fw-bold'>
                        {customerData.name}
                    </span>
                    <span
                        className='customerCard-data'>
                        {customerData.email}
                    </span>
                    <span
                        className='customerCard-data'>
                        {since}
                    </span>
                </div>
            </div>
        )
    }

export default CustomerCard;
