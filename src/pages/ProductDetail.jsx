import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/dummyData';
import { ChevronRight, Star, Heart, Share2, Ruler } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [isAdded, setIsAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Reset states when product changes
    if (product) {
      setSelectedImage(0);
      setSelectedSize(null);
      setQuantity(1);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="container section text-center">
        <h2>Product not found</h2>
        <Link to="/" className="btn btn-primary mt-4">Back to Home</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addToCart(product, quantity, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="product-page animate-fade-in">
      <div className="container">
        
        {/* Breadcrumbs */}
        <div className="product-breadcrumbs">
          <Link to="/">Home</Link> <ChevronRight size={14} />
          <Link to={`/category/${product.gender}`}>
            {product.gender.charAt(0).toUpperCase() + product.gender.slice(1)}
          </Link> <ChevronRight size={14} />
          <Link to={`/category/${product.category}`}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link> <ChevronRight size={14} />
          <span>{product.name}</span>
        </div>

        <div className="product-detail-grid">
          
          {/* Gallery */}
          <div className="product-gallery">
            <div className="thumbnail-list">
              {product.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} />
                </div>
              ))}
            </div>
            <div className="main-image">
              <img src={product.images[selectedImage]} alt={product.name} />
            </div>
          </div>

          {/* Info */}
          <div className="product-info-wrapper">
            <div className="product-meta">
              <span className="product-tag">{product.newArrival ? 'New Arrival' : ''}</span>
              <span className="product-tag ml-2">{product.gender}'s {product.category}</span>
            </div>
            
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-reviews-brief">
              <div className="stars">
                <Star size={16} fill="var(--accent-color)" color="var(--accent-color)"/>
                <Star size={16} fill="var(--accent-color)" color="var(--accent-color)"/>
                <Star size={16} fill="var(--accent-color)" color="var(--accent-color)"/>
                <Star size={16} fill="var(--accent-color)" color="var(--accent-color)"/>
                <Star size={16} fill="var(--accent-color)" color="var(--accent-color)"/>
              </div>
              <span>(24 Reviews)</span>
            </div>

            <div className="product-price-large">
              ₹{product.price.toFixed(2)}
            </div>

            <p className="product-short-desc">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes && (
              <div className="size-selector-wrapper">
                <div className="size-header">
                  <h3>Select Size</h3>
                  <button className="size-guide-btn"><Ruler size={16} /> Size Guide</button>
                </div>
                <div className="size-grid">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && <p className="size-warning">Please select a size to continue</p>}
              </div>
            )}

            {/* Actions */}
            <div className="product-actions-bar">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
              <button 
                className="btn btn-primary btn-full add-btn"
                onClick={handleAddToCart}
                disabled={isAdded}
                style={isAdded ? { backgroundColor: 'var(--success-color)', borderColor: 'var(--success-color)' } : {}}
              >
                {isAdded ? 'Added!' : sizeError ? 'Please select a size' : 'Add to Cart'}
              </button>
              <button className="icon-action-btn"><Heart size={24} /></button>
            </div>
            
            <div className="product-features-list">
              <ul>
                <li>Free standard shipping on orders over ₹150</li>
                <li>Free returns within 30 days</li>
                <li>Secure online payment</li>
              </ul>
            </div>

            {/* Tabs */}
            <div className="product-tabs">
              <div className="tab-headers">
                <button 
                  className={activeTab === 'details' ? 'active' : ''} 
                  onClick={() => setActiveTab('details')}
                >
                  Details
                </button>
                <button 
                  className={activeTab === 'materials' ? 'active' : ''} 
                  onClick={() => setActiveTab('materials')}
                >
                  Materials & Care
                </button>
                <button 
                  className={activeTab === 'shipping' ? 'active' : ''} 
                  onClick={() => setActiveTab('shipping')}
                >
                  Shipping
                </button>
              </div>
              <div className="tab-content">
                {activeTab === 'details' && (
                  <p>Elevate your wardrobe with this carefully crafted piece. Designed with modern aesthetics in mind, blending comfort and high-end fashion effortlessly. Ideal for both casual outings and upscale events.</p>
                )}
                {activeTab === 'materials' && (
                  <ul className="materials-list">
                    <li>Premium blended fabric</li>
                    <li>Sustainably sourced materials</li>
                    <li>Machine wash cold, tumble dry low</li>
                    <li>Do not bleach</li>
                  </ul>
                )}
                {activeTab === 'shipping' && (
                  <p>Standard shipping takes 3-5 business days. Express shipping is available at checkout. International delivery varies by location.</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
