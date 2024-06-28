import React, { useState, useEffect } from 'react';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import { useDispatch } from "react-redux";
import { login } from '../redux/sessionSlice';
import { useNavigate } from 'react-router-dom';
import AxiosApi from '../class/axiosApi';
import SearchIcon from '../components/icons/SearchIcon/SearchIcon';
import MyTable from '../components/MyTable/MyTable';
import ModifyIcon from '../components/icons/ModifyIcon/ModifyIcon';
import DeleteIcon from '../components/icons/DeleteIcon/DeleteIcon';
import MyToast from '../components/Toast/Toast';
import useWindowSize from '../Hooks/useWindowsSize';
import CustomerCard from '../components/CustomerCard/CustomerCard';
import './css/customer.css';

const Customers = () => {
    const api = new AxiosApi();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { session } = useSession();
    const { width } = useWindowSize();
    const [customers, setCustomers] = useState([]);
    const [singleCustomer, setSingleCustomer] = useState({});
    const [customerLoader, setCustomerLoader] = useState(false);
    const [deleteLoader, setDeleteLoader] = useState(false);
    const [mobileLoader, setMobileLoader] = useState(false);
    const [searchCustomer, setSearchCustomer] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const handleGetLoader = (command) => setCustomerLoader(command);
    const handleDeleteLoader = (command) => setDeleteLoader(command);
    const handleMobileLoader = (command) => setMobileLoader(command);
    const handleHideToast = () => setShowToast(false);
    const handleShowToast = (id) => {
        handleGetLoader(true);
        setShowToast(!showToast);
        getSingleCustomer(id);
    };
    const showFilteredCustomer = () => {
        const filteredCustomer = customers.filter(customer =>
            customer.name.toLowerCase().includes(searchCustomer.toLowerCase()));
        setCustomers(filteredCustomer);
    }
    const checkInputValue = (e) => {
        setSearchCustomer(e.target.value);
        if (e.target.value === "") {
            setRefresh(!refresh);
        }
    }
    const handleNavCreateCustomer = () => {
        navigate('/customers/create');
    }
    const getCustomers = async () => {
        handleMobileLoader(true);
        try {
            const response = await api.get('/customer');
            if (response.statusText) {
                setCustomers(response.data);
            }
        } catch (error) {
            console.error(error.response.data);
        } finally {
            handleMobileLoader(false);
        }
    }
    const getSingleCustomer = async (id) => {
        try {
            const response = await api.get(`/customer/${id}`);
            if (response.statusText) {
                setSingleCustomer(response.data);
            }
        } catch (error) {
            console.error(error.response.data);
        } finally {
            handleGetLoader(false);
        }
    }
    const deleteSingleCustomer = async (id) => {
        handleDeleteLoader(true);
        try {
            await api.delete(`/customer/delete/${id}`);
        } catch (error) {
            console.error(error.response.data);
        } finally {
            handleDeleteLoader(false);
            handleHideToast();
            setRefresh(!refresh);
        }
    }
    const columns = [
        {
            name: 'Logo',
            selector: row => row.logo,
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Since',
            selector: row => row.since,
        },
        {
            name: 'Setting',
            selector: row => row.setting,
        },
    ];
    const data = customers.map((customer, index) => {
        const year = customer.createdAt.slice(0, 4);
        const month = customer.createdAt.slice(5, 7);
        const day = customer.createdAt.slice(8, 10);
        const since = `${day}/${month}/${year}`;
        return {
            id: index,
            logo: <img
                className='table-customer-image'
                src={customer.logo}
                alt="logo" />,
            name: customer.name,
            email: customer.email,
            since,
            setting: <>
                {session.role === 'admin' ?
                    <>
                        <ModifyIcon
                            classStyle='table-customer-modify-icon'
                            tooltipActive={true}
                            tooltipMessage='Modify'
                            onClick={() => navigate(`/customers/modify?id=${customer._id}`)} />
                        <DeleteIcon
                            classStyle='table-customer-delete-icon'
                            tooltipActive={true}
                            tooltipMessage='Delete'
                            onClick={() => handleShowToast(customer._id)} />
                    </>
                    :
                    null
                }
            </>
        }
    })
    useEffect(() => {
        if (session) {
            dispatch(login(session));
        }
        getCustomers();
        // eslint-disable-next-line
    }, [refresh]);
    return (
        <MainLayout childrens={
            <div className='p-5 d-flex justify-content-center'>
                <div className='list-customer-container'>
                    <div className='d-flex flex-column gap-2 gap-md-0 flex-lg-row align-items-center position-relative mb-5'>
                        <div className='position-relative w-100'>
                            <SearchIcon classStyle='list-customer-search-icon' />
                            <input
                                onChange={checkInputValue}
                                className='list-customer-input'
                                type="text"
                                placeholder='Search here...' />
                        </div>
                        <button
                            onClick={showFilteredCustomer}
                            className='list-customer-btn'>
                            Search
                        </button>
                        {width > 768 ?
                            <button onClick={handleNavCreateCustomer}
                                className='list-customer-create-btn'>
                                +
                            </button>
                            :
                            <button
                                onClick={handleNavCreateCustomer}
                                className='list-employee-create-mobile-btn'>
                                Create new customer
                            </button>
                        }
                    </div>
                    {width > 768 ?
                        <>
                            <MyTable columns={columns} data={data} />
                            <MyToast
                                show={showToast}
                                handleShow={handleHideToast}
                                imgSrc={singleCustomer.logo}
                                classStyle='myToast-style'
                                body={customerLoader ?
                                    <div className='d-flex justify-content-center'>
                                        <span className="single-customer-loader"></span>
                                    </div>
                                    :
                                    <div className='d-flex flex-column gap-2'>
                                        <strong className='m-0'>Are you sure you want delete this customer?</strong>
                                        <div className='d-flex gap-1'>
                                            <span>{singleCustomer.name}</span>
                                        </div>
                                        <p className='m-0'>{singleCustomer.email}</p>
                                        <div className='d-flex gap-2'>
                                            <button
                                                onClick={handleHideToast}
                                                className='toast-button-cancel'>
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => deleteSingleCustomer(singleCustomer._id)}
                                                className='toast-button-delete'>
                                                {deleteLoader ?
                                                    <span className="delete-customer-loader"></span>
                                                    :
                                                    'Delete'
                                                }
                                            </button>
                                        </div>
                                    </div>
                                }
                            />
                        </>
                        :
                        <div className='row row-gap-5'>
                            {mobileLoader ?
                                <div>
                                    <span className="mobile-customer-loader"></span>
                                </div>
                                :
                                <>
                                    {customers.map((customer, index) => {
                                        return <div
                                            key={index}
                                            className="col-12 col-md-6 d-flex justify-content-center" >
                                            <CustomerCard
                                                session={session}
                                                customerData={customer}
                                                onClickModify={() => navigate(`/customer/modify?id=${customer._id}`)}
                                                onClickDelete={() => handleShowToast(customer._id)}
                                            />
                                        </div>
                                    })}
                                    <MyToast
                                        show={showToast}
                                        handleShow={handleHideToast}
                                        imgSrc={singleCustomer.logo}
                                        classStyle='myToast-style'
                                        body={customerLoader ?
                                            <div className='d-flex justify-content-center'>
                                                <span className="single-customer-loader"></span>
                                            </div>
                                            :
                                            <div className='d-flex flex-column gap-2'>
                                                <strong className='m-0'>Are you sure you want delete this customer?</strong>
                                                <div className='d-flex gap-1'>
                                                    <span>{singleCustomer.name}</span>
                                                </div>
                                                <p className='m-0'>{singleCustomer.email}</p>
                                                <div className='d-flex gap-2'>
                                                    <button
                                                        onClick={handleHideToast}
                                                        className='toast-button-cancel'>
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => deleteSingleCustomer(singleCustomer._id)}
                                                        className='toast-button-delete'>
                                                        {deleteLoader ?
                                                            <span className="delete-customer-loader"></span>
                                                            :
                                                            'Delete'
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                        }
                                    />
                                </>
                            }
                        </div>
                    }
                </div>
            </div >
        } />
    )
}

export default Customers;
