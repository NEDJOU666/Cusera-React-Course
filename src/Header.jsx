import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Leaf } from 'lucide-react';

const Header = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const location = useLocation();

  if (location.pathname === '/') return null;

  return (
    <header className="header">
      <Link to="/" className="header-brand">
        <Leaf fill="#1b4332" size={32} strokeWidth={1} />
        <span>Paradise Nursery</span>
      </Link>
      
      <nav className="header-nav">
        <Link to="/products" className={location.pathname === '/products' ? 'active-nav' : ''}>
          Browse Plants
        </Link>
        <Link to="/cart" className="cart-icon-container">
          <ShoppingCart size={24} color="#1b4332" />
          {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
