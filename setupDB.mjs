import { execSync } from 'child_process';

const buckets = [
  'product-images',
  'payment-uploads'
];

for (const b of buckets) {
  try {
    console.log('Creating bucket:', b);
    execSync(`npx @insforge/cli storage create-bucket ${b}`, { stdio: 'inherit' });
  } catch (err) {
    console.log('Bucket might already exist or failed:', err.message);
  }
}

const queries = [
  // Database Tables
  `CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    new_arrival BOOLEAN DEFAULT FALSE,
    category TEXT,
    gender TEXT,
    images JSONB,
    sizes JSONB,
    stock INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'pending',
    total NUMERIC NOT NULL,
    receipt_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    size TEXT,
    price_at_time NUMERIC NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    size TEXT,
    UNIQUE(user_id, product_id, size)
  )`,
  // RLS Setup
  `ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;`,
  `CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);`,
  `CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);`,
  `CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);`,
  
  `ALTER TABLE products ENABLE ROW LEVEL SECURITY;`,
  `CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);`,
  `CREATE POLICY "Anyone can insert products" ON products FOR INSERT WITH CHECK (true);`,

  `ALTER TABLE orders ENABLE ROW LEVEL SECURITY;`,
  `CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);`,
  `CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);`,
  `CREATE POLICY "Users can update own orders" ON orders FOR UPDATE USING (auth.uid() = user_id);`,

  `ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;`,
  `CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));`,
  `CREATE POLICY "Users can create order items" ON order_items FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));`,

  `ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;`,
  `CREATE POLICY "Users can manage own cart" ON cart_items FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);`
];

for (const q of queries) {
  try {
    console.log('Running query:', q.trim().substring(0, 50) + '...');
    const escapedQuery = q.replace(/"/g, '\\"').replace(/\n/g, ' ');
    execSync(`npx @insforge/cli db query "${escapedQuery}"`, { stdio: 'inherit' });
  } catch (err) {
    console.error('Failed to execute query', q);
  }
}
