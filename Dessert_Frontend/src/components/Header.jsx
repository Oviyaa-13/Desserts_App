import React, { useEffect } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logout } from '../redux/userSlice';
import setCart from '../redux/cartSlice';

const Header = (props) => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      getCart();
    }
  }, [token]);

  const getCart = async () => {
    const res = await axios.get("http://localhost:3000/getCart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setCart(res.data.products));
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    localStorage.removeItem('token'); // Clear token from local storage
    localStorage.removeItem('role');  // Clear role from local storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className='navigation'>
      <ul className='nav-left'>
        <li><Link to="/" className='logo'>Dessert Paradise</Link></li>
      </ul>
      <ul className='nav-right'>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/cart">Cart: {cartItems.length}</Link></li>
        {token ? (
          <li className="logout" onClick={handleLogout}>Logout</li> 
        ) : (
          <li><Link to="/login" className="link">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Header;


