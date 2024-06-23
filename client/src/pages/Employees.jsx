import React, { useEffect, useState } from 'react';
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
import './css/employee.css';

const Employees = () => {
    const api = new AxiosApi();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { session } = useSession();
    const [employees, setEmployees] = useState([]);
    const [searchEmployee, setSearchEmployee] = useState('');
    const [refresh, setRefresh] = useState(false);
    const showFilteredEmployee = () => {
        const filteredEmployee = employees.filter(employee =>
            employee.name.toLowerCase().includes(searchEmployee.toLowerCase()));
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
        try {
            const response = await api.get('/employee');
            if (response.statusText) {
                setEmployees(response.data);
            }
        } catch (error) {
            console.error(error.response.data);
        }
    }
    const columns = [
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
        },
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
                <ModifyIcon
                    classStyle='table-employee-modify-icon'
                    tooltipActive={true}
                    tooltipMessage='Modify Employee'
                    onClick={() => navigate(`/employees/modify?id=${employee._id}`)} />
                <DeleteIcon
                    classStyle='table-employee-delete-icon'
                    tooltipActive={true}
                    tooltipMessage='Delete Employee' />
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
                    <div className='d-flex align-items-center position-relative mb-5'>
                        <div className='position-relative w-100'>
                            <SearchIcon classStyle='list-employee-search-icon' />
                            <input
                                onChange={checkInputValue}
                                className='list-employee-input'
                                type="text"
                                placeholder='Search here...' />
                        </div>
                        <button
                            onClick={showFilteredEmployee}
                            className='list-employee-btn'>
                            Search
                        </button>
                        <button onClick={handleNavCreateEmployee}
                            className='list-employee-create-btn'>
                            +
                        </button>
                    </div>
                    <MyTable columns={columns} data={data} />
                </div>
            </div >
        } />
    )
}

export default Employees;
