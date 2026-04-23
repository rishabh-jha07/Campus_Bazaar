import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, CreditCard, ExternalLink } from 'lucide-react';
import { insforge } from '../lib/insforge';
import './Payment.css';

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentUpdating, setPaymentUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrder();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchOrder = async () => {
    try {
      const { data, error } = await insforge.database
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (err) {
      console.error('Error fetching order:', err);
      setError('Could not fetch order details.');
    } finally {
      setLoading(false);
    }
  };

  const handlePay = () => {
    // Open PayPal in new tab with INR currency
    window.open(`https://paypal.me/RJha391/${order.total}INR`, '_blank');
  };

  const handleConfirmPayment = async () => {
    setPaymentUpdating(true);
    try {
      const { error } = await insforge.database
        .from('orders')
        .update({
          status: 'confirmed',
          payment_status: 'paid'
        })
        .eq('id', id);

      if (error) throw error;
      
      navigate('/profile', { state: { message: 'Payment confirmed! Your order is now processing.' } }); 
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to confirm payment.');
    } finally {
      setPaymentUpdating(false);
    }
  };

  if (loading) return <div className="payment-page"><div className="container">Loading...</div></div>;
  if (error) return <div className="payment-page"><div className="container"><AlertCircle style={{marginRight: '8px'}}/> {error}</div></div>;
  if (!order) return <div className="payment-page"><div className="container">Order not found.</div></div>;

  return (
    <div className="payment-page animate-fade-in">
      <div className="container">
        <div className="payment-card">
          <div className="payment-header">
            <CreditCard size={48} className="payment-icon" />
            <h2>Complete Your Payment</h2>
            <p>Order #{order.id.split('-')[0]}</p>
          </div>

          <div className="payment-amount">
            <span className="currency">₹</span>
            <span className="amount">{order.total}</span>
          </div>

          <div className="payment-instructions">
            <p>
              Please click the button below to pay securely via PayPal. 
              The payment link will open in a new tab.
            </p>
            <p><strong>Important:</strong> After completing the payment on PayPal, please return to this page and click "I have completed the payment" to confirm your order.</p>
          </div>

          <div className="payment-actions">
            <button className="btn btn-primary btn-full paypal-btn" onClick={handlePay}>
              Pay with PayPal <ExternalLink size={18} style={{marginLeft: '8px'}} />
            </button>
            
            <div className="payment-divider">
              <span>After paying on PayPal</span>
            </div>

            <button 
              className="btn btn-secondary btn-full confirm-btn" 
              onClick={handleConfirmPayment}
              disabled={paymentUpdating}
            >
              {paymentUpdating ? 'Confirming...' : (
                <>
                  <CheckCircle size={18} style={{marginRight: '8px'}} />
                  I have completed the payment
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
