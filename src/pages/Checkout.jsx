import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { insforge } from '../lib/insforge';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cartItems, clearCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 150 ? 0 : 15.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in or create an account to complete your purchase.');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 1. Create the order
      const { data: orderData, error: orderError } = await insforge.database
        .from('orders')
        .insert([{
          user_id: user.id,
          status: 'completed', // auto-complete for dummy demo
          total: total
        }])
        .select()
        .single();
        
      if (orderError) throw orderError;
      
      // 2. Insert order items
      const orderItemsToInsert = cartItems.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        size: item.selectedSize || 'nosize',
        price_at_time: item.price
      }));
      
      const { error: itemsError } = await insforge.database
        .from('order_items')
        .insert(orderItemsToInsert);
        
      if (itemsError) throw itemsError;
      
      clearCart();
      alert('Order placed successfully! Thank you for shopping with Campus Bazaar.');
      navigate('/');
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-page animate-fade-in">
      <div className="container">
        
        <div className="checkout-header">
          <Link to="/cart" className="back-link"><ArrowLeft size={16} /> Return to Cart</Link>
          <h2>Secure Checkout</h2>
          <div className="secure-badge"><Lock size={16} /> SSL Encrypted</div>
        </div>

        <div className="checkout-container">
          
          <form className="checkout-form" onSubmit={handleSubmit}>
            
            <div className="form-section">
              <h3>Contact Information</h3>
              <div className="form-group">
                <input type="email" placeholder="Email Address" required />
              </div>
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span>Keep me up to date on news and exclusive offers</span>
              </label>
            </div>

            <div className="form-section">
              <h3>Shipping Address</h3>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" placeholder="First Name" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Last Name" required />
                </div>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Address" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Apartment, suite, etc. (optional)" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" placeholder="City" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="State / Province" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="ZIP / Postal Code" required />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Payment Method</h3>
              <p className="text-muted mb-4 text-sm">All transactions are secure and encrypted.</p>
              
              <div className="payment-options">
                <div className="payment-option selected">
                  <label>
                    <input type="radio" name="payment" defaultChecked />
                    <span>Credit Card</span>
                  </label>
                </div>
              </div>
              
              <div className="card-details">
                <div className="form-group">
                  <input type="text" placeholder="Card Number" required />
                </div>
                <div className="form-row">
                  <div className="form-group half">
                    <input type="text" placeholder="Expiration Date (MM/YY)" required />
                  </div>
                  <div className="form-group half">
                    <input type="text" placeholder="Security Code" required />
                  </div>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Name on Card" required />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full submit-order-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Pay Now'}
            </button>
            
          </form>

          {/* Simple order summary for checkout */}
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item.cartId} className="summary-item">
                  <div className="item-desc">
                    <span className="qty">{item.quantity}</span> x {item.name}
                  </div>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
