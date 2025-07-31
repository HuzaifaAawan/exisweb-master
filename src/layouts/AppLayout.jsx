import React from 'react';
import Sidebar from '../components/side-bar'; 
import { Outlet } from 'react-router-dom';
import Header from '../components/top-bar';

const AppLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        
          <Outlet />
        
      </div>
    </div>
  );
};

export default AppLayout;
