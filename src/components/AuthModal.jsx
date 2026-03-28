import React, { useState } from 'react';
import { X, Mail, Lock, User, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [requiresVerification, setRequiresVerification] = useState(false);
  const { login, signup, verifyEmail } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      if (requiresVerification) {
        await verifyEmail(email, code);
        setRequiresVerification(false);
        onClose();
      } else if (isLogin) {
        await login(email, password);
        onClose();
      } else {
        const data = await signup(email, password, name);
        if (data?.requireEmailVerification) {
          setRequiresVerification(true);
        } else {
          onClose();
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrorMsg('');
    setRequiresVerification(false);
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        
        <div className="auth-header">
          <h2>{requiresVerification ? 'Verify Email' : (isLogin ? 'Welcome Back' : 'Create Account')}</h2>
          <p>
            {requiresVerification 
              ? `We sent a 6-digit code to ${email}. Please enter it below.`
              : (isLogin ? 'Sign in to access your saved items and fast checkout.' : 'Join Campus Bazaar for exclusive access.')}
          </p>
        </div>
        
        {errorMsg && <div className="alert alert-danger mb-3" style={{color: 'red', fontSize: '14px', textAlign: 'center'}}>{errorMsg}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          {requiresVerification ? (
            <div className="input-group">
              <Key size={18} className="input-icon" />
              <input type="text" placeholder="6-digit Code" required value={code} onChange={e => setCode(e.target.value)} maxLength={6} />
            </div>
          ) : (
            <>
              {!isLogin && (
                <div className="input-group">
                  <User size={18} className="input-icon" />
                  <input type="text" placeholder="Full Name" required value={name} onChange={e => setName(e.target.value)} />
                </div>
              )}
              
              <div className="input-group">
                <Mail size={18} className="input-icon" />
                <input type="email" placeholder="Email Address" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              
              <div className="input-group">
                <Lock size={18} className="input-icon" />
                <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary btn-full submit-btn" disabled={loading}>
            {loading ? 'Processing...' : (requiresVerification ? 'Verify Email' : (isLogin ? 'Sign In' : 'Create Account'))}
          </button>
        </form>

        <div className="modal-footer">
          <p>
            {requiresVerification ? "Didn't receive the code? " : (isLogin ? "Don't have an account? " : "Already have an account? ")}
            <button className="toggle-auth-btn" onClick={requiresVerification ? () => setRequiresVerification(false) : toggleMode}>
              {requiresVerification ? 'Go Back' : (isLogin ? 'Sign Up' : 'Sign In')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

