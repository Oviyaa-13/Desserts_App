import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { updateItemQuantity, removeItem } from "../redux/cartSlice";

const CartCard = (props) => {
  const [quantity, setQuantity] = useState(0); // Initialize quantity as 0
  const { item, onOpenModal } = props; // Use the onOpenModal function from props
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(props.item.quantity || 0);
  }, [props.item]);

  const incrementItem = async () => {
    if (!token) {
      onOpenModal(); // Trigger the modal if not logged in
      return;
    }

    try {
      const payload = { productId: item.productId, quantity: 1 };
      await axios.post("http://localhost:5000/addCart", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuantity(prevQuantity => prevQuantity + 1);
      dispatch(updateItemQuantity({ productId: item.productId, quantity: quantity + 1 }));
      toast.success("Item incremented");
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Error incrementing item");
    }
  };

  const decrementItem = async () => {
    if (!token) {
      onOpenModal(); // Trigger the modal if not logged in
      return;
    }
  
    if (quantity <= 1) {
      try {
        // Call the backend to remove the item
        await axios.delete(`http://localhost:5000/deleteproduct/${item.productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        // Remove item from the frontend state
        dispatch(removeItem({ productId: item.productId }));
        setQuantity(0); // Update state to reflect removal
        toast.success("Item removed from cart");
      } catch (error) {
        console.error("Error removing item from cart:", error);
        toast.error("Error removing item");
      }
      return;
    }
  
    try {
      const payload = { productId: item.productId, quantity: -1 };
      const response = await axios.post("http://localhost:5000/addCart", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200) {
        setQuantity(quantity - 1);
        dispatch(updateItemQuantity({ productId: item.productId, quantity: quantity - 1 }));
        toast.success("Item decremented");
      } else {
        throw new Error('Failed to update cart');
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Error decrementing item");
    }
  };

  return (
    <div className="leftContainer">
      <img src={item.image} width={50} alt={item.title} />
      <div className="leftContainer-div-parent">
        <div>{item.title}</div>
        <div>{item.price}</div>
        <div className="button-div">
          <button onClick={decrementItem}> - </button>&nbsp;
          <p>{quantity}</p>&nbsp;
          <button onClick={incrementItem}> + </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
