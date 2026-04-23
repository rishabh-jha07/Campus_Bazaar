import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { insforge } from '../lib/insforge';
import { useNavigate, useLocation } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data, error } = await insforge.database
          .from('orders')
          .select('*, order_items(*, products(*))')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="container section min-vh-100 mt-5 pt-5">
      <div className="profile-header">
        <h1>My Profile</h1>
        <div className="profile-info">
          <p><strong>Email:</strong> {user.email}</p>
          <button className="btn btn-outline" onClick={() => { logout(); navigate('/'); }}>Sign Out</button>
        </div>
      </div>

      {location.state?.message && (
        <div className="alert alert-success mt-4 mb-0" style={{backgroundColor: '#d4edda', color: '#155724', padding: '1rem', borderRadius: '4px'}}>
          {location.state.message}
        </div>
      )}

      <div className="orders-section mt-5">
        <h2>Order History</h2>
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>You have no past orders.</p>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card p-4 border rounded mb-4">
                <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                  <div>
                    <strong>Order ID:</strong> {order.id.substring(0, 8)}...<br/>
                    <small className="text-muted">{new Date(order.created_at).toLocaleDateString()}</small>
                  </div>
                  <div className="text-end">
                    <strong className="d-block mb-1">Total: ₹{order.total}</strong>
                    <span className={`badge bg-\${order.status === 'pending' ? 'warning text-dark' : 'success'}`} style={{marginRight: '8px'}}>
                      {order.status.toUpperCase()}
                    </span>
                    {order.payment_status && (
                      <span className={`badge bg-\${order.payment_status === 'pending' ? 'danger' : 'info'}`}>
                        {order.payment_status.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="order-items">
                  {order.order_items.map(item => (
                    <div key={item.id} className="d-flex align-items-center mb-2">
                       {item.products?.images?.[0] && (
                        <img src={item.products.images[0]} alt={item.products?.name} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4, marginRight: 15 }} />
                       )}
                       <div>
                         <div>{item.products?.name}</div>
                         <small className="text-muted">Size: {item.size} | Qty: {item.quantity} | ₹{item.price_at_time}</small>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
