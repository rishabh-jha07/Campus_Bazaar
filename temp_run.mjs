import fs from 'fs';
import { execSync } from 'child_process';

const sql = fs.readFileSync('insert.sql', 'utf-8');
const queries = sql.split('\n').filter(l => l.trim() !== '');

for(let q of queries) {
  try {
    const escapedQuery = q.replace(/"/g, '\\"').replace(/\n/g, ' ');
    console.log("Running query:", escapedQuery.substring(0, 50));
    execSync(`npx @insforge/cli db query "${escapedQuery}"`, { stdio: 'inherit' });
  } catch(e) {
    console.error("Failed executing section");
  }
}
