import fs from 'fs';
import { execSync } from 'child_process';

let content = fs.readFileSync('src/data/dummyData.js', 'utf-8');
content = content.replace(/export /g, ''); // strip exports
// We need to safely evaluate the file content and get the products 
// Since we are in strict mode ESM, we construct a function string
const script = `
  ${content}
  return {products};
`;

try {
  const getVars = new Function(script);
  const vars = getVars();
  
  let sql = 'DELETE FROM products;\n'; // Clear just in case
  for (let p of vars.products) {
    let images = JSON.stringify(p.images).replace(/'/g, "''");
    let sizes = JSON.stringify(p.sizes || []).replace(/'/g, "''");
    let name = p.name.replace(/'/g, "''");
    let desc = p.description.replace(/'/g, "''");

    sql += `INSERT INTO products (id, name, description, price, new_arrival, category, gender, images, sizes, stock, featured) VALUES `;
    sql += `(${p.id}, '${name}', '${desc}', ${p.price}, ${p.newArrival || false}, '${p.category}', '${p.gender}', '${images}'::jsonb, '${sizes}'::jsonb, 10, ${p.featured || false});\n`;
  }
  
  fs.writeFileSync('insert.sql', sql);
  console.log('insert.sql generated.');
  execSync('npx @insforge/cli db query "SELECT 1"', {stdio: 'inherit'}); // pre-check
  const escapedSql = sql.replace(/"/g, '\\"').replace(/\n/g, ' ');
  execSync(`npx @insforge/cli db query "${escapedSql}"`, {stdio: 'inherit'});
  console.log('Inserted products');
} catch (err) {
  console.error(err);
}
