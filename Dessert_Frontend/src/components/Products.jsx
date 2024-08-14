import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const Products = () => {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/desserts');
        setProductsList(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      {productsList.map((item) => (
        <ProductCard
          key={item._id}
          item={item}
          showLowStockMessage={item.quantity <= 5}
        />
      ))}
    </div>
  );
};

export default Products;
