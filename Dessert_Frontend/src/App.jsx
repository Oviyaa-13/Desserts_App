import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import Header from './components/Header';
import Products from './components/Products';
import Cart from './components/Cart';
import Slider from './components/Slider';
import Login from './components/Login';
import Register from './components/Register';
import AdminOrder from './components/AdminOrder';
import AdminStock from './components/AdminStock';
import PrivateRoute from './components/PrivateRoute';
import CheckoutPage from './components/CheckoutPage';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Slider />
                <Products />
              </>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <div className="cart-page"><Cart /></div>
            } 
          />
          <Route 
            path="/login" 
            element={<Login />} 
          />
          <Route 
            path="/register" 
            element={<Register />} 
          />
          <Route 
            path="/checkout" 
            element={<CheckoutPage />} 
          />
          <Route 
            path="/admin/orders" 
            element={
              <PrivateRoute role="admin">
                <AdminOrder />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/stock" 
            element={
              <PrivateRoute role="admin">
                <AdminStock />
              </PrivateRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
