import React, { useEffect } from 'react';
import useSession from '../Hooks/useSession';
import { useDispatch, useSelector } from "react-redux";
import { loginState, login } from '../redux/sessionSlice';
import MainLayout from '../Layout/MainLayout';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { session } = useSession();
  const sessionData = useSelector(loginState);
  useEffect(() => {
    if (session) {
      dispatch(login(session));
    }
  }, []);
  return (
    <MainLayout childrens={''} />
  )
}

export default Dashboard;
