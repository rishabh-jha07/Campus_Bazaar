import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { products } from '../data/dummyData';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 150 ? 0 : 15.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-page animate-fade-in">
      <div className="container">
        <h1 className="page-header">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart text-center section">
            <ShoppingBag size={48} className="mb-4 text-muted" />
            <h2>Your cart is currently empty.</h2>
            <p className="mb-4">Before proceed to checkout you must add some products to your shopping cart.</p>
            <Link to="/" className="btn btn-primary">Return to Shop</Link>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-items">
              <div className="cart-table-header">
                <div>Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Total</div>
                <div></div>
              </div>
              
              {cartItems.map(item => (
                <div key={item.cartId} className="cart-item">
                  <div className="item-info">
                    <img src={item.images[0]} alt={item.name} />
                    <div>
                      <h3><Link to={`/product/${item.id}`}>{item.name}</Link></h3>
                      <span className="item-meta">Size: {item.selectedSize}</span>
                    </div>
                  </div>
                  <div className="item-price">₹{item.price.toFixed(2)}</div>
                  <div className="item-quantity">
                    <div className="qty-control">
                      <button onClick={() => updateQuantity(item.cartId, 'decrement')}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartId, 'increment')}>+</button>
                    </div>
                  </div>
                  <div className="item-total">₹{(item.price * item.quantity).toFixed(2)}</div>
                  <div className="item-remove">
                    <button onClick={() => removeFromCart(item.cartId)}><Trash2 size={20} /></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-row">
                <span>Estimated Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              
              <Link to="/checkout" className="btn btn-primary btn-full checkout-btn">
                Proceed to Checkout <ArrowRight size={18} className="ml-2" />
              </Link>
              
              <div className="continue-shopping">
                <Link to="/">Or continue shopping</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
