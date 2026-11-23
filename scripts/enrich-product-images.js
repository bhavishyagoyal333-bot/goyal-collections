const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'database.json');
const initialDataPath = path.join(__dirname, '..', 'src', 'lib', 'initialData.ts');

const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

// Verified Unsplash galleries per subcategory (all HTTP 200 tested)
const categoryGalleries = {
  'mens-footwear': [
    'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1549298916-f52d724204b4?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000&auto=format&fit=crop',
  ],
  'womens-footwear': [
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?q=80&w=1000&auto=format&fit=crop',
  ],
  'kids-footwear': [
    'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop',
  ],
  'shoes': [
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop',
  ],
  'sandals-slippers': [
    'https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop',
  ],
  'mens-wear': [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1000&auto=format&fit=crop',
  ],
  'womens-wear': [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
  ],
  'kids-wear': [
    'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1000&auto=format&fit=crop',
  ],
  'boys-wear': [
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop',
  ],
  'girls-wear': [
    'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1000&auto=format&fit=crop',
  ],
};

const brokenUrl = 'https://images.unsplash.com/photo-1582897027653-53d719918fb5?q=80&w=1000&auto=format&fit=crop';

let updatedCount = 0;
db.products = db.products.map((p, idx) => {
  let images = (p.images || []).filter(img => img && img !== brokenUrl);
  const gallery = categoryGalleries[p.subcategory] || categoryGalleries['mens-wear'];

  // Ensure primary image exists
  if (images.length === 0) {
    images.push(gallery[0]);
  }

  // Add supplementary angles and closeups from the subcategory gallery
  for (const gUrl of gallery) {
    if (!images.includes(gUrl) && images.length < 3) {
      images.push(gUrl);
    }
  }

  // Ensure minimum 3 images per product
  if (images.length < 3) {
    images.push(gallery[images.length % gallery.length]);
  }

  updatedCount++;
  return {
    ...p,
    images,
  };
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
console.log(`Enriched ${updatedCount} products in database.json with min 3 verified images.`);
