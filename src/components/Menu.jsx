<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <aside className="w-64 bg-white shadow-md h-full p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Navigation</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/" className="block px-3 py-2 rounded hover:bg-gray-100">🏠 Home</Link>
        </li>
        <li>
          <Link to="/login" className="block px-3 py-2 rounded hover:bg-gray-100">🔐 Login</Link>
        </li>
        <li>
          <Link to="/registration" className="block px-3 py-2 rounded hover:bg-gray-100">📄 Reserve Number</Link>
        </li>
        <li>
          <Link to="/vehicle-details" className="block px-3 py-2 rounded hover:bg-gray-100">🚗 Vehicle Details</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Menu;
=======
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <aside className="w-64 bg-white shadow-md h-full p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Navigation</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/" className="block px-3 py-2 rounded hover:bg-gray-100">🏠 Home</Link>
        </li>
        <li>
          <Link to="/login" className="block px-3 py-2 rounded hover:bg-gray-100">🔐 Login</Link>
        </li>
        <li>
          <Link to="/registration" className="block px-3 py-2 rounded hover:bg-gray-100">📄 Reserve Number</Link>
        </li>
        <li>
          <Link to="/vehicle-details" className="block px-3 py-2 rounded hover:bg-gray-100">🚗 Vehicle Details</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Menu;
>>>>>>> 204ba91b83a6982270dbd52da0ed502f56ee68e0
