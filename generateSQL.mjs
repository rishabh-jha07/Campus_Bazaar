import fs from 'fs';
import { products } from './src/data/dummyData.js';

let sql = '';
for (let p of products) {
  let images = JSON.stringify(p.images).replace(/'/g, "''");
  let sizes = JSON.stringify(p.sizes || []).replace(/'/g, "''");
  let name = p.name.replace(/'/g, "''");
  let desc = p.description.replace(/'/g, "''");

  sql += `INSERT INTO products (id, name, description, price, new_arrival, category, gender, images, sizes, stock, featured) VALUES `;
  sql += `(${p.id}, '${name}', '${desc}', ${p.price}, ${p.newArrival || false}, '${p.category}', '${p.gender}', '${images}'::jsonb, '${sizes}'::jsonb, 10, ${p.featured || false});\n`;
}

fs.writeFileSync('insert.sql', sql);
