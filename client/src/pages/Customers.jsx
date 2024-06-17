import React from 'react';
import useSession from '../Hooks/useSession';
import MainLayout from '../Layout/MainLayout';

const Customers = () => {
    const { sessionData } = useSession();
    return (
        <MainLayout childrens={''} />
    )
}

export default Customers;
