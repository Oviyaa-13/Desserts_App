import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setUser } from '../redux/userSlice'; // Corrected import
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
  
      console.log('Login response data:', response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Token stored:', response.data.token);
        dispatch(setUser({ token: response.data.token, role: response.data.role }));
        navigate(response.data.role === 'admin' ? '/admin/orders' : '/');
      } else {
        console.error('Token not received from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };
  

  return (
    <div className="auth-container">
      <div className="auth-page login-page">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="primary-btn">Login</button>
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;

