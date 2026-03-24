import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../cartSlice';
import { categories } from '../plantsData';
import { ShoppingCart } from 'lucide-react';

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isInCart = (id) => {
    return cartItems.some(item => item.id === id);
  };

  return (
    <div className="products-section">
      <h2 className="category-title" style={{ marginBottom: '60px', fontSize: '3rem' }}>
        Discover Our Collection
      </h2>
      
      {categories.map((category) => (
        <div key={category.name} className="category-group">
          <h2 className="category-title">{category.name}</h2>
          <div className="plant-grid">
            {category.plants.map((plant) => (
              <div key={plant.id} className="plant-card">
                <div className="plant-image-container">
                  <img src={plant.image} alt={plant.name} className="plant-image" />
                </div>
                <div className="plant-info">
                  <h3 className="plant-name">{plant.name}</h3>
                  <p className="plant-price">${plant.price}</p>
                  <p className="plant-desc">{plant.description}</p>
                  <button 
                    className={`add-to-cart-btn ${isInCart(plant.id) ? 'added-label' : ''}`}
                    onClick={() => handleAddToCart(plant)}
                    disabled={isInCart(plant.id)}
                  >
                    {isInCart(plant.id) ? 'In Cart' : (
                      <>
                        <ShoppingCart size={18} inline style={{ marginRight: '8px' }} />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
