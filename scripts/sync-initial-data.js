const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const initialDataTs = `import { CategoryItem, Product, Coupon } from './types';

export const CATEGORIES: CategoryItem[] = ${JSON.stringify(db.categories, null, 2)};

export const INITIAL_PRODUCTS: Product[] = ${JSON.stringify(db.products, null, 2)};

export const INITIAL_COUPONS: Coupon[] = ${JSON.stringify(db.coupons, null, 2)};

export const INITIAL_REVIEWS: Record<string, any[]> = ${JSON.stringify(db.reviews, null, 2)};
`;

const targetPath = path.join(__dirname, '..', 'src', 'lib', 'initialData.ts');
fs.writeFileSync(targetPath, initialDataTs, 'utf8');
console.log('✅ Synchronized src/lib/initialData.ts with ' + db.products.length + ' products.');
