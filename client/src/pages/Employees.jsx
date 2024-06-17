import React from 'react';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';

const Employees = () => {
    const { sessionData } = useSession();
    return (
        <MainLayout childrens={''} />
    )
}

export default Employees;
