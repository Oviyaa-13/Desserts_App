import React from 'react';
import { useNavigate } from 'react-router-dom';

const Modal = ({ open, onClose }) => {
  const navigate = useNavigate();

  if (!open) return null;

  const handleLogin = () => {
    onClose();
    navigate('/login'); // Redirect to the login page
  };

  const handleRegister = () => {
    onClose();
    navigate('/register'); // Redirect to the register page
  };

  return (
    <div onClick={onClose} className='overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
        <div className='modalRight'>
          <p className='closeBtn' onClick={onClose}>
            X
          </p>
          <div className='content'>
            <p>You need to be logged in to add items to your cart.</p>
            <h1>Log in to continue</h1>
            <p>
              or{' '}
              <span className='registerLink' onClick={handleRegister}>
                create a new account
              </span>{' '}
              if you don't have one.
            </p>
          </div>
          <div className='btnContainer'>
            <button className='btnPrimary' onClick={handleLogin}>
              <span className='bold'>LOG IN</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
