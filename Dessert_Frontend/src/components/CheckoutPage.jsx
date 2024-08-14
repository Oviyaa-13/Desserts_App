import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const [userDetails, setUserDetails] = useState({ name: '', address: '', phoneno: '' });
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrderDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handlePlaceOrder = () => {
    if (!userDetails.name || !userDetails.address || !userDetails.phoneno) {
      toast.error('Please fill in all the details.');
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to proceed.');
      return;
    }

    fetch('http://localhost:5000/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...userDetails,
        products: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      if (data.msg === 'Order created successfully') {
        toast.success('Order placed successfully!');
        dispatch(clearCart());
        navigate('/admin/orders'); 
      } else {
        toast.error('Failed to place order. Please try again.');
      }
    })
    .catch((error) => {
      console.error('Error during checkout:', error);
      toast.error('Failed to place order. Please try again.');
    });
  };

  return (
    <div className='checkoutpage'>
      <h3>Enter Order Details</h3>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={userDetails.name}
        onChange={handleOrderDetailsChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={userDetails.address}
        onChange={handleOrderDetailsChange}
      />
      <input
        type="text"
        name="phoneno"
        placeholder="Phone Number"
        value={userDetails.phoneno}
        onChange={handleOrderDetailsChange}
      />
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default CheckoutPage;
