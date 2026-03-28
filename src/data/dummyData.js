export const products = [
  // Men's Clothing
  {
    id: 1,
    name: 'Minimalist Cotton Tee',
    price: 29.99,
    category: 'clothing',
    gender: 'men',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A premium heavy-weight cotton t-shirt with a relaxed fit. Essential for any modern wardrobe.',
    featured: true,
    newArrival: true
  },
  {
    id: 2,
    name: 'Classic Denim Jacket',
    price: 89.99,
    category: 'clothing',
    gender: 'men',
    images: ['https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    sizes: ['M', 'L', 'XL'],
    description: 'Timeless indigo denim jacket with subtle distressing and vintage wash.',
    featured: true,
    newArrival: false
  },
  {
    id: 3,
    name: 'Tailored Linen Trousers',
    price: 65.00,
    category: 'clothing',
    gender: 'men',
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    sizes: ['30', '32', '34', '36'],
    description: 'Breathable European linen blend trousers tailored for a sharp, summery look.',
    featured: false,
    newArrival: true
  },
  // Women's Clothing
  {
    id: 4,
    name: 'Silk Slip Dress',
    price: 120.00,
    category: 'clothing',
    gender: 'women',
    images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: '100% mulberry silk mini dress with adjustable straps and a cowl neckline.',
    featured: true,
    newArrival: false
  },
  {
    id: 5,
    name: 'Oversized Blazer',
    price: 95.00,
    category: 'clothing',
    gender: 'women',
    images: ['https://images.unsplash.com/photo-1591369822096-1ed0f00fcdb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    sizes: ['S', 'M', 'L'],
    description: 'A structured oversized blazer in a neutral oat shade. Perfect for layering.',
    featured: true,
    newArrival: true
  },
  // Jewellery
  {
    id: 6,
    name: 'Gold Herringbone Chain',
    price: 45.00,
    category: 'jewellery',
    gender: 'women',
    images: ['https://images.unsplash.com/photo-1599643478524-fb401fcda794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    sizes: ['One Size'],
    description: '18k gold-plated sterling silver herringbone chain. Lays perfectly flat.',
    featured: false,
    newArrival: true
  },
  {
    id: 7,
    name: 'Chunky Silver Rings Set',
    price: 55.00,
    category: 'jewellery',
    gender: 'men',
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    sizes: ['8', '9', '10', '11'],
    description: 'Set of two minimalist chunky rings crafted from solid 925 sterling silver.',
    featured: true,
    newArrival: false
  },
  {
    id: 8,
    name: 'Pearl Drop Earrings',
    price: 38.00,
    category: 'jewellery',
    gender: 'women',
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    sizes: ['One Size'],
    description: 'Freshwater cultured pearls on delicate gold vermeil hoops.',
    featured: false,
    newArrival: false
  },
  // Crochet
  {
    id: 9,
    name: 'Handcrafted Boho Tote',
    price: 65.00,
    category: 'crochet',
    gender: 'women',
    images: ['https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    sizes: ['One Size'],
    description: 'Intricately crocheted organic cotton tote bag. Perfect for the beach or market.',
    featured: true,
    newArrival: true
  },
  {
    id: 10,
    name: 'Crochet Polo Shirt',
    price: 78.00,
    category: 'crochet',
    gender: 'men',
    images: ['https://images.unsplash.com/photo-1596755094514-f87e32f1b712?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    sizes: ['M', 'L', 'XL'],
    description: 'Retro-inspired open-knit crochet polo. A statement piece for summer.',
    featured: true,
    newArrival: true
  },
];

export const categories = [
  {
    id: 'men-clothing',
    title: "Men's Apparel",
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800b41?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/category/men',
  },
  {
    id: 'women-clothing',
    title: "Women's Collection",
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/category/women',
  },
  {
    id: 'jewellery',
    title: 'Fine Jewellery',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/category/jewellery',
  },
  {
    id: 'crochet',
    title: 'Artisan Crochet',
    image: 'https://images.unsplash.com/photo-1605381530391-7f8fed9ed04d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/category/crochet',
  }
];
