import React from 'react';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';

const Dashboard = () => {
  const { sessionData } = useSession();
  return (
    <MainLayout childrens={''} />
  )
}

export default Dashboard;
