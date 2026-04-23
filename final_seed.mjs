import { createClient } from '@insforge/sdk';

const insforgeUrl = 'https://m5quat3a.us-east.insforge.app';
const insforgeKey = 'ik_797a80be7e43767e0c41c16f14d11d0f';

const insforge = createClient({
  baseUrl: insforgeUrl,
  anonKey: insforgeKey
});

const products = [
  { id: 1, name: 'Minimalist Cotton Tee', price: 29.99, category: 'clothing', gender: 'men', images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], sizes: ['S', 'M', 'L', 'XL'], description: 'A premium heavy-weight cotton t-shirt with a relaxed fit. Essential for any modern wardrobe.', featured: true, new_arrival: true },
  { id: 2, name: 'Classic Denim Jacket', price: 89.99, category: 'clothing', gender: 'men', images: ['https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], sizes: ['M', 'L', 'XL'], description: 'Timeless indigo denim jacket with subtle distressing and vintage wash.', featured: true, new_arrival: false },
  { id: 3, name: 'Tailored Linen Trousers', price: 65, category: 'clothing', gender: 'men', images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], sizes: ['30', '32', '34', '36'], description: 'Breathable European linen blend trousers tailored for a sharp, summery look.', featured: false, new_arrival: true },
  { id: 4, name: 'Silk Slip Dress', price: 120, category: 'clothing', gender: 'women', images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], sizes: ['XS', 'S', 'M', 'L'], description: '100% mulberry silk mini dress with adjustable straps and a cowl neckline.', featured: true, new_arrival: false },
  { id: 5, name: 'Oversized Blazer', price: 95, category: 'clothing', gender: 'women', images: ['https://images.unsplash.com/photo-1591369822096-1ed0f00fcdb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], sizes: ['S', 'M', 'L'], description: 'A structured oversized blazer in a neutral oat shade. Perfect for layering.', featured: true, new_arrival: true },
  { id: 6, name: 'Gold Herringbone Chain', price: 45, category: 'jewellery', gender: 'women', images: ['https://images.unsplash.com/photo-1599643478524-fb401fcda794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], sizes: ['One Size'], description: '18k gold-plated sterling silver herringbone chain. Lays perfectly flat.', featured: false, new_arrival: true },
  { id: 7, name: 'Chunky Silver Rings Set', price: 55, category: 'jewellery', gender: 'men', images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], sizes: ['8', '9', '10', '11'], description: 'Set of two minimalist chunky rings crafted from solid 925 sterling silver.', featured: true, new_arrival: false },
  { id: 8, name: 'Pearl Drop Earrings', price: 38, category: 'jewellery', gender: 'women', images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], sizes: ['One Size'], description: 'Freshwater cultured pearls on delicate gold vermeil hoops.', featured: false, new_arrival: false },
  { id: 9, name: 'Handcrafted Boho Tote', price: 65, category: 'crochet', gender: 'women', images: ['https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], sizes: ['One Size'], description: 'Intricately crocheted organic cotton tote bag. Perfect for the beach or market.', featured: true, new_arrival: true },
  { id: 10, name: 'Crochet Polo Shirt', price: 78, category: 'crochet', gender: 'men', images: ['https://images.unsplash.com/photo-1596755094514-f87e32f1b712?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'], sizes: ['M', 'L', 'XL'], description: 'Retro-inspired open-knit crochet polo. A statement piece for summer.', featured: true, new_arrival: true },
];

async function seed() {
  console.log('Clearing existing products...');
  await insforge.database.from('products').delete().neq('id', 0);
  
  console.log('Seeding products...');
  for (const p of products) {
    const { error } = await insforge.database.from('products').insert([p]);
    if (error) {
      console.error(`Error inserting product ${p.id}:`, error.message);
    } else {
      console.log(`Successfully inserted product ${p.id}: ${p.name}`);
    }
  }
  console.log('Seeding complete!');
}

seed();
