import React, { useEffect } from 'react';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import { useDispatch } from "react-redux";
import { login } from '../redux/sessionSlice';
import WelcomeUser from '../components/WelcomeUser/WelcomeUser';
import MyCalendar from '../components/MyCalendar/MyCalendar';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { session } = useSession();
  useEffect(() => {
    if (session) {
      dispatch(login(session));
    }
    // eslint-disable-next-line
  }, []);
  return (
    <MainLayout childrens={
      <div className='p-5'>
        <div className='row'>
          <div className="col-8">
            <WelcomeUser userData={session} />
            <MyCalendar />
          </div>
        </div>
      </div>
    } />
  )
}

export default Dashboard;
