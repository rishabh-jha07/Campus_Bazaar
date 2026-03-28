import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/dummyData';
import { Filter, ChevronDown } from 'lucide-react';
import './Category.css';

const Category = () => {
  const { id } = useParams();
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [sortOption, setSortOption] = useState('featured');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  let categoryProducts = [];
  let categoryInfo = null;

  if (id === 'men' || id === 'women') {
    categoryProducts = products.filter(p => p.gender === id);
    categoryInfo = {
      title: `${id}'s Collection`,
      desc: `Discover the latest in ${id}'s fashion. Elevated essentials for the modern lifestyle.`,
      image: id === 'men' 
        ? 'https://images.unsplash.com/photo-1617137968427-85924c800b41?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
        : 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
    };
  } else {
    categoryProducts = products.filter(p => p.category === id);
    const catData = categories.find(c => c.id.includes(id) || c.id === id);
    categoryInfo = {
      title: catData ? catData.title : `${id} Collection`,
      desc: 'Handcrafted perfection. Explore our artisanal pieces designed to make a statement.',
      image: catData ? catData.image : 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
    };
  }

  // Handle sorting
  const sortedProducts = [...categoryProducts].sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    if (sortOption === 'newest') return (b.newArrival === true ? 1 : -1) - (a.newArrival === true ? 1 : -1);
    return 0; // featured by default
  });

  return (
    <div className="category-page animate-fade-in">
      {/* Category Header */}
      <div 
        className="category-hero"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${categoryInfo.image})` }}
      >
        <div className="container category-hero-content">
          <div className="breadcrumbs">
            <Link to="/">Home</Link> / <span>{categoryInfo.title}</span>
          </div>
          <h1>{categoryInfo.title}</h1>
          <p>{categoryInfo.desc}</p>
        </div>
      </div>

      <div className="container section">
        {/* Toolbar */}
        <div className="category-toolbar">
          <div className="results-count">
            Showing {sortedProducts.length} Results
          </div>
          
          <div className="toolbar-actions">
            <button 
              className="btn btn-outline filter-btn"
              onClick={() => setFilterMenuOpen(!filterMenuOpen)}
            >
              <Filter size={18} /> Filters
            </button>
            
            <div className="sort-dropdown">
              <label>Sort By:</label>
              <select 
                value={sortOption} 
                onChange={(e) => setSortOption(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured</option>
                <option value="newest">New Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className={`category-layout ${filterMenuOpen ? 'filters-open' : ''}`}>
          
          {/* Sidebar */}
          {filterMenuOpen && (
            <aside className="category-sidebar">
              <div className="filter-group">
                <h3>Product Type</h3>
                <ul>
                  <li><label><input type="checkbox" /> Clothing</label></li>
                  <li><label><input type="checkbox" /> Accessories</label></li>
                  <li><label><input type="checkbox" /> Outerwear</label></li>
                </ul>
              </div>
              
              <div className="filter-group">
                <h3>Price Range</h3>
                <ul>
                  <li><label><input type="radio" name="price" /> Under ₹50</label></li>
                  <li><label><input type="radio" name="price" /> ₹50 - ₹100</label></li>
                  <li><label><input type="radio" name="price" /> Over ₹100</label></li>
                </ul>
              </div>
              
              <div className="filter-group">
                <h3>Size</h3>
                <div className="size-grid-sm">
                  <span>XS</span><span>S</span><span>M</span><span>L</span><span>XL</span>
                </div>
              </div>
              
              <button className="btn btn-primary btn-full mt-4">Apply Filters</button>
            </aside>
          )}

          {/* Product Grid */}
          <div className="category-main">
            {sortedProducts.length > 0 ? (
              <div className={filterMenuOpen ? 'grid-3' : 'grid-4'}>
                {sortedProducts.map(product => (
                 <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <h2>No products found</h2>
                <p>We couldn't find any items matching your criteria.</p>
                <Link to="/" className="btn btn-primary mt-4">Return Home</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
