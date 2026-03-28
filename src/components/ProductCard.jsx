import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        {product.newArrival && <span className="badge new">New</span>}
        {product.price < 50 && !product.newArrival && <span className="badge sale">Sale</span>}
        
        <Link to={`/product/${product.id}`}>
          <img 
            src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0]} 
            alt={product.name} 
            className="product-image"
          />
        </Link>

        {/* Action Overlay */}
        <div className={`product-actions ${isHovered ? 'active' : ''}`}>
          <button 
            className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
            onClick={() => setIsLiked(!isLiked)}
            aria-label="Add to wishlist"
          >
            <Heart size={20} fill={isLiked ? "var(--error-color)" : "none"} color={isLiked ? "var(--error-color)" : "currentColor"} />
          </button>
          <button 
            className="btn btn-primary add-to-cart-btn"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1, product.sizes ? product.sizes[0] : null);
              setIsAdded(true);
              setTimeout(() => setIsAdded(false), 2000);
            }}
            disabled={isAdded}
            style={isAdded ? { backgroundColor: 'var(--success-color)', borderColor: 'var(--success-color)' } : {}}
          >
            {isAdded ? 'Added!' : <><ShoppingBag size={18} className="mr-2"/> Add to Cart</>}
          </button>
        </div>
      </div>

      <div className="product-info">
        <Link to={`/category/${product.gender}`} className="product-category">
          {product.gender}'s {product.category}
        </Link>
        <Link to={`/product/${product.id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <div className="product-price">
          <span className="current-price">₹{product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
