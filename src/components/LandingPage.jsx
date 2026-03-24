import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-background"></div>
      
      <div className="landing-content">
        <Leaf fill="#95d5b2" color="#95d5b2" size={80} style={{ marginBottom: '20px' }} />
        <h1>Paradise Nursery</h1>
        <p>
          Bring the serenity of nature into your home. Explore our curated collection 
          of houseplants, handpicked to enhance your well-being and elevate your living space.
          From air-purifying giants to low-maintenance succulents, find your perfect leafy companion today.
        </p>
        <button className="get-started-btn" onClick={() => navigate('/products')}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
