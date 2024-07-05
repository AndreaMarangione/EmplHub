import React, { useState, useEffect } from 'react';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import { useDispatch } from "react-redux";
import { login } from '../redux/sessionSlice';
import { useNavigate } from 'react-router-dom';
import WelcomeUser from '../components/WelcomeUser/WelcomeUser';
import MyCalendar from '../components/MyCalendar/MyCalendar';
import DashButton from '../components/DashButton/DashButton';
import AxiosApi from '../class/axiosApi';
import useWindowSize from '../Hooks/useWindowsSize';
import './css/dashboard.css';

const Dashboard = () => {
  const api = new AxiosApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { session } = useSession();
  const { width } = useWindowSize();
  const [tasks, setTasks] = useState([]);
  const [loader, setLoader] = useState(false);
  const handleLoader = command => setLoader(command);
  const getTasks = async () => {
    handleLoader(true);
    try {
      const response = await api.get('/task');
      if (response.statusText) {
        const data = response.data.map((task, index) => {
          let startDay = task.start.slice(0, 2);
          let startMonth = task.start.slice(3, 5);
          const startYear = task.start.slice(6, 10);
          let endDay = task.end.slice(0, 2);
          let endMonth = task.end.slice(3, 5);
          const endYear = task.end.slice(6, 10);
          if (startDay.startsWith('0')) {
            startDay = startDay.slice(1);
          }
          if (startMonth.startsWith('0')) {
            startMonth = startMonth.slice(1);
          }
          if (endDay.startsWith('0')) {
            endDay = endDay.slice(1);
          }
          if (endMonth.startsWith('0')) {
            endMonth = endMonth.slice(1);
          }
          return {
            id: index + 1,
            title: task.title,
            start: new Date(`${startYear}/${startMonth}/${startDay}`),
            end: new Date(`${endYear}/${endMonth}/${endDay}`)
          }
        })
        setTasks(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      handleLoader(false);
    }
  }
  useEffect(() => {
    if (session) {
      dispatch(login(session));
    }
    getTasks();
    // eslint-disable-next-line
  }, []);
  return (
    <MainLayout childrens={
      <div className='pt-5 p-lg-5'>
        <div className='row'>
          <div className="col-12 col-md-8">
            <WelcomeUser userData={session} />
            {width >= 768 ?
              <div className='calendar-container'>
                {loader ?
                  <span className="calendar-loader"></span>
                  :
                  <MyCalendar events={tasks} />
                }
              </div>
              :
              <div className='d-flex flex-column mt-5 gap-5'>
                <DashButton
                  classStyle={'dashButton-style'}
                  title='Create Employee'
                  description='Create a new employee'
                  onClick={() => navigate('/employees/create')}
                />
                <DashButton
                  classStyle={'dashButton-style'}
                  title='Create Customer'
                  description='Create a new customer'
                  onClick={() => navigate('/customers/create')}
                />
                <DashButton
                  classStyle={'dashButton-style'}
                  title='Create Task'
                  description='Create a new task'
                  onClick={() => navigate('/tasks/create')}
                />
              </div>
            }
          </div>
          {width >= 768 ?
            <div className="col-4 d-flex flex-column gap-5">
              <DashButton
                classStyle={'dashButton-style'}
                title='Create Employee'
                description='Create a new employee'
                onClick={() => navigate('/employees/create')}
              />
              <DashButton
                classStyle={'dashButton-style'}
                title='Create Customer'
                description='Create a new customer'
                onClick={() => navigate('/customers/create')}
              />
              <DashButton
                classStyle={'dashButton-style'}
                title='Create Task'
                description='Create a new task'
                onClick={() => navigate('/tasks/create')}
              />
            </div>
            :
            null
          }
        </div>
      </div>
    } />
  )
}

export default Dashboard;
