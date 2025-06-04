import React from 'react';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <>
        <h1>Hi</h1>
        <Outlet />
        </>
    );
};

export default MainLayout;