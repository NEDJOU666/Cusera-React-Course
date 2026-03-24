import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';
import { Leaf } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-background"></div>
      
      <div className="home-content">
        <Leaf fill="#95d5b2" color="#95d5b2" size={80} style={{ marginBottom: '20px' }} />
        <h1>Paradise Nursery</h1>
        <p>
          Bring the serenity of nature into your home. Explore our curated collection 
          of houseplants, handpicked to enhance your well-being and elevate your living space.
          From air-purifying giants to low-maintenance succulents, find your perfect leafy companion today.
        </p>
        <button className="btn-start" onClick={() => navigate('/products')}>
          Commencer
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
};

export default App;
