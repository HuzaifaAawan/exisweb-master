import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://58.65.189.226:884/api/login', // Your login API endpoint
        { username, password },
        { withCredentials: true }
      );

      // If the server sends a token:
      localStorage.setItem('token', response.data.token);

      // Redirect to vehicle page
      navigate('/vehicle');
    } catch (error) {
      alert('Login failed');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
