import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './Hero.css';

const slides = [
  {
    id: 1,
    title: 'The Statement Collection',
    subtitle: 'Elevate your everyday with premium fashion.',
    image: 'https://images.pexels.com/photos/7585293/pexels-photo-7585293.jpeg',
    link: '/category/women',
    cta: 'Shop Now'
  },
  {
    id: 2,
    title: 'Modern Elegance',
    subtitle: 'Refined silhouettes for the contemporary look.',
    image: 'https://images.pexels.com/photos/7248760/pexels-photo-7248760.jpeg',
    link: '/category/men',
    cta: 'Shop Now'
  },
  {
    id: 3,
    title: 'Artisan Crafted',
    subtitle: 'Discover our new line of exquisite pieces.',
    image: 'https://images.pexels.com/photos/2062324/pexels-photo-2062324.jpeg',
    link: '/category/jewellery',
    cta: 'Shop Now'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero">
      {slides.map((slide, index) => (
        <div 
          key={slide.id} 
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
        >
          <div className="hero-bg">
            <img src={slide.image} alt={slide.title} />
            <div className="hero-overlay"></div>
          </div>
          
          <div className="container hero-content">
            <div className="hero-text">
              <span className="hero-subtitle">{slide.subtitle}</span>
              <h1 className="hero-title">{slide.title}</h1>
              <Link to={slide.link} className="btn btn-primary hero-btn">
                {slide.cta} <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button 
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
