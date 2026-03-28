import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import AuthModal from './AuthModal';
import Logo from './Logo';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();
  const { user } = useAuth();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        
        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="logo-link" style={{ textDecoration: 'none' }}>
          <Logo />
        </Link>

        {/* Desktop Links */}
        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/category/men">Men</Link></li>
          <li><Link to="/category/women">Women</Link></li>
          <li><Link to="/category/jewellery">Jewellery</Link></li>
          <li><Link to="/category/crochet">Crochet</Link></li>
        </ul>

        {/* Icons */}
        <div className="nav-icons">
          <Link to="/" className="icon-link"><Search size={22} /></Link>
          {user ? (
            <Link to="/profile" className="icon-link"><User size={22} /></Link>
          ) : (
            <button onClick={() => setIsAuthOpen(true)} className="icon-link"><User size={22} /></button>
          )}
          <Link to="/cart" className="icon-link cart-icon">
            <ShoppingBag size={22} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>

      </div>
      
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </nav>
  );
};

export default Navbar;
