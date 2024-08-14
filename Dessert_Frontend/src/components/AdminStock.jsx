// AdminStock.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminStock = () => {
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({
    productName: '',
    quantity: '',
    price: ''
  });
  const [editingStock, setEditingStock] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const handleNavigateToOrders = () => {
    navigate('/admin/orders'); // Adjust this path according to your routing setup
  };
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/stocks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
        toast.error('Failed to fetch stocks');
      }
    };

    fetchStocks();
  }, [token]);

  const handleAddStock = async () => {
    try {
      const response = await axios.post('http://localhost:5000/stocks', newStock, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStocks([...stocks, response.data]);
      setNewStock({ productName: '', quantity: '', price: '' });
      toast.success('Stock added successfully');
    } catch (error) {
      console.error('Error adding stock:', error);
      toast.error('Failed to add stock');
    }
  };

  const handleUpdateStock = async () => {
    if (editingStock) {
      try {
        const response = await axios.put(
          `http://localhost:5000/stocks/${editingStock.productId}`, // Use `productId` in the URL
          editingStock,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('API response:', response.data);

        const updatedStock = response.data.stock;
        console.log('Updating stock in state:', updatedStock);

        setStocks(stocks.map(stock => stock._id === updatedStock._id ? updatedStock : stock));
        setEditingStock(null);
        setNewStock({ productName: '', quantity: '', price: '' });
        toast.success('Stock updated successfully');
      } catch (error) {
        console.error('Error updating stock:', error);
        toast.error('Failed to update stock');
      }
    }
  };

  const handleDeleteStock = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/stocks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStocks(stocks.filter(stock => stock._id !== id));
      toast.success('Stock deleted successfully');
    } catch (error) {
      console.error('Error deleting stock:', error);
      toast.error('Failed to delete stock');
    }
  };

  const handleEditClick = (stock) => {
    setEditingStock(stock);
    setNewStock({
      productName: stock.productName,
      quantity: stock.quantity,
      price: stock.price
    });
  };

  return (
    <div className="admin-stock">
      <h2>Admin Stock Management</h2>
      <button className="navigate-orders-button" onClick={handleNavigateToOrders}>
        Go to Orders Page
      </button>
      <div className="add-stock-form">
        <input
          type="text"
          placeholder="Product Name"
          value={newStock.productName}
          onChange={(e) => setNewStock({ ...newStock, productName: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newStock.quantity}
          onChange={(e) => setNewStock({ ...newStock, quantity: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newStock.price}
          onChange={(e) => setNewStock({ ...newStock, price: e.target.value })}
        />
        {editingStock ? (
          <button onClick={handleUpdateStock}>Update Stock</button>
        ) : (
          <button onClick={handleAddStock}>Add Stock</button>
        )}
      </div>

      <ul className="stocks-list">
        {stocks.map(stock => (
          <li key={stock._id} className="stock-item">
            <span>{stock.productName} - Quantity: {stock.quantity} - Price: {stock.price}</span>
            <FaEdit
              className="edit-stock"
              onClick={() => handleEditClick(stock)}
              title="Edit stock"
            />
            <FaTrash
              className="delete-stock"
              onClick={() => handleDeleteStock(stock._id)}
              title="Delete stock"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminStock;
