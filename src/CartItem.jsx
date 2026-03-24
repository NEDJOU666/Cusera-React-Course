import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItem, updateQuantity } from './CartSlice';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const CartItem = () => {
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
      
      <div className="cart-summary" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', background: '#f8f9fa', borderRadius: '12px', marginBottom: '30px' }}>
        <p style={{ fontWeight: 600 }}>Total Items: {totalQuantity}</p>
        <p style={{ fontWeight: 700, fontSize: '1.4rem' }}>
          Total Amount: ${totalPrice.toFixed(2)}
        </p>
      </div>

      <div className="cart-items-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '15px', borderBottom: '1px solid #eee' }}>
            <img src={item.image} alt={item.name} className="cart-item-img" style={{ width: '100px', height: '100px', borderRadius: '12px', objectFit: 'cover' }} />
            
            <div className="cart-item-details" style={{ flex: 1 }}>
              <h3 className="cart-item-name" style={{ marginBottom: '8px' }}>{item.name}</h3>
              <p className="cart-item-price" style={{ color: '#525252' }}>${item.price.toFixed(2)} each</p>
              <p style={{ fontWeight: 700, marginTop: '8px', color: '#1b4332' }}>
                Item Subtotal: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            <div className="cart-item-controls" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button className="quantity-btn" onClick={() => handleDecrease(item.id, item.quantity)}>
                <Minus size={14} />
              </button>
              <span className="item-quantity" style={{ fontWeight: 600 }}>{item.quantity}</span>
              <button className="quantity-btn" onClick={() => handleIncrease(item.id, item.quantity)}>
                <Plus size={14} />
              </button>
            </div>

            <button className="delete-btn" onClick={() => handleDelete(item.id)} aria-label="Remove item">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="cart-actions" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
        <button className="btn-continue" onClick={() => navigate('/products')} style={{ padding: '14px 28px', background: '#eee', color: '#1b4332', fontWeight: 600 }}>
          Continue Shopping
        </button>
        <button className="btn-checkout" onClick={() => alert('À venir / Coming Soon!')} style={{ padding: '14px 28px', background: '#1b4332', color: 'white', fontWeight: 600 }}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
