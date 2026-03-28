import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import { insforge } from '../lib/insforge';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/dummyData';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Home.css';

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    text: '"The artisan crochet pieces I received were absolutely breathtaking. You can feel the quality in every thread. Will be shopping here again!"',
    role: 'Verified Buyer'
  },
  {
    id: 2,
    name: 'James K.',
    text: '"Finally, a minimal fashion brand that truly understands modern silhouettes. The blazers fit perfectly right out of the box."',
    role: 'Verified Buyer'
  },
  {
    id: 3,
    name: 'Elena T.',
    text: '"I bought a set of fine jewellery for my anniversary and it matched the description exactly. Phenomenal premium packaging as well."',
    role: 'Verified Buyer'
  },
  {
    id: 4,
    name: 'Marcus L.',
    text: '"Customer service is top-notch and the delivery was incredibly fast. The summer capsule collection is everything I needed."',
    role: 'Verified Buyer'
  }
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState(products.filter(p => p.featured).slice(0, 4));
  const [newArrivals, setNewArrivals] = useState(products.filter(p => p.newArrival).slice(0, 4));

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      try {
        const { data, error } = await insforge.database.from('products').select('*');
        if (error) throw error;
        if (data && data.length > 0) {
          setFeaturedProducts(data.filter(p => p.featured).slice(0, 4));
          setNewArrivals(data.filter(p => p.new_arrival).slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to load products from DB, falling back to dummy data', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-page animate-fade-in">
      <Hero />

      {/* Categories Banner */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Curated collections for every style</p>
          </div>
          
          <div className="category-grid">
            {categories.map(category => (
              <Link to={category.link} key={category.id} className="category-card">
                <img src={category.image} alt={category.title} />
                <div className="category-overlay">
                  <h3>{category.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trending Now</h2>
            <p className="section-subtitle">Our most sought-after pieces</p>
          </div>
          
          <div className="grid-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-48">
            <Link to="/category/women" className="btn btn-outline">
              View All Collections <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="promo-content">
          <h2>Summer Capsule '26</h2>
          <p>Lightweight fabrics. Artisan craftsmanship. Effortless style.</p>
          <Link to="/category/crochet" className="btn btn-primary">
            Explore Collection
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">New Arrivals</h2>
            <p className="section-subtitle">Fresh drops to elevate your wardrobe</p>
          </div>
          
          <div className="grid-4">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-light testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What They Say</h2>
            <p className="section-subtitle">Real experiences from our global community</p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map(t => (
              <div key={t.id} className="testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="section border-top">
        <div className="container">
          <div className="grid-3 value-props">
            <div className="value-card">
              <div className="value-icon">✦</div>
              <h3>Premium Quality</h3>
              <p>Ethically sourced materials and expert craftsmanship in every piece.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">✧</div>
              <h3>Free Shipping</h3>
              <p>Complimentary worldwide shipping on all orders over ₹150.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">✦</div>
              <h3>Easy Returns</h3>
              <p>Not quite right? Return within 30 days for a full refund.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
