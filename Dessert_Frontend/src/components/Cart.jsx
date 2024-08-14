// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { incrementItem, decrementItem, removeItem, clearCart } from '../redux/cartSlice';
// import CartCard from '../components/CartCard';
// import Modal from './Modal';
// import "../App.css";
// import { toast } from 'react-toastify';

// const Cart = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [total, setTotal] = useState(0);
//   const [checkoutSuccess, setCheckoutSuccess] = useState(null);
//   const cartItems = useSelector((state) => state.cart.items);
//   const dispatch = useDispatch();

//   // Define deliveryFee here
//   const deliveryFee = 40;

//   useEffect(() => {
//     let sum = 0;
//     cartItems.forEach((item) => {
//       sum += item.price * item.quantity;
//     });
//     setTotal(sum);
//   }, [cartItems]);

//   const handleIncrement = (item) => {
//     dispatch(incrementItem(item));
//   };

//   const handleDecrement = (item) => {
//     dispatch(decrementItem(item));
//   };

//   const handleRemove = (item) => {
//     dispatch(removeItem(item));
//   };

//   const handleModalOpen = () => {
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };
  
//   const [userDetails, setUserDetails] = useState({
//     name: '',
//     address: '',
//     phoneno: '',
//   }); 
//   const handleOrderDetailsChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails({
//       ...userDetails,
//       [name]: value,
//     });
//   };
//   const handleCheckout = () => {
//     if (!userDetails.name || !userDetails.address || !userDetails.phoneno) {
//       toast.error('Please fill in all the details.');
//       return;
//     }
//     const token = localStorage.getItem('token');
//     console.log('Token retrieved for checkout:', token); // Ensure token is not null
  
//     if (!token) {
//       console.error('No token found. Please log in again.');
//       return;
//     }
//     if (!userDetails.name || !userDetails.address || !userDetails.phoneno) {
//       toast.error('Please fill in all the details.');
//       return;
//     }
//     fetch('http://localhost:5000/checkout', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure the token is set correctly
//       },
//       body: JSON.stringify({
//         ...userDetails,
//         products: cartItems.map(item => ({
//               productId: item.productId,
//               quantity: item.quantity,
//           })),
//       }),
//   }).then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         if (data.msg === 'Order created successfully') {
//           setCheckoutSuccess(true);
//           dispatch(clearCart());
//           handleModalOpen();
//         } else {
//           setCheckoutSuccess(false);
//         }
//       })
//       .catch((error) => {
//         console.error('Error during checkout:', error);
//         setCheckoutSuccess(false);
//       });
//   };
  

//   if (cartItems.length === 0) {
//     return <p>Cart is Empty</p>;
//   }

//   return (
//     <div className='cartpage'>
//       <div className='cartdiv'>
//         {cartItems.map(item => (
//           <CartCard
//             key={item.productId} // Changed from item.id to item.productId
//             item={item}
//             onOpenModal={handleModalOpen} // Added onOpenModal prop
//           />
//         ))}
//       </div>
//       <div className="checkout">
//         <h2>Price Details</h2>
//         <p>SubTotal: ₹{total}</p>
//         <p>Delivery Fees: ₹{deliveryFee}</p>
//         <p className='cartprice'>Total: ₹{total + deliveryFee}</p>
//         <button className='checkout-btn' onClick={handleCheckout}>Checkout</button>
//       </div>
//       <Modal open={isModalOpen} onClose={handleModalClose}>
//         {checkoutSuccess === true && <p>Order placed successfully!</p>}
//         {checkoutSuccess === false && <p>Failed to place order. Please try again.</p>}
//       </Modal>
//     </div>
//   );
// };

// export default Cart;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementItem, decrementItem, removeItem, clearCart } from '../redux/cartSlice';
import CartCard from '../components/CartCard';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal'; // Import the Modal component
import "../App.css";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate for redirection

  const deliveryFee = 40;

  useEffect(() => {
    let sum = 0;
    cartItems.forEach((item) => {
      sum += (item.price || 0) * (item.quantity || 0);
    });
    setTotal(sum);
  }, [cartItems]);

  const handleIncrement = (item) => {
    if (!localStorage.getItem('token')) {
      setModalOpen(true); // Open the modal if not logged in
    } else {
      dispatch(incrementItem(item));
    }
  };

  const handleDecrement = (item) => {
    if (!localStorage.getItem('token')) {
      setModalOpen(true); // Open the modal if not logged in
    } else {
      dispatch(decrementItem(item));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to proceed.');
      return;
    }
    navigate('/checkout'); // Redirect to checkout page
  };

  const closeModal = () => setModalOpen(false); // Function to close the modal

  if (cartItems.length === 0) {
    return <p>Cart is Empty</p>;
  }

  return (
    <div className='cartpage'>
      <div className='cartdiv'>
        {cartItems.map(item => (
          <CartCard
            key={item.productId}
            item={item}
            onOpenModal={() => setModalOpen(true)} // Pass down the modal open function
          />
        ))}
      </div>
      <div className="checkout">
        <h2>Price Details</h2>
        <p>SubTotal: ₹{total}</p>
        <p>Delivery Fees: ₹{deliveryFee}</p>
        <p className='cartprice'>Total: ₹{total + deliveryFee}</p>
        <button className='checkout-btn' onClick={handleCheckout}>Checkout</button>
      </div>
      <Modal open={modalOpen} onClose={closeModal} /> {/* Include the modal component */}
    </div>
  );
};

export default Cart;
