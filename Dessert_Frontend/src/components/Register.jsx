// import React, { useState } from 'react';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { setToken } from '../redux/userSlice'; // Import your action

// const Register = () => {
//   const [name, setName] = useState(''); // Changed back to 'name'
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
  
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/register', {
//         name, // Changed back to 'name'
//         email,
//         password,
//       });

//       if (response && response.data) {
//         console.log('Registration successful:', response.data);

//         // Assuming the response contains the token
//         dispatch(setToken({ token: response.data.token })); // Adjust payload structure if needed

//         setSuccess('Registration successful!');
//         navigate('/'); // Redirect to login page or another page
//       } else {
//         throw new Error('Unexpected response format');
//       }
//     } catch (err) {
//       console.error('Registration error:', err);
//       setError('Registration failed. Please try again.');
//       toast.error('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <div className="auth-page">
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <div className="form-group">
//           <label>Name:</label>
//           <input
//             type="text"
//             value={name} // Changed back to 'name'
//             onChange={(e) => setName(e.target.value)} // Changed back to 'name'
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         {error && <div className="error">{error}</div>}
//         {success && <div className="success">{success}</div>}
//         <button type="submit" className="primary-btn">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;import React, { useState } from 'react';
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setUser } from '../redux/userSlice'; // Import setUser action
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to 'user' role
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', {
        name,
        email,
        password,
        role, // Include role in the registration request
      });

      dispatch(setUser({ token: response.data.token, role: response.data.role }));
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      toast.success('Registration successful!');

      // Redirect based on role
      navigate(response.data.role === 'admin' ? '/admin/orders' : '/');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-page register-page">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="primary-btn">Register</button>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
