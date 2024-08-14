import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import '../App.css';

const ProductCard = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((el) => el.productId === props.item.productId);
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addItem(props.item));
  };

  return (
    <div className="product-card">
      <div className="imageContainer">
        <img src={props.item.image} alt={props.item.productName} className="image" />
      </div>
      <h3>{props.item.Product_Name}</h3>
      <p>{props.item.description}</p>
      <div className="price">₹{props.item.price}</div>
      {props.item.quantity <= 5 && <p className="low-stock">Few items left!</p>}
      {isInCart ? (
        <Link to="/cart">
          <button className='primary-btn'>Go to cart</button>
        </Link>
      ) : (
        <button className='primary-btn' onClick={handleAdd}>Add to cart</button>
      )}
    </div>
  );
};

export default ProductCard;
