import React from 'react';
import Sidebar from '../components/side-bar'; 
import { Outlet } from 'react-router-dom';
import Header from '../components/top-bar';

const AppLayout = () => {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ padding: '1rem', flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
