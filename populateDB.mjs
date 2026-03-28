import { insforge } from './src/lib/insforge.js';
import { products } from './src/data/dummyData.js';

async function populate() {
  console.log('Inserting products...');
  for (let p of products) {
    const { id, ...dataToInsert } = p;
    // ensure price is numeric
    dataToInsert.price = Number(dataToInsert.price);
    
    const { error } = await insforge.database.from('products').insert([dataToInsert]);
    if (error) {
      console.error('Failed inserting', p.name, error.message);
    } else {
      console.log('Inserted', p.name);
    }
  }
  console.log('Populate finished!');
}

populate();
