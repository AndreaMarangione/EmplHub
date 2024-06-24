import React from 'react';
import Toast from 'react-bootstrap/Toast';
import './toast.css';

const MyToast =
    ({
        show,
        handleShow,
        imgSrc,
        classStyle,
        body
    }) => {
        return (
            <Toast
                className={classStyle}
                show={show}
                onClose={handleShow}>
                <Toast.Header>
                    <img
                        src={imgSrc}
                        className='myToast-img me-2'
                        alt="profile"
                    />
                    <strong className="me-auto">Emplhub</strong>
                </Toast.Header>
                <Toast.Body>{body}</Toast.Body>
            </Toast>
        )
    }

export default MyToast;
