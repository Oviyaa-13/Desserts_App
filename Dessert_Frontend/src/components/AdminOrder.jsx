import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaBoxOpen } from 'react-icons/fa';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token'); 
        if (!token) {
          throw new Error('No authentication token found');
        }
        const response = await axios.get('http://localhost:5000/admin/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, []);

  const handleMarkAsDone = async (orderId) => {
    try {
      const token = localStorage.getItem('token'); 
      await axios.patch(`http://localhost:5000/${orderId}/done`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, orderstatus: 'Done' } : order
        )
      );
      toast.success('Order marked as done');
    } catch (error) {
      console.error('Error marking order as done:', error);
      toast.error('Failed to mark order as done');
    }
  };

  const handleNavigateToStock = () => {
    navigate('/admin/stock');
  };

  return (
    <div className="admin-orders">
      <h2>Admin Orders</h2>
      <button onClick={handleNavigateToStock} className="stock-btn">
        <FaBoxOpen /> Manage Stock
      </button>
      <ul className="orders-list">
        {orders.length > 0 ? (
          orders.map(order => (
            <li key={order._id} className={`order-item ${order.orderstatus === 'Done' ? 'done' : ''}`}>
              <div>
                <strong>Order ID:</strong> {order.orderid}
              </div>
              <div>
                <strong>Customer Name:</strong> {order.name}
              </div>
              <div>
                <strong>Phone:</strong> {order.phone}
              </div>
              <div>
                <strong>Address:</strong> {order.address}
              </div>
              <div>
                <strong>Products:</strong>
                <ul>
                  {order.products.map(product => (
                    <li key={product._id}>
                      Product ID: {product.productId} - Quantity: {product.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Total Amount:</strong> ${order.totalamount}
              </div>
              <div>
                <strong>Status:</strong> {order.orderstatus}
              </div>
              {order.orderstatus !== 'Done' && (
                <FaCheckCircle
                  className="mark-done"
                  onClick={() => handleMarkAsDone(order._id)}
                  title="Mark as done"
                />
              )}
            </li>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminOrder;
