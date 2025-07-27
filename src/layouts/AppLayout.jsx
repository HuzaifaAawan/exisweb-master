<<<<<<< HEAD
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
=======
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
>>>>>>> 204ba91b83a6982270dbd52da0ed502f56ee68e0
