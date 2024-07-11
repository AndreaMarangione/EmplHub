import React, { useEffect, useState } from 'react';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import { useDispatch } from "react-redux";
import { login } from '../redux/sessionSlice';
import { useNavigate } from 'react-router-dom';
import AxiosApi from '../class/axiosApi';
import MyTable from '../components/MyTable/MyTable';
import ModifyIcon from '../components/icons/ModifyIcon/ModifyIcon';
import DeleteIcon from '../components/icons/DeleteIcon/DeleteIcon';
import MyToast from '../components/Toast/Toast';
import useWindowSize from '../Hooks/useWindowsSize';
import EmployeeCard from '../components/EmployeeCard/EmployeeCard';
import SearchbarAdmin from '../components/SearchbarAdmin/SearchbarAdmin';
import SearchbarUser from '../components/SearchbarUser/SearchbarUser';
import './css/employee.css';

const Employees = () => {
    const api = new AxiosApi();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { session } = useSession();
    const { width } = useWindowSize();
    const [employees, setEmployees] = useState([]);
    const [singleEmployee, setSingleEmployee] = useState({});
    const [employeeLoader, setEmployeeLoader] = useState(false);
    const [deleteLoader, setDeleteLoader] = useState(false);
    const [mobileLoader, setMobileLoader] = useState(false);
    const [searchEmployee, setSearchEmployee] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const handleGetLoader = command => setEmployeeLoader(command);
    const handleDeleteLoader = command => setDeleteLoader(command);
    const handleMobileLoader = command => setMobileLoader(command);
    const handleHideToast = () => setShowToast(false);
    const handleShowToast = (id) => {
        handleGetLoader(true);
        setShowToast(!showToast);
        getSingleEmployee(id);
    };
    const showFilteredEmployee = () => {
        const filteredEmployee = employees.filter(employee => {
            return employee.name.toLowerCase().includes(searchEmployee.toLowerCase())
                ||
                employee.surname.toLowerCase().includes(searchEmployee.toLowerCase())
        });
        setEmployees(filteredEmployee);
    }
    const checkInputValue = (e) => {
        setSearchEmployee(e.target.value);
        if (e.target.value === "") {
            setRefresh(!refresh);
        }
    }
    const handleNavCreateEmployee = () => {
        navigate('/employees/create');
    }
    const getEmployees = async () => {
        handleMobileLoader(true);
        try {
            const response = await api.get('/employee');
            if (response.statusText) {
                setEmployees(response.data);
            }
        } catch (error) {
            console.error(error.response.data);
        } finally {
            handleMobileLoader(false);
        }
    }
    const getSingleEmployee = async (id) => {
        try {
            const response = await api.get(`/employee/${id}`);
            if (response.statusText) {
                setSingleEmployee(response.data);
            }
        } catch (error) {
            console.error(error.response.data);
        } finally {
            handleGetLoader(false);
        }
    }
    const deleteSingleEmployee = async (id) => {
        handleDeleteLoader(true);
        try {
            await api.delete(`/employee/delete/${id}`);
        } catch (error) {
            console.error(error.response.data);
        } finally {
            handleDeleteLoader(false);
            handleHideToast();
            setRefresh(!refresh);
        }
    }
    const adminColumns = [
        {
            name: 'Avatar',
            selector: row => row.avatar,
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Surname',
            selector: row => row.surname,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Birthday',
            selector: row => row.birthday,
        },
        {
            name: 'Hired',
            selector: row => row.hired,
        },
        {
            name: 'Setting',
            selector: row => row.setting,
        }
    ];
    const userColumns = [
        {
            name: 'Avatar',
            selector: row => row.avatar,
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Surname',
            selector: row => row.surname,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Birthday',
            selector: row => row.birthday,
        },
        {
            name: 'Hired',
            selector: row => row.hired,
        }
    ];
    const data = employees.map((employee, index) => {
        const year = employee.createdAt.slice(0, 4);
        const month = employee.createdAt.slice(5, 7);
        const day = employee.createdAt.slice(8, 10);
        const hired = `${day}/${month}/${year}`;
        return {
            id: index,
            avatar: <img
                className='table-employee-image'
                src={employee.avatar}
                alt="profile" />,
            name: employee.name,
            surname: employee.surname,
            email: employee.email,
            birthday: employee.dateOfBirthday,
            hired,
            setting: <>
                {employee.role === 'admin' ?
                    ''
                    :
                    <div className='d-flex gap-2'>
                        <ModifyIcon
                            classStyle='table-employee-modify-icon'
                            tooltipActive={true}
                            tooltipMessage='Modify'
                            onClick={() => navigate(`/employees/modify?id=${employee._id}`)} />
                        <DeleteIcon
                            classStyle='table-employee-delete-icon'
                            tooltipActive={true}
                            tooltipMessage='Delete'
                            onClick={() => handleShowToast(employee._id)} />
                    </div>
                }
            </>
        }
    })
    useEffect(() => {
        if (session) {
            dispatch(login(session));
        }
        getEmployees();
        // eslint-disable-next-line
    }, [refresh]);
    return (
        <MainLayout childrens={
            <div className='p-5 d-flex justify-content-center'>
                <div className='list-employee-container'>
                    {session.role === 'admin' ?
                        <SearchbarAdmin
                            checkInputValue={checkInputValue}
                            showFiltered={showFilteredEmployee}
                            handleNavCreate={handleNavCreateEmployee}
                            textBtnCreate='Create new employee' />
                        :
                        <SearchbarUser
                            checkInputValue={checkInputValue}
                            showFiltered={showFilteredEmployee} />
                    }
                    {width > 768 ?
                        <div className='employee-table-container'>
                            <MyTable columns={session.role === 'admin' ? adminColumns : userColumns} data={data} />
                        </div>
                        :
                        <div className='row row-gap-5'>
                            {mobileLoader ?
                                <div>
                                    <span className="mobile-employee-loader"></span>
                                </div>
                                :
                                <>
                                    {employees.map((employee, index) => {
                                        return <div
                                            key={index}
                                            className="col-12 col-md-6 d-flex justify-content-center" >
                                            <EmployeeCard
                                                employeeData={employee}
                                                session={session}
                                                onClickModify={() => navigate(`/employees/modify?id=${employee._id}`)}
                                                onClickDelete={() => handleShowToast(employee._id)} />
                                        </div>
                                    })}
                                </>
                            }
                        </div>
                    }
                    <MyToast
                        show={showToast}
                        handleShow={handleHideToast}
                        imgSrc={singleEmployee.avatar}
                        classStyle='myToast-employee-style z-3'
                        body={employeeLoader ?
                            <div className='d-flex justify-content-center'>
                                <span className="single-employee-loader"></span>
                            </div>
                            :
                            <div className='d-flex flex-column gap-2'>
                                <strong className='m-0 text-muted'>Are you sure you want delete this employee?</strong>
                                <div className='d-flex gap-1'>
                                    <span className='text-muted'>{singleEmployee.name}</span>
                                    <span className='text-muted'>{singleEmployee.surname}</span>
                                </div>
                                <p className='m-0 text-muted'>{singleEmployee.email}</p>
                                <div className='d-flex gap-2'>
                                    <button
                                        onClick={handleHideToast}
                                        className='myToast-employee-btn-cancel text-muted'>
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => deleteSingleEmployee(singleEmployee._id)}
                                        className='myToast-employee-btn-delete text-muted'>
                                        {deleteLoader ?
                                            <span className="delete-employee-loader"></span>
                                            :
                                            'Delete'
                                        }
                                    </button>
                                </div>
                            </div>
                        }
                    />
                </div>
            </div >
        } />
    )
}

export default Employees;
