import React, { useEffect } from 'react';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';
import { useDispatch } from "react-redux";
import { login } from '../redux/sessionSlice';

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
    <MainLayout childrens={''} />
  )
}

export default Dashboard;
