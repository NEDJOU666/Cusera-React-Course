import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItem, updateQuantity } from '../cartSlice';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity), 0
  );

  const handleIncrease = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  const handleDecrease = (id, quantity) => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    } else {
      dispatch(removeItem(id));
    }
  };

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <ShoppingBag size={64} color="#ddd" style={{ marginBottom: '20px' }} />
          <h2>Your cart is empty</h2>
          <p>Time to add some greenery to your home!</p>
          <button className="btn-checkout" onClick={() => navigate('/products')}>
            Browse Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>
      
      <div className="cart-summary">
        <p className="cart-total-info">
          <span>Items:</span> {totalQuantity}
        </p>
        <p className="cart-total-info" style={{ fontSize: '1.4rem' }}>
          <span>Total:</span> ${totalPrice.toFixed(2)}
        </p>
      </div>

      <div className="cart-items-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-img" />
            
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">${item.price.toFixed(2)} / unit</p>
              <p style={{ fontWeight: 700, marginTop: '8px' }}>
                Subtotal: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            <div className="cart-item-controls">
              <button 
                className="quantity-btn" 
                onClick={() => handleDecrease(item.id, item.quantity)}
              >
                <Minus size={14} />
              </button>
              <span className="item-quantity">{item.quantity}</span>
              <button 
                className="quantity-btn" 
                onClick={() => handleIncrease(item.id, item.quantity)}
              >
                <Plus size={14} />
              </button>
            </div>

            <button 
              className="delete-btn" 
              onClick={() => handleDelete(item.id)}
              aria-label="Remove item"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="cart-actions">
        <button className="btn-continue" onClick={() => navigate('/products')}>
          Continue Shopping
        </button>
        <button className="btn-checkout" onClick={() => alert('Checkout functionality coming soon!')}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
