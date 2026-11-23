import { CategoryItem, Product, Coupon } from './types';

export const CATEGORIES: CategoryItem[] = [
  {
    "id": "footwear",
    "slug": "footwear",
    "name": "Footwear",
    "hindiName": "",
    "description": "Mastercrafted luxury footwear designed for uncompromising comfort and statement elegance.",
    "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop",
    "subcategories": [
      {
        "slug": "mens-footwear",
        "name": "Men's Footwear",
        "description": "Bespoke leather oxfords, monk straps, chelsea boots and tailored loafers.",
        "image": "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop"
      },
      {
        "slug": "womens-footwear",
        "name": "Women's Footwear",
        "description": "Sculptural heels, couture mules, minimalist ballet flats and ankle boots.",
        "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop"
      },
      {
        "slug": "kids-footwear",
        "name": "Kids' Footwear",
        "description": "Comfortable, ultra-durable and ergonomic luxury footwear for young explorers.",
        "image": "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop"
      },
      {
        "slug": "shoes",
        "name": "Shoes",
        "description": "Monochrome luxury sneakers, dress shoes and contemporary trainers.",
        "image": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop"
      },
      {
        "slug": "sandals-slippers",
        "name": "Sandals & Slippers",
        "description": "Full-grain leather slides, architectural strap sandals and plush lounge slippers.",
        "image": "https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  {
    "id": "ready-made-clothes",
    "slug": "ready-made-clothes",
    "name": "Ready-made Clothes",
    "hindiName": "",
    "description": "Minimalist high-fashion apparel tailored from premium Egyptian cotton, silk blends and structured wool.",
    "image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
    "subcategories": [
      {
        "slug": "mens-wear",
        "name": "Men's Wear",
        "description": "Tailored oversized blazers, monochrome shirts, raw denim and relaxed trousers.",
        "image": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
      },
      {
        "slug": "womens-wear",
        "name": "Women's Wear",
        "description": "Architectural trench coats, silk slip dresses, sculpted tops and pleated skirts.",
        "image": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop"
      },
      {
        "slug": "kids-wear",
        "name": "Kids' Wear",
        "description": "Hypoallergenic organic cotton coordinates and modern unisex essentials.",
        "image": "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop"
      },
      {
        "slug": "boys-wear",
        "name": "Boys' Wear",
        "description": "Smart structured shirts, tailored shorts, varsity jackets and casual tees.",
        "image": "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop"
      },
      {
        "slug": "girls-wear",
        "name": "Girls' Wear",
        "description": "Bespoke occasion dresses, effortless linen sets and delicate knits.",
        "image": "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=800&auto=format&fit=crop"
      }
    ]
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    "id": "mirli-fw-001",
    "slug": "goyal-onyx-chelsea-boot",
    "sku": "GC-MFW-001",
    "name": "Onyx Leather Chelsea Boot",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "mens-footwear",
    "subcategoryTitle": "Men's Footwear",
    "price": 1899,
    "mrp": 3999,
    "discountPercent": 53,
    "description": "Handcrafted in genuine leather with a sleek silhouette, elastic side gussets, and anti-slip rubber sole for unmatched poise and all-day comfort.",
    "details": [
      "100% Genuine Full-Grain Leather",
      "Goodyear Welt Construction for high durability",
      "Memory Foam cushioned leather insole",
      "Anti-slip dual density rubber lug outsole"
    ],
    "specifications": [
      {
        "label": "Upper Material",
        "value": "Genuine Leather"
      },
      {
        "label": "Sole Material",
        "value": "Lugged Rubber"
      },
      {
        "label": "Closure",
        "value": "Slip-On with Elastic Gusset"
      },
      {
        "label": "Heel Height",
        "value": "30 mm"
      },
      {
        "label": "Origin",
        "value": "Handcrafted in Agra, India"
      },
      {
        "label": "Care",
        "value": "Wipe with damp cloth, polish regularly"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "UK 6",
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10",
      "UK 11"
    ],
    "colors": [
      {
        "name": "Obsidian Black",
        "hex": "#0a0a0a"
      },
      {
        "name": "Smoked Umber",
        "hex": "#2b211b"
      }
    ],
    "stock": 24,
    "rating": 4.8,
    "reviewCount": 42,
    "isTrending": true,
    "isBestSeller": true,
    "featured": true,
    "status": "active",
    "createdAt": "2026-01-10T10:00:00.000Z"
  },
  {
    "id": "mirli-fw-002",
    "slug": "goyal-imperial-monk-strap",
    "sku": "GC-MFW-002",
    "name": "Imperial Double Monk Strap Formal Shoe",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "mens-footwear",
    "subcategoryTitle": "Men's Footwear",
    "price": 1699,
    "mrp": 3499,
    "discountPercent": 51,
    "description": "Precision Italian-inspired silhouette crafted with hand-burnished crust leather and brushed silver buckles for sophisticated business and wedding wear.",
    "details": [
      "Hand-burnished vegetable tanned leather",
      "Dual silver hardware buckle closures",
      "Breathable leather lining",
      "Reinforced stacked wooden heel with rubber grip"
    ],
    "specifications": [
      {
        "label": "Upper Material",
        "value": "Crust Leather"
      },
      {
        "label": "Sole Material",
        "value": "Neolite with Rubber Grip"
      },
      {
        "label": "Fastening",
        "value": "Double Buckle Straps"
      },
      {
        "label": "Toe Shape",
        "value": "Soft Chiseled Square"
      },
      {
        "label": "Origin",
        "value": "Handcrafted in Agra, India"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "UK 6",
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "colors": [
      {
        "name": "Burnished Tan",
        "hex": "#78350f"
      },
      {
        "name": "Midnight Jet",
        "hex": "#000000"
      }
    ],
    "stock": 20,
    "rating": 4.7,
    "reviewCount": 31,
    "isTrending": false,
    "isBestSeller": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-01-12T10:00:00.000Z"
  },
  {
    "id": "gc-mfw-003",
    "slug": "goyal-kingsman-cap-toe-oxford",
    "sku": "GC-MFW-003",
    "name": "Kingsman Cap-Toe Oxford Leather Shoe",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "mens-footwear",
    "subcategoryTitle": "Men's Footwear",
    "price": 1499,
    "mrp": 2999,
    "discountPercent": 50,
    "description": "The pinnacle of executive footwear. Closed lacing system with a clean cap-toe finish, crafted from smooth full-grain leather for immaculate office and tuxedo presence.",
    "details": [
      "100% Genuine Full-Grain Leather",
      "Classic closed oxford lacing system",
      "Anti-fatigue padded insole",
      "Durable non-slip composite sole"
    ],
    "specifications": [
      {
        "label": "Upper Material",
        "value": "Polished Genuine Leather"
      },
      {
        "label": "Sole Material",
        "value": "Anti-Slip Composite TPR"
      },
      {
        "label": "Closure",
        "value": "Lace-Up"
      },
      {
        "label": "Toe Style",
        "value": "Cap Toe"
      },
      {
        "label": "Origin",
        "value": "Handcrafted in Agra, India"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "UK 6",
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10",
      "UK 11"
    ],
    "colors": [
      {
        "name": "Classic Black",
        "hex": "#0f0f0f"
      },
      {
        "name": "Rich Mahogany",
        "hex": "#4a150e"
      }
    ],
    "stock": 30,
    "rating": 4.9,
    "reviewCount": 28,
    "isTrending": true,
    "isNewArrival": true,
    "featured": true,
    "status": "active",
    "createdAt": "2026-02-01T10:00:00.000Z"
  },
  {
    "id": "gc-mfw-004",
    "slug": "goyal-heritage-leather-brogues",
    "sku": "GC-MFW-004",
    "name": "Heritage Handcrafted Leather Wingtip Brogues",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "mens-footwear",
    "subcategoryTitle": "Men's Footwear",
    "price": 1599,
    "mrp": 3199,
    "discountPercent": 50,
    "description": "Ornate decorative perforations across a wingtip medallion toe. Perfect pairing for smart chinos, blazers, and festive trousers.",
    "details": [
      "Detailed English wingtip brogue punch detailing",
      "Genuine leather upper with rich depth of color",
      "Shock-absorbing cushioned footbed",
      "Hand-stitched perimeter construction"
    ],
    "specifications": [
      {
        "label": "Upper Material",
        "value": "Leather"
      },
      {
        "label": "Sole Material",
        "value": "Rubberized Traction Sole"
      },
      {
        "label": "Closure",
        "value": "Lace-Up"
      },
      {
        "label": "Occasion",
        "value": "Semi-Formal / Festive"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "colors": [
      {
        "name": "Cognac Brown",
        "hex": "#9a3412"
      },
      {
        "name": "Ebony Black",
        "hex": "#111827"
      }
    ],
    "stock": 18,
    "rating": 4.8,
    "reviewCount": 19,
    "isBestSeller": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-05T10:00:00.000Z"
  },
  {
    "id": "gc-mfw-005",
    "slug": "goyal-milano-leather-penny-loafer",
    "sku": "GC-MFW-005",
    "name": "Milano Italian Leather Penny Loafers",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "mens-footwear",
    "subcategoryTitle": "Men's Footwear",
    "price": 1399,
    "mrp": 2799,
    "discountPercent": 50,
    "description": "Effortless slip-on luxury with traditional saddle strap and moc-toe stitching. Wear with or without socks for relaxed modern elegance.",
    "details": [
      "Supple full-grain calf leather that molds to your feet",
      "Classic penny keeper strap detail",
      "Breathable sockliner with arch support",
      "Lightweight and flexible driving sole"
    ],
    "specifications": [
      {
        "label": "Upper Material",
        "value": "Soft Calf Leather"
      },
      {
        "label": "Sole Material",
        "value": "Flexible Rubber Driving Sole"
      },
      {
        "label": "Closure",
        "value": "Slip-On"
      },
      {
        "label": "Style",
        "value": "Penny Loafer"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "UK 6",
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "colors": [
      {
        "name": "Dark Chestnut",
        "hex": "#451a03"
      },
      {
        "name": "Pitch Black",
        "hex": "#09090b"
      }
    ],
    "stock": 22,
    "rating": 4.7,
    "reviewCount": 23,
    "isNewArrival": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-10T10:00:00.000Z"
  },
  {
    "id": "mirli-fw-003",
    "slug": "goyal-sculptural-block-heel-mule",
    "sku": "GC-WFW-001",
    "name": "Aërona Sculptural Block Heel Mule",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "womens-footwear",
    "subcategoryTitle": "Women's Footwear",
    "price": 1299,
    "mrp": 2599,
    "discountPercent": 50,
    "description": "Architectural silhouette with an asymmetric vamp and 60mm sculpted flared block heel for stunning comfort and evening glamour.",
    "details": [
      "Soft lambskin-feel upper with ergonomic curved top-line",
      "60mm balanced flared block heel for stability",
      "Padded microfiber footbed with pressure relief",
      "Slim slip-resistant resin sole"
    ],
    "specifications": [
      {
        "label": "Upper Material",
        "value": "Synthetic Soft Nappa"
      },
      {
        "label": "Heel Height",
        "value": "60 mm (2.5 inches)"
      },
      {
        "label": "Sole Material",
        "value": "Resin Sheet"
      },
      {
        "label": "Type",
        "value": "Slip-On Mule"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "UK 3",
      "UK 4",
      "UK 5",
      "UK 6",
      "UK 7",
      "UK 8"
    ],
    "colors": [
      {
        "name": "Chalk White",
        "hex": "#f8fafc"
      },
      {
        "name": "Onyx Noir",
        "hex": "#09090b"
      }
    ],
    "stock": 25,
    "rating": 4.9,
    "reviewCount": 34,
    "isTrending": true,
    "featured": true,
    "status": "active",
    "createdAt": "2026-01-15T10:00:00.000Z"
  },
  {
    "id": "mirli-fw-004",
    "slug": "goyal-chunky-sole-loafer",
    "sku": "GC-WFW-002",
    "name": "Céleste Chunky Platform Loafer",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "womens-footwear",
    "subcategoryTitle": "Women's Footwear",
    "price": 1199,
    "mrp": 2399,
    "discountPercent": 50,
    "description": "A daring street-style essential featuring a lightweight lugged platform and polished silver chain hardware on the vamp.",
    "details": [
      "High-shine patent finish with scratch-resistant coating",
      "45mm ultra-lightweight EVA platform lug sole",
      "Cushioned memory foam insole",
      "Statement silver-tone chain accent"
    ],
    "specifications": [
      {
        "label": "Upper Material",
        "value": "Patent Faux Leather"
      },
      {
        "label": "Platform Height",
        "value": "45 mm"
      },
      {
        "label": "Sole Material",
        "value": "Lightweight EVA Lug"
      },
      {
        "label": "Toe Shape",
        "value": "Rounded Square"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "UK 3",
      "UK 4",
      "UK 5",
      "UK 6",
      "UK 7"
    ],
    "colors": [
      {
        "name": "Gloss Black",
        "hex": "#0a0a0a"
      },
      {
        "name": "Burgundy Wine",
        "hex": "#4a0404"
      }
    ],
    "stock": 20,
    "rating": 4.8,
    "reviewCount": 22,
    "isBestSeller": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-01-18T10:00:00.000Z"
  },
  {
    "id": "gc-wfw-003",
    "slug": "goyal-glamour-ankle-strap-heels",
    "sku": "GC-WFW-003",
    "name": "Glamour Ankle Strap Block Heel Sandal",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "womens-footwear",
    "subcategoryTitle": "Women's Footwear",
    "price": 999,
    "mrp": 1999,
    "discountPercent": 50,
    "description": "Sophisticated open-toe party sandals with an adjustable delicate ankle buckle strap and sturdy block heel designed for prolonged party wear.",
    "details": [
      "Soft microfiber upper with reinforced toe strap",
      "50mm block heel for zero wobble",
      "Adjustable gold metallic buckle strap",
      "Padded anti-sweat insole"
    ],
    "specifications": [
      {
        "label": "Heel Height",
        "value": "50 mm (2 inches)"
      },
      {
        "label": "Sole Material",
        "value": "Anti-Skid Sheet Sole"
      },
      {
        "label": "Closure",
        "value": "Ankle Buckle"
      },
      {
        "label": "Occasion",
        "value": "Party / Festive / Daily Chic"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "UK 3",
      "UK 4",
      "UK 5",
      "UK 6",
      "UK 7",
      "UK 8"
    ],
    "colors": [
      {
        "name": "Rose Nude",
        "hex": "#fbcfe8"
      },
      {
        "name": "Midnight Black",
        "hex": "#111827"
      },
      {
        "name": "Shimmer Gold",
        "hex": "#fde047"
      }
    ],
    "stock": 35,
    "rating": 4.8,
    "reviewCount": 45,
    "isTrending": true,
    "isNewArrival": true,
    "featured": true,
    "status": "active",
    "createdAt": "2026-02-02T10:00:00.000Z"
  },
  {
    "id": "gc-wfw-004",
    "slug": "goyal-velvet-comfort-ballet-flat",
    "sku": "GC-WFW-004",
    "name": "Velvet Comfort Pointed Ballet Flat",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "womens-footwear",
    "subcategoryTitle": "Women's Footwear",
    "price": 699,
    "mrp": 1399,
    "discountPercent": 50,
    "description": "Ultra-flexible everyday pointed flat with dual-layer memory foam cushioning. Effortlessly transitions from office meetings to weekend outings.",
    "details": [
      "Foldable ultra-soft faux leather upper",
      "Pointed toe elegance without pinching",
      "Latex padded heel collar to avoid shoe-bites",
      "Rubberized grip flex-sole"
    ],
    "specifications": [
      {
        "label": "Heel Type",
        "value": "Flat (10 mm)"
      },
      {
        "label": "Sole Material",
        "value": "Flexible Rubber"
      },
      {
        "label": "Toe Shape",
        "value": "Pointed Toe"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "UK 3",
      "UK 4",
      "UK 5",
      "UK 6",
      "UK 7"
    ],
    "colors": [
      {
        "name": "Classic Nude",
        "hex": "#d6c5b0"
      },
      {
        "name": "Jet Black",
        "hex": "#18181b"
      }
    ],
    "stock": 28,
    "rating": 4.7,
    "reviewCount": 39,
    "isBestSeller": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-06T10:00:00.000Z"
  },
  {
    "id": "gc-wfw-005",
    "slug": "goyal-bella-braided-kitten-heel",
    "sku": "GC-WFW-005",
    "name": "Bella Braided Strappy Kitten Heel Sandal",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "womens-footwear",
    "subcategoryTitle": "Women's Footwear",
    "price": 1099,
    "mrp": 2199,
    "discountPercent": 50,
    "description": "On-trend puffy braided twin strap sandal on a flattering 40mm kitten heel. A summer and festive favorite that looks charming with dresses and suits.",
    "details": [
      "Plush padded double braided straps",
      "40mm sturdy micro kitten heel",
      "Square open toe silhouette",
      "Non-slip textured sole"
    ],
    "specifications": [
      {
        "label": "Heel Height",
        "value": "40 mm (1.5 inches)"
      },
      {
        "label": "Sole",
        "value": "Anti-Skid TPR"
      },
      {
        "label": "Pattern",
        "value": "Braided Twill"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "UK 4",
      "UK 5",
      "UK 6",
      "UK 7",
      "UK 8"
    ],
    "colors": [
      {
        "name": "Cream Ivory",
        "hex": "#fef3c7"
      },
      {
        "name": "Lilac Mauve",
        "hex": "#c084fc"
      }
    ],
    "stock": 19,
    "rating": 4.9,
    "reviewCount": 16,
    "isNewArrival": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-12T10:00:00.000Z"
  },
  {
    "id": "mirli-fw-005",
    "slug": "goyal-junior-swift-sneaker",
    "sku": "GC-KFW-001",
    "name": "Junior Swift Breathable Kids' Sneaker",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "kids-footwear",
    "subcategoryTitle": "Kids' Footwear",
    "price": 599,
    "mrp": 1199,
    "discountPercent": 50,
    "description": "Lightweight kids runner crafted with breathable mesh and quick dual velcro straps so toddlers and juniors can slip in without parents helping.",
    "details": [
      "Aerated knitted fly-mesh upper for cool airflow",
      "Quick-fasten dual velcro hook-and-loop straps",
      "Featherlight Phylon shock-absorbing sole",
      "Reinforced bumper rubber toe cap"
    ],
    "specifications": [
      {
        "label": "Closure",
        "value": "Velcro Hook-and-Loop"
      },
      {
        "label": "Sole Material",
        "value": "Ultra-Lightweight Phylon"
      },
      {
        "label": "Washable",
        "value": "Hand Washable"
      },
      {
        "label": "Age Group",
        "value": "3 - 10 Years"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "Kids UK 8",
      "Kids UK 9",
      "Kids UK 10",
      "Kids UK 11",
      "Kids UK 12",
      "Kids UK 1",
      "Kids UK 2"
    ],
    "colors": [
      {
        "name": "Sporty Navy & Orange",
        "hex": "#1e3a8a"
      },
      {
        "name": "Core Black & White",
        "hex": "#0f172a"
      }
    ],
    "stock": 40,
    "rating": 4.8,
    "reviewCount": 33,
    "isTrending": true,
    "isBestSeller": true,
    "featured": true,
    "status": "active",
    "createdAt": "2026-01-20T10:00:00.000Z"
  },
  {
    "id": "gc-kfw-002",
    "slug": "goyal-kids-light-up-sports-shoes",
    "sku": "GC-KFW-002",
    "name": "Kids' Light-Up Active Running Sports Shoes",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "kids-footwear",
    "subcategoryTitle": "Kids' Footwear",
    "price": 699,
    "mrp": 1399,
    "discountPercent": 50,
    "description": "Exciting motion-activated flashing LED lights in the translucent heel. High durability, impact cushioning, and playful vibrant accents.",
    "details": [
      "Automatic kinetic LED light module in heel",
      "High-grip rubber tread outsole",
      "Soft collar padding to prevent ankle friction",
      "Convenient pull tab on tongue and heel"
    ],
    "specifications": [
      {
        "label": "Light Type",
        "value": "Step-Activated LED"
      },
      {
        "label": "Sole Material",
        "value": "Cushioned EVA & Rubber"
      },
      {
        "label": "Fastening",
        "value": "Elastic Laces + Velcro"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "Kids UK 7",
      "Kids UK 8",
      "Kids UK 9",
      "Kids UK 10",
      "Kids UK 11",
      "Kids UK 12"
    ],
    "colors": [
      {
        "name": "Neon Electric Blue",
        "hex": "#0284c7"
      },
      {
        "name": "Candy Pink & Silver",
        "hex": "#f43f5e"
      }
    ],
    "stock": 32,
    "rating": 4.9,
    "reviewCount": 41,
    "isTrending": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-03T10:00:00.000Z"
  },
  {
    "id": "gc-kfw-003",
    "slug": "goyal-kids-waterproof-eva-clogs",
    "sku": "GC-KFW-003",
    "name": "Kids' Anti-Slip Waterproof EVA Clogs",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "kids-footwear",
    "subcategoryTitle": "Kids' Footwear",
    "price": 399,
    "mrp": 799,
    "discountPercent": 50,
    "description": "Super lightweight waterproof clogs featuring ventilation ports, convertible heel strap, and fun 3D shoe charms for everyday play.",
    "details": [
      "100% Waterproof and washable EVA foam",
      "Pivoting heel strap for secure fit or slide mode",
      "Drainage holes for water and sand",
      "Odor-resistant and easy to clean"
    ],
    "specifications": [
      {
        "label": "Material",
        "value": "Molded EVA"
      },
      {
        "label": "Water Resistance",
        "value": "Fully Waterproof"
      },
      {
        "label": "Care",
        "value": "Rinse with cold water"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "Kids UK 6",
      "Kids UK 7",
      "Kids UK 8",
      "Kids UK 9",
      "Kids UK 10",
      "Kids UK 11"
    ],
    "colors": [
      {
        "name": "Sunny Yellow",
        "hex": "#eab308"
      },
      {
        "name": "Aqua Blue",
        "hex": "#06b6d4"
      },
      {
        "name": "Lavender Purple",
        "hex": "#a855f7"
      }
    ],
    "stock": 50,
    "rating": 4.7,
    "reviewCount": 29,
    "isBestSeller": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-07T10:00:00.000Z"
  },
  {
    "id": "gc-kfw-004",
    "slug": "goyal-kids-smart-leather-school-shoe",
    "sku": "GC-KFW-004",
    "name": "Boys' & Girls' Smart Leather School Shoes",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "kids-footwear",
    "subcategoryTitle": "Kids' Footwear",
    "price": 499,
    "mrp": 999,
    "discountPercent": 50,
    "description": "Strict school code compliant uniform shoes made with durable scuff-resistant upper, cushioned insole, and easy hook-and-loop velcro strap.",
    "details": [
      "High-shine scuff-resistant black finish",
      "Strong velcro closure for active school days",
      "Anti-marking rubber sole approved for school grounds",
      "Thick padded collar to prevent heel rubbing"
    ],
    "specifications": [
      {
        "label": "Sole Type",
        "value": "Non-Marking Anti-Skid Rubber"
      },
      {
        "label": "Closure",
        "value": "Single Wide Velcro Strap"
      },
      {
        "label": "Compliance",
        "value": "All CBSE/ICSE School Standards"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "Kids UK 9",
      "Kids UK 10",
      "Kids UK 11",
      "Kids UK 12",
      "Kids UK 1",
      "Kids UK 2",
      "Kids UK 3"
    ],
    "colors": [
      {
        "name": "Standard School Black",
        "hex": "#0a0a0a"
      },
      {
        "name": "Clean School White",
        "hex": "#ffffff"
      }
    ],
    "stock": 45,
    "rating": 4.8,
    "reviewCount": 36,
    "isBestSeller": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-09T10:00:00.000Z"
  },
  {
    "id": "gc-kfw-005",
    "slug": "goyal-kids-cozy-slip-on-canvas",
    "sku": "GC-KFW-005",
    "name": "Kids' Cozy Slip-On Casual Canvas Shoes",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "kids-footwear",
    "subcategoryTitle": "Kids' Footwear",
    "price": 449,
    "mrp": 899,
    "discountPercent": 50,
    "description": "Fun, flexible and lightweight slip-on canvas shoes with side elastic inserts. Ideal for kindergarten, park play, and family gatherings.",
    "details": [
      "100% Breathable cotton canvas",
      "Soft flexible vulcanized rubber sole",
      "Removable washable cushioned insole",
      "Elastic side gores for easy slip-on"
    ],
    "specifications": [
      {
        "label": "Upper",
        "value": "Cotton Canvas"
      },
      {
        "label": "Sole",
        "value": "Vulcanized Rubber"
      },
      {
        "label": "Weight",
        "value": "Under 180 grams"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "Kids UK 7",
      "Kids UK 8",
      "Kids UK 9",
      "Kids UK 10",
      "Kids UK 11"
    ],
    "colors": [
      {
        "name": "Cheery Red",
        "hex": "#ef4444"
      },
      {
        "name": "Midnight Navy",
        "hex": "#1e3a8a"
      }
    ],
    "stock": 26,
    "rating": 4.7,
    "reviewCount": 18,
    "isNewArrival": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-14T10:00:00.000Z"
  },
  {
    "id": "mirli-fw-006",
    "slug": "goyal-lumina-monochrome-sneaker",
    "sku": "GC-SH-001",
    "name": "Lumina Minimalist White Court Sneaker",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "shoes",
    "subcategoryTitle": "Shoes",
    "price": 1299,
    "mrp": 2599,
    "discountPercent": 50,
    "description": "An architectural everyday white sneaker with a low-profile silhouette, reinforced eyelets, and durable rubber cupsole.",
    "details": [
      "Premium synthetic Nappa leather with wipe-clean surface",
      "Reinforced heel counter with subtle embossed logo",
      "Orthopedic memory foam insole for all-day walking",
      "Non-slip herringbone patterned cupsole"
    ],
    "specifications": [
      {
        "label": "Sole Type",
        "value": "Vulcanized Rubber Cupsole"
      },
      {
        "label": "Fastening",
        "value": "Flat Cotton Laces"
      },
      {
        "label": "Insole",
        "value": "Anti-Bacterial Memory Foam"
      },
      {
        "label": "Weight",
        "value": "380g per shoe"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "UK 6",
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10",
      "UK 11"
    ],
    "colors": [
      {
        "name": "Crisp White",
        "hex": "#ffffff"
      },
      {
        "name": "Triple Black",
        "hex": "#09090b"
      }
    ],
    "stock": 35,
    "rating": 4.9,
    "reviewCount": 52,
    "isTrending": true,
    "isBestSeller": true,
    "featured": true,
    "status": "active",
    "createdAt": "2026-01-22T10:00:00.000Z"
  },
  {
    "id": "mirli-fw-007",
    "slug": "goyal-apex-wholecut-derby",
    "sku": "GC-SH-002",
    "name": "Apex Handcrafted Wholecut Derby Shoe",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "shoes",
    "subcategoryTitle": "Shoes",
    "price": 1499,
    "mrp": 2999,
    "discountPercent": 50,
    "description": "Cut from a seamless single piece of premium leather without side stitching. Delivers an extraordinarily sleek, aerodynamic dress shoe profile.",
    "details": [
      "Genuine wholecut one-piece construction",
      "Burnished toe accent with hand-rubbed wax finish",
      "Full leather cushioned insole",
      "Durable resin rubber outsole with wooden welt look"
    ],
    "specifications": [
      {
        "label": "Upper Material",
        "value": "Full-Grain Crust Leather"
      },
      {
        "label": "Sole Material",
        "value": "Composite Resin"
      },
      {
        "label": "Construction",
        "value": "Wholecut Seamless"
      },
      {
        "label": "Origin",
        "value": "Handcrafted in Agra, India"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "colors": [
      {
        "name": "Deep Burgundy",
        "hex": "#3f1717"
      },
      {
        "name": "Pure Jet",
        "hex": "#000000"
      }
    ],
    "stock": 22,
    "rating": 4.8,
    "reviewCount": 27,
    "isBestSeller": false,
    "featured": false,
    "status": "active",
    "createdAt": "2026-01-25T10:00:00.000Z"
  },
  {
    "id": "gc-sh-003",
    "slug": "goyal-cloudmesh-running-trainers",
    "sku": "GC-SH-003",
    "name": "CloudMesh Ultra-Light Running Trainers",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "shoes",
    "subcategoryTitle": "Shoes",
    "price": 899,
    "mrp": 1799,
    "discountPercent": 50,
    "description": "Dynamic lightweight athletic shoe with engineered jacquard mesh and responsive high-rebound cushioning for running, gym, and brisk walks.",
    "details": [
      "Breathable engineered 3D mesh upper",
      "High rebound EVA midsole absorbs heel shock",
      "Deep grooved flex outsole for natural foot motion",
      "Padded tongue and ankle collar"
    ],
    "specifications": [
      {
        "label": "Sole Material",
        "value": "Shock-Absorbing Phylon"
      },
      {
        "label": "Weight",
        "value": "260g (featherlight)"
      },
      {
        "label": "Best For",
        "value": "Running, Gym, Daily Cardio"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "UK 6",
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10",
      "UK 11"
    ],
    "colors": [
      {
        "name": "Stealth Grey & Neon",
        "hex": "#475569"
      },
      {
        "name": "Core Black",
        "hex": "#0f172a"
      }
    ],
    "stock": 40,
    "rating": 4.8,
    "reviewCount": 49,
    "isTrending": true,
    "isNewArrival": true,
    "featured": true,
    "status": "active",
    "createdAt": "2026-02-04T10:00:00.000Z"
  },
  {
    "id": "gc-sh-004",
    "slug": "goyal-streetwear-high-top-canvas",
    "sku": "GC-SH-004",
    "name": "Streetwear High-Top Canvas Sneakers",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "shoes",
    "subcategoryTitle": "Shoes",
    "price": 999,
    "mrp": 1999,
    "discountPercent": 50,
    "description": "Iconic high-top silhouette in heavy-duty 14oz cotton duck canvas with reinforced toe cap and contrast rubber foxing stripe.",
    "details": [
      "Heavyweight 14oz pure cotton canvas",
      "Vulcanized rubber sole with diamond tread",
      "Dual medial ventilation grommets for breathability",
      "Ankle supporting high-top collar"
    ],
    "specifications": [
      {
        "label": "Upper",
        "value": "14oz Cotton Canvas"
      },
      {
        "label": "Sole",
        "value": "Vulcanized Waffle Rubber"
      },
      {
        "label": "Collar Style",
        "value": "High-Top Ankle"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "UK 6",
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "colors": [
      {
        "name": "Monochrome Black",
        "hex": "#18181b"
      },
      {
        "name": "Classic Off-White",
        "hex": "#fafaf9"
      }
    ],
    "stock": 25,
    "rating": 4.7,
    "reviewCount": 30,
    "isBestSeller": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-08T10:00:00.000Z"
  },
  {
    "id": "gc-sh-005",
    "slug": "goyal-slip-on-walking-shoes",
    "sku": "GC-SH-005",
    "name": "Slip-On Memory Foam Walking Shoes",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "shoes",
    "subcategoryTitle": "Shoes",
    "price": 799,
    "mrp": 1599,
    "discountPercent": 50,
    "description": "Stretch-fit laceless walking shoes with an air-cooled memory foam cushioned insole. Engineered for seniors, commuters, and relaxed errands.",
    "details": [
      "Elasticized knit sock upper for zero-pressure fit",
      "Air-cooled anatomical memory foam insole",
      "Shock-absorbing flex midsole",
      "Machine washable easy care"
    ],
    "specifications": [
      {
        "label": "Closure",
        "value": "Slip-On Laceless"
      },
      {
        "label": "Insole",
        "value": "Air-Cooled Memory Foam"
      },
      {
        "label": "Sole Material",
        "value": "Ultra-Flex EVA"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "UK 6",
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "colors": [
      {
        "name": "Charcoal Grey",
        "hex": "#374151"
      },
      {
        "name": "Navy Blue",
        "hex": "#1e3a8a"
      }
    ],
    "stock": 38,
    "rating": 4.9,
    "reviewCount": 44,
    "isNewArrival": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-13T10:00:00.000Z"
  },
  {
    "id": "mirli-fw-008",
    "slug": "goyal-athena-criss-cross-sandal",
    "sku": "GC-SS-001",
    "name": "Athena Leather Criss-Cross Sandal",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "sandals-slippers",
    "subcategoryTitle": "Sandals & Slippers",
    "price": 699,
    "mrp": 1399,
    "discountPercent": 50,
    "description": "Minimalist wide cross-strap sandal crafted from vegetable-tanned leather with a contoured anatomical footbed and sturdy rubber sole.",
    "details": [
      "Full-grain supple leather straps with soft microfiber backing",
      "Ergonomically molded footbed with deep heel cup",
      "Textured rubber traction outsole",
      "Hand-burnished edges"
    ],
    "specifications": [
      {
        "label": "Upper Material",
        "value": "Full-Grain Leather"
      },
      {
        "label": "Footbed",
        "value": "Ergonomic Molded PU"
      },
      {
        "label": "Sole Material",
        "value": "Traction Rubber"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "UK 6",
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "colors": [
      {
        "name": "Caramel Tan",
        "hex": "#b45309"
      },
      {
        "name": "Midnight Onyx",
        "hex": "#000000"
      }
    ],
    "stock": 30,
    "rating": 4.8,
    "reviewCount": 38,
    "isTrending": true,
    "featured": true,
    "status": "active",
    "createdAt": "2026-01-26T10:00:00.000Z"
  },
  {
    "id": "mirli-fw-009",
    "slug": "goyal-zenith-padded-lounge-slide",
    "sku": "GC-SS-002",
    "name": "Zenith Padded Leather Lounge Slide",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "sandals-slippers",
    "subcategoryTitle": "Sandals & Slippers",
    "price": 599,
    "mrp": 1199,
    "discountPercent": 50,
    "description": "Pillow-soft padded single strap slide with dual-density cloud foam sole. Designed for effortless indoor and outdoor living.",
    "details": [
      "Puffy quilted leather-feel strap with foam filling",
      "Water-resistant textured footbed",
      "Featherlight dual-density EVA construction",
      "Anti-microbial treated top layer"
    ],
    "specifications": [
      {
        "label": "Strap",
        "value": "Padded Vegan Nappa"
      },
      {
        "label": "Sole",
        "value": "Dual-Density Foam"
      },
      {
        "label": "Style",
        "value": "One-Band Slide"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "UK 6",
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10",
      "UK 11"
    ],
    "colors": [
      {
        "name": "Matte Charcoal",
        "hex": "#1f2937"
      },
      {
        "name": "Olive Green",
        "hex": "#3f6212"
      }
    ],
    "stock": 32,
    "rating": 4.7,
    "reviewCount": 26,
    "isBestSeller": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-01-28T10:00:00.000Z"
  },
  {
    "id": "gc-ss-003",
    "slug": "goyal-orthopedic-soft-daily-chappal",
    "sku": "GC-SS-003",
    "name": "Orthopedic Extra-Soft Daily Comfort Slippers",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "sandals-slippers",
    "subcategoryTitle": "Sandals & Slippers",
    "price": 399,
    "mrp": 799,
    "discountPercent": 50,
    "description": "Specially engineered orthopedic doctor-sole slippers for pain relief and all-day home and outdoor comfort. Relieves heel and knee pressure.",
    "details": [
      "Multi-density soft acupressure textured footbed",
      "Relieves plantar fasciitis and heel spur pain",
      "Wide flexible V-strap for comfortable instep",
      "Slip-resistant wet grip corrugated bottom"
    ],
    "specifications": [
      {
        "label": "Footbed",
        "value": "Doctor-Engineered Soft Ortho EVA"
      },
      {
        "label": "Sole",
        "value": "Anti-Skid Textured Rubber"
      },
      {
        "label": "Target",
        "value": "Knee & Heel Pain Relief"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "UK 6",
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "colors": [
      {
        "name": "Slate Grey",
        "hex": "#4b5563"
      },
      {
        "name": "Classic Black",
        "hex": "#111827"
      },
      {
        "name": "Coffee Brown",
        "hex": "#78350f"
      }
    ],
    "stock": 55,
    "rating": 4.9,
    "reviewCount": 68,
    "isBestSeller": true,
    "featured": true,
    "status": "active",
    "createdAt": "2026-02-05T10:00:00.000Z"
  },
  {
    "id": "gc-ss-004",
    "slug": "goyal-double-buckle-cork-slides",
    "sku": "GC-SS-004",
    "name": "Double-Buckle Cork Footbed Arizona Slides",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "sandals-slippers",
    "subcategoryTitle": "Sandals & Slippers",
    "price": 799,
    "mrp": 1599,
    "discountPercent": 50,
    "description": "Classic twin-strap German inspired slide with real cork-latex footbed, suede lining, and individually adjustable metal pin buckles.",
    "details": [
      "Anatomically shaped genuine cork-latex footbed",
      "Soft genuine suede leather lining underfoot",
      "Individually adjustable metal pin buckles",
      "Lightweight shock-absorbing EVA sole"
    ],
    "specifications": [
      {
        "label": "Footbed",
        "value": "Natural Cork & Latex"
      },
      {
        "label": "Upper",
        "value": "Suede Finish Nubuck"
      },
      {
        "label": "Buckles",
        "value": "Corrosion-Resistant Metal"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "UK 6",
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "colors": [
      {
        "name": "Mocha Suede",
        "hex": "#713f12"
      },
      {
        "name": "Desert Sand",
        "hex": "#d4b996"
      }
    ],
    "stock": 28,
    "rating": 4.8,
    "reviewCount": 33,
    "isTrending": true,
    "isNewArrival": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-10T10:00:00.000Z"
  },
  {
    "id": "gc-ss-005",
    "slug": "goyal-handcrafted-leather-kolhapuri",
    "sku": "GC-SS-005",
    "name": "Handcrafted Genuine Leather Kolhapuri Chappal",
    "category": "footwear",
    "categoryTitle": "Footwear",
    "subcategory": "sandals-slippers",
    "subcategoryTitle": "Sandals & Slippers",
    "price": 549,
    "mrp": 1099,
    "discountPercent": 50,
    "description": "Traditional authentic Kolhapuri chappal made with vegetable-tanned buffalo leather, braided leather lace work, and classic toe ring style for festive occasions.",
    "details": [
      "100% Genuine vegetable tanned buffalo leather",
      "Intricate handmade braided leather strap work",
      "Cushioned leather insole for enhanced comfort",
      "Sturdy natural leather sole with rubber heel patch"
    ],
    "specifications": [
      {
        "label": "Craft",
        "value": "Traditional Kolhapuri Handcrafted"
      },
      {
        "label": "Material",
        "value": "Vegetable-Tanned Buffalo Leather"
      },
      {
        "label": "Occasion",
        "value": "Kurta-Pyjama / Festive / Ethnic"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "UK 6",
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10"
    ],
    "colors": [
      {
        "name": "Natural Antique Tan",
        "hex": "#92400e"
      },
      {
        "name": "Jet Black",
        "hex": "#0f172a"
      }
    ],
    "stock": 35,
    "rating": 4.8,
    "reviewCount": 29,
    "isBestSeller": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-15T10:00:00.000Z"
  },
  {
    "id": "mirli-cl-001",
    "slug": "goyal-single-breasted-party-blazer",
    "sku": "GC-MW-001",
    "name": "Classic Single-Breasted Tailored Party Blazer",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "mens-wear",
    "subcategoryTitle": "Men's Wear",
    "price": 1999,
    "mrp": 3999,
    "discountPercent": 50,
    "description": "Expertly tailored blazer featuring structured shoulders, peak lapels, double-vented rear, and custom engraved metallic buttons for weddings and cocktail events.",
    "details": [
      "Premium poly-viscose wool touch fabric with fluid drape",
      "Notched lapel with floral lapel pin eyelet",
      "Internal smartphone and passport utility pockets",
      "Silky smooth breathable jacquard lining"
    ],
    "specifications": [
      {
        "label": "Fabric Composition",
        "value": "70% Polyester, 30% Viscose"
      },
      {
        "label": "Fit Type",
        "value": "Modern Slim Fit"
      },
      {
        "label": "Closure",
        "value": "Two-Button Single-Breasted"
      },
      {
        "label": "Care",
        "value": "Dry Clean Recommended"
      },
      {
        "label": "Origin",
        "value": "Crafted in Surat, India"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "colors": [
      {
        "name": "Royal Navy Blue",
        "hex": "#1e3a8a"
      },
      {
        "name": "Obsidian Black",
        "hex": "#0a0a0a"
      },
      {
        "name": "Wine Maroon",
        "hex": "#881337"
      }
    ],
    "stock": 22,
    "rating": 4.9,
    "reviewCount": 36,
    "isTrending": true,
    "isBestSeller": true,
    "featured": true,
    "status": "active",
    "createdAt": "2026-01-10T10:00:00.000Z"
  },
  {
    "id": "mirli-cl-002",
    "slug": "goyal-supima-cotton-tshirt",
    "sku": "GC-MW-002",
    "name": "Heavyweight 240 GSM Pure Supima Cotton T-Shirt",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "mens-wear",
    "subcategoryTitle": "Men's Wear",
    "price": 499,
    "mrp": 999,
    "discountPercent": 50,
    "description": "Constructed from extra-long staple 100% combed cotton with zero fade bio-wash and a snug double-needle ribbed collar that never sags.",
    "details": [
      "100% Combed Compact Cotton (240 GSM)",
      "Pre-shrunk fabric with super-soft silicon wash",
      "Reinforced neck and shoulder taped seams",
      "Contemporary relaxed streetwear cut"
    ],
    "specifications": [
      {
        "label": "Fabric",
        "value": "100% Bio-Washed Cotton (240 GSM)"
      },
      {
        "label": "Neckline",
        "value": "Ribbed Crewneck"
      },
      {
        "label": "Sleeve",
        "value": "Half Sleeve"
      },
      {
        "label": "Wash Care",
        "value": "Machine Wash Cold"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      {
        "name": "Jet Black",
        "hex": "#0f172a"
      },
      {
        "name": "Pure White",
        "hex": "#ffffff"
      },
      {
        "name": "Olive Green",
        "hex": "#3f6212"
      },
      {
        "name": "Oatmeal Beige",
        "hex": "#d6d3d1"
      }
    ],
    "stock": 50,
    "rating": 4.8,
    "reviewCount": 65,
    "isBestSeller": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-01-12T10:00:00.000Z"
  },
  {
    "id": "gc-mw-003",
    "slug": "goyal-cotton-oxford-formal-shirt",
    "sku": "GC-MW-003",
    "name": "100% Cotton Premium Oxford Formal Shirt",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "mens-wear",
    "subcategoryTitle": "Men's Wear",
    "price": 799,
    "mrp": 1599,
    "discountPercent": 50,
    "description": "Crisp, breathable 100% cotton button-down formal shirt. Ideal for corporate boardrooms, formal interviews, and sharp smart-casual ensembles.",
    "details": [
      "Pure long-staple cotton Oxford weave",
      "Spread collar with removable bone stays",
      "Reinforced single-button rounded cuffs",
      "Curved hemline can be tucked in or worn out"
    ],
    "specifications": [
      {
        "label": "Fabric",
        "value": "100% Cotton Oxford"
      },
      {
        "label": "Fit",
        "value": "Regular Smart Fit"
      },
      {
        "label": "Sleeve",
        "value": "Full Sleeve"
      },
      {
        "label": "Pattern",
        "value": "Solid / Subtle Oxford Weave"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "38 (S)",
      "40 (M)",
      "42 (L)",
      "44 (XL)"
    ],
    "colors": [
      {
        "name": "Sky Blue",
        "hex": "#bae6fd"
      },
      {
        "name": "Crisp White",
        "hex": "#ffffff"
      },
      {
        "name": "Pastel Pink",
        "hex": "#fce7f3"
      }
    ],
    "stock": 35,
    "rating": 4.8,
    "reviewCount": 41,
    "isTrending": true,
    "featured": true,
    "status": "active",
    "createdAt": "2026-02-02T10:00:00.000Z"
  },
  {
    "id": "gc-mw-004",
    "slug": "goyal-royal-heritage-kurta-pajama-set",
    "sku": "GC-MW-004",
    "name": "Royal Heritage Kurta Pajama with Embroidered Jacket",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "mens-wear",
    "subcategoryTitle": "Men's Wear",
    "price": 1699,
    "mrp": 3399,
    "discountPercent": 50,
    "description": "Complete 3-piece festive ethnic set: Silk-blend kurta with mandarin collar, matching comfortable churidar / pajama, and an embroidered Nehru jacket.",
    "details": [
      "3-Piece Set: Kurta + Pajama + Nehru Jacket",
      "Jacquard woven motif detailing on jacket",
      "Functional side pockets in kurta and pajama",
      "Concealed placket with metallic show buttons"
    ],
    "specifications": [
      {
        "label": "Kurta Fabric",
        "value": "Cotton Silk Blend"
      },
      {
        "label": "Jacket Fabric",
        "value": "Banarasi Jacquard Silk"
      },
      {
        "label": "Occasion",
        "value": "Weddings / Diwali / Festive Celebrations"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "S (38)",
      "M (40)",
      "L (42)",
      "XL (44)"
    ],
    "colors": [
      {
        "name": "Imperial Maroon & Cream",
        "hex": "#881337"
      },
      {
        "name": "Royal Peacock Blue",
        "hex": "#0369a1"
      },
      {
        "name": "Ivory Gold",
        "hex": "#fef08a"
      }
    ],
    "stock": 25,
    "rating": 4.9,
    "reviewCount": 24,
    "isNewArrival": true,
    "featured": true,
    "status": "active",
    "createdAt": "2026-02-06T10:00:00.000Z"
  },
  {
    "id": "gc-mw-005",
    "slug": "goyal-slim-fit-stretch-chino-trousers",
    "sku": "GC-MW-005",
    "name": "Slim Fit Stretch Cotton Chino Trousers",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "mens-wear",
    "subcategoryTitle": "Men's Wear",
    "price": 899,
    "mrp": 1799,
    "discountPercent": 50,
    "description": "Versatile cotton stretch chinos engineered with 2% elastane for seamless mobility. Pairs gracefully with both formal shirts and casual polo tees.",
    "details": [
      "98% Twill Cotton, 2% Spandex for active flex",
      "Wrinkle-resistant garment enzyme wash",
      "Dual rear welt pockets with button closure",
      "Reinforced zip fly with sturdy button tab"
    ],
    "specifications": [
      {
        "label": "Fit",
        "value": "Slim Tapered Fit"
      },
      {
        "label": "Waistband",
        "value": "Mid-Rise with Belt Loops"
      },
      {
        "label": "Length",
        "value": "Full Length (32\" Inseam)"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "30",
      "32",
      "34",
      "36",
      "38"
    ],
    "colors": [
      {
        "name": "Khaki Sand",
        "hex": "#d4b996"
      },
      {
        "name": "Navy Blue",
        "hex": "#1e3a8a"
      },
      {
        "name": "Olive Green",
        "hex": "#3f6212"
      },
      {
        "name": "Charcoal Black",
        "hex": "#18181b"
      }
    ],
    "stock": 35,
    "rating": 4.8,
    "reviewCount": 38,
    "isBestSeller": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-11T10:00:00.000Z"
  },
  {
    "id": "mirli-cl-003",
    "slug": "goyal-aurora-belted-trench-coat",
    "sku": "GC-WW-001",
    "name": "Aurora Minimalist Belted Overcoat & Trench",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "womens-wear",
    "subcategoryTitle": "Women's Wear",
    "price": 1899,
    "mrp": 3799,
    "discountPercent": 50,
    "description": "Timeless double-breasted outerwear with storm flap, buckled waist sash, deep welt pockets, and a clean structured drape.",
    "details": [
      "Water-repellent structured cotton-blend gabardine",
      "Removable fabric waist belt with horn-effect buckle",
      "Back storm shield with vented hem for mobility",
      "Full smooth interior lining"
    ],
    "specifications": [
      {
        "label": "Fabric",
        "value": "Cotton-Polyester Gabardine"
      },
      {
        "label": "Fit",
        "value": "Tailored Regular"
      },
      {
        "label": "Length",
        "value": "Mid-Calf"
      },
      {
        "label": "Closure",
        "value": "Double-Breasted Buttons + Belt"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      {
        "name": "Stone Beige",
        "hex": "#d6d3d1"
      },
      {
        "name": "Midnight Charcoal",
        "hex": "#18181b"
      }
    ],
    "stock": 20,
    "rating": 4.9,
    "reviewCount": 32,
    "isTrending": true,
    "featured": true,
    "status": "active",
    "createdAt": "2026-01-14T10:00:00.000Z"
  },
  {
    "id": "mirli-cl-004",
    "slug": "goyal-silk-blend-slip-dress",
    "sku": "GC-WW-002",
    "name": "Seraphina Pure Silk Blend Slip Party Dress",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "womens-wear",
    "subcategoryTitle": "Women's Wear",
    "price": 1299,
    "mrp": 2599,
    "discountPercent": 50,
    "description": "Cut on the bias for a liquid silhouette that hugs natural contours. Finished with delicate adjustable spaghetti straps and French seams.",
    "details": [
      "Heavyweight 22-momme silk blend with liquid luster",
      "Bias cut for natural body draping without clinging",
      "Adjustable micro shoulder straps with gold sliders",
      "Side discreet zipper closure"
    ],
    "specifications": [
      {
        "label": "Material",
        "value": "Silk Satin Blend"
      },
      {
        "label": "Length",
        "value": "Midi (Below Knee)"
      },
      {
        "label": "Neckline",
        "value": "Soft Cowl Neck"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      {
        "name": "Emerald Green",
        "hex": "#064e3b"
      },
      {
        "name": "Champagne Gold",
        "hex": "#fef08a"
      },
      {
        "name": "Black Onyx",
        "hex": "#0a0a0a"
      }
    ],
    "stock": 24,
    "rating": 4.8,
    "reviewCount": 26,
    "isBestSeller": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-01-16T10:00:00.000Z"
  },
  {
    "id": "gc-ww-003",
    "slug": "goyal-cotton-anarkali-suit-set",
    "sku": "GC-WW-003",
    "name": "Pure Cotton Floral Anarkali Kurta, Pant & Dupatta Set",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "womens-wear",
    "subcategoryTitle": "Women's Wear",
    "price": 1199,
    "mrp": 2399,
    "discountPercent": 50,
    "description": "Full 3-piece ready-to-wear ethnic suit set. Hand-block floral printed pure 60x60 cambric cotton with gotta patti border detailing and matching dupatta.",
    "details": [
      "Complete 3-Piece Set: Flared Anarkali Kurta + Cigarette Pant + Malmal Dupatta",
      "100% Breathable Jaipuri Cambric Cotton",
      "Delicate golden gotta patti neck and hem embroidery",
      "Fully elasticated pant with deep side pocket"
    ],
    "specifications": [
      {
        "label": "Kurta Style",
        "value": "Flared Anarkali (3.5m Ghera)"
      },
      {
        "label": "Fabric",
        "value": "100% Cotton (60s Cambric)"
      },
      {
        "label": "Sleeve",
        "value": "3/4th Sleeve with Border"
      },
      {
        "label": "Origin",
        "value": "Handcrafted in Jaipur, India"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "S (36)",
      "M (38)",
      "L (40)",
      "XL (42)",
      "XXL (44)"
    ],
    "colors": [
      {
        "name": "Indigo Blue Floral",
        "hex": "#1e3a8a"
      },
      {
        "name": "Rani Pink & Gold",
        "hex": "#be185d"
      }
    ],
    "stock": 45,
    "rating": 4.9,
    "reviewCount": 57,
    "isTrending": true,
    "isNewArrival": true,
    "featured": true,
    "status": "active",
    "createdAt": "2026-02-03T10:00:00.000Z"
  },
  {
    "id": "gc-ww-004",
    "slug": "goyal-festive-chanderi-silk-kurti",
    "sku": "GC-WW-004",
    "name": "Festive Chanderi Silk Embroidered Straight Kurti",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "womens-wear",
    "subcategoryTitle": "Women's Wear",
    "price": 899,
    "mrp": 1799,
    "discountPercent": 50,
    "description": "Lustrous Chanderi silk kurti adorned with intricate zari thread embroidery on the neckline and side slits. Perfect for festive rituals and office events.",
    "details": [
      "Authentic Chanderi silk with subtle metallic sheen",
      "Zari and sequin neckline embroidery",
      "Soft breathable cotton mulmul inner lining included",
      "Side slits with reinforced bar-tack stitching"
    ],
    "specifications": [
      {
        "label": "Fabric",
        "value": "Chanderi Silk with Cotton Lining"
      },
      {
        "label": "Neckline",
        "value": "Round Neck with Keyhole"
      },
      {
        "label": "Care",
        "value": "Gentle Hand Wash or Dry Clean"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "S (36)",
      "M (38)",
      "L (40)",
      "XL (42)"
    ],
    "colors": [
      {
        "name": "Mustard Yellow",
        "hex": "#ca8a04"
      },
      {
        "name": "Sage Mint Green",
        "hex": "#059669"
      }
    ],
    "stock": 30,
    "rating": 4.8,
    "reviewCount": 31,
    "isBestSeller": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-08T10:00:00.000Z"
  },
  {
    "id": "gc-ww-005",
    "slug": "goyal-high-waist-palazzo-trousers",
    "sku": "GC-WW-005",
    "name": "High-Waist Fluid Pleated Wide Leg Palazzo Trousers",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "womens-wear",
    "subcategoryTitle": "Women's Wear",
    "price": 699,
    "mrp": 1399,
    "discountPercent": 50,
    "description": "Chic wide-leg palazzo pants with front pleats and a structured waistband. Styled seamlessly with crop tops, kurtis, or formal shirts.",
    "details": [
      "Wrinkle-free poly-crepe fabric with heavy fluid drape",
      "High-rise structured front waistband with elasticated back",
      "Deep dual functional side pockets",
      "Wide flare for effortless leg movement"
    ],
    "specifications": [
      {
        "label": "Fit",
        "value": "Wide Leg Palazzo"
      },
      {
        "label": "Rise",
        "value": "High Rise"
      },
      {
        "label": "Length",
        "value": "Full Length (39 inches)"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "28 (S)",
      "30 (M)",
      "32 (L)",
      "34 (XL)"
    ],
    "colors": [
      {
        "name": "Onyx Black",
        "hex": "#111827"
      },
      {
        "name": "Ivory Cream",
        "hex": "#fdfbf7"
      },
      {
        "name": "Earthy Olive",
        "hex": "#365314"
      }
    ],
    "stock": 40,
    "rating": 4.7,
    "reviewCount": 28,
    "isNewArrival": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-14T10:00:00.000Z"
  },
  {
    "id": "mirli-cl-005",
    "slug": "goyal-junior-tshirt-shorts-set",
    "sku": "GC-KW-001",
    "name": "Junior Organic Cotton 2-Piece T-Shirt & Shorts Set",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "kids-wear",
    "subcategoryTitle": "Kids' Wear",
    "price": 499,
    "mrp": 999,
    "discountPercent": 50,
    "description": "Cozy two-piece lounge and play set in super-soft 100% organic cotton. Skin-friendly, tag-less, and machine washable for active kids.",
    "details": [
      "100% GOTS certified organic combed cotton",
      "Tag-less neck label to prevent sensitive skin itching",
      "Elasticized waistband with functional drawcord",
      "Double-stitched stress seams for rough and tumble play"
    ],
    "specifications": [
      {
        "label": "Set Includes",
        "value": "1 Tee + 1 Matching Shorts"
      },
      {
        "label": "Material",
        "value": "100% Organic Cotton (180 GSM)"
      },
      {
        "label": "Safety",
        "value": "Azo-Free Non-Toxic Dyes"
      },
      {
        "label": "Care",
        "value": "Machine Wash Warm"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "2-3 Years",
      "4-5 Years",
      "6-7 Years",
      "8-9 Years",
      "10-11 Years"
    ],
    "colors": [
      {
        "name": "Heather Grey",
        "hex": "#9ca3af"
      },
      {
        "name": "Sage Green",
        "hex": "#84cc16"
      }
    ],
    "stock": 45,
    "rating": 4.9,
    "reviewCount": 37,
    "isTrending": true,
    "isBestSeller": true,
    "featured": true,
    "status": "active",
    "createdAt": "2026-01-20T10:00:00.000Z"
  },
  {
    "id": "gc-kw-002",
    "slug": "goyal-kids-fleece-hooded-tracksuit",
    "sku": "GC-KW-002",
    "name": "Kids' Soft Fleece Zipper Hooded Tracksuit Set",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "kids-wear",
    "subcategoryTitle": "Kids' Wear",
    "price": 799,
    "mrp": 1599,
    "discountPercent": 50,
    "description": "Complete winter warm set: Full-zip hooded sweatshirt and matching jogger pants lined with brushed thermal fleece for chilly mornings and outdoor travel.",
    "details": [
      "Brushed thermal fleece interior for cozy warmth",
      "Heavy-duty plastic molded zipper safe for children",
      "Ribbed cuffs and hem to lock in body heat",
      "Kangaroo front split pockets"
    ],
    "specifications": [
      {
        "label": "Fabric",
        "value": "Cotton Fleece Blend (280 GSM)"
      },
      {
        "label": "Set Items",
        "value": "Hooded Sweatshirt + Jogger Pant"
      },
      {
        "label": "Season",
        "value": "Autumn / Winter"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "3-4 Years",
      "5-6 Years",
      "7-8 Years",
      "9-10 Years",
      "11-12 Years"
    ],
    "colors": [
      {
        "name": "Navy & Red Sport",
        "hex": "#1e3a8a"
      },
      {
        "name": "Charcoal Black",
        "hex": "#111827"
      }
    ],
    "stock": 35,
    "rating": 4.8,
    "reviewCount": 29,
    "isTrending": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-04T10:00:00.000Z"
  },
  {
    "id": "gc-kw-003",
    "slug": "goyal-kids-cotton-graphic-tees-pack",
    "sku": "GC-KW-003",
    "name": "Kids' 100% Cotton Everyday Graphic Tees (Pack of 3)",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "kids-wear",
    "subcategoryTitle": "Kids' Wear",
    "price": 599,
    "mrp": 1199,
    "discountPercent": 50,
    "description": "Value pack of 3 super-soft cotton round-neck t-shirts featuring cheerful animal and space graphics that stay vibrant wash after wash.",
    "details": [
      "Multipack: 3 Unique Design T-Shirts in 1 Box",
      "100% Breathable soft combed cotton jersey",
      "High-grade crack-resistant screen prints",
      "Ribbed stretch neckband for easy pullover"
    ],
    "specifications": [
      {
        "label": "Pack Quantity",
        "value": "3 T-Shirts"
      },
      {
        "label": "Material",
        "value": "100% Combed Cotton"
      },
      {
        "label": "Neck",
        "value": "Crewneck"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "2-3Y",
      "4-5Y",
      "6-7Y",
      "8-9Y",
      "10-11Y"
    ],
    "colors": [
      {
        "name": "Multicolor Pack (Blue/Yellow/White)",
        "hex": "#38bdf8"
      }
    ],
    "stock": 50,
    "rating": 4.9,
    "reviewCount": 51,
    "isBestSeller": true,
    "featured": true,
    "status": "active",
    "createdAt": "2026-02-07T10:00:00.000Z"
  },
  {
    "id": "gc-kw-004",
    "slug": "goyal-kids-printed-cotton-pajama-set",
    "sku": "GC-KW-004",
    "name": "Kids' Comfy Printed Cotton Nightwear Pajama Set",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "kids-wear",
    "subcategoryTitle": "Kids' Wear",
    "price": 399,
    "mrp": 799,
    "discountPercent": 50,
    "description": "Dreamy sleepwear set with full-sleeve top and matching elasticized bottoms crafted in featherlight cotton for sound, cozy sleep.",
    "details": [
      "100% Pure cotton knitted fabric",
      "Relaxed comfort fit for night movements",
      "Soft covered elastic waist won’t leave red marks",
      "Colorfast prints"
    ],
    "specifications": [
      {
        "label": "Set Type",
        "value": "Full-Sleeve Top + Pyjama"
      },
      {
        "label": "Fabric",
        "value": "Cotton Hosiery"
      },
      {
        "label": "Care",
        "value": "Machine Wash Safe"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "2-3Y",
      "4-5Y",
      "6-7Y",
      "8-9Y",
      "10-11Y"
    ],
    "colors": [
      {
        "name": "Pastel Mint Stars",
        "hex": "#6ee7b7"
      },
      {
        "name": "Sky Cloud Blue",
        "hex": "#7dd3fc"
      }
    ],
    "stock": 40,
    "rating": 4.8,
    "reviewCount": 34,
    "isBestSeller": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-11T10:00:00.000Z"
  },
  {
    "id": "gc-kw-005",
    "slug": "goyal-kids-unisex-puffer-vest-jacket",
    "sku": "GC-KW-005",
    "name": "Kids' Unisex Cozy Sleeveless Puffer Vest Jacket",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "kids-wear",
    "subcategoryTitle": "Kids' Wear",
    "price": 699,
    "mrp": 1399,
    "discountPercent": 50,
    "description": "Sleeveless lightweight insulated puffer jacket with stand collar and chin guard zipper. Keeps kids core warm while keeping arms free to play.",
    "details": [
      "Windproof water-resistant nylon shell",
      "Microfiber down-alternative insulation",
      "High stand collar with safety chin guard",
      "Dual side warm hand pockets"
    ],
    "specifications": [
      {
        "label": "Type",
        "value": "Sleeveless Puffer Vest"
      },
      {
        "label": "Closure",
        "value": "Smooth Front Zip"
      },
      {
        "label": "Season",
        "value": "Mild Winter / Travel"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "3-4Y",
      "5-6Y",
      "7-8Y",
      "9-10Y",
      "11-12Y"
    ],
    "colors": [
      {
        "name": "Bright Mustard",
        "hex": "#eab308"
      },
      {
        "name": "Royal Sapphire",
        "hex": "#2563eb"
      }
    ],
    "stock": 28,
    "rating": 4.8,
    "reviewCount": 20,
    "isNewArrival": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-15T10:00:00.000Z"
  },
  {
    "id": "mirli-cl-006",
    "slug": "goyal-boys-varsity-bomber-jacket",
    "sku": "GC-BW-001",
    "name": "Boys' Monochrome Varsity Bomber Jacket",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "boys-wear",
    "subcategoryTitle": "Boys' Wear",
    "price": 899,
    "mrp": 1799,
    "discountPercent": 50,
    "description": "Classic collegiate outerwear with striped ribbed trim, snap button front, dual slash pockets, and embroidered chest varsity monogram.",
    "details": [
      "Durable heavyweight cotton-poly blend shell",
      "Striped baseball ribbed knit collar, cuffs and waistband",
      "Easy snap button closure for kids",
      "Soft brushed cotton lining"
    ],
    "specifications": [
      {
        "label": "Style",
        "value": "Varsity Jacket"
      },
      {
        "label": "Closure",
        "value": "Snap Button Front"
      },
      {
        "label": "Fabric",
        "value": "Cotton-Polyester Blend"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "4-5 Years",
      "6-7 Years",
      "8-9 Years",
      "10-11 Years",
      "12-13 Years"
    ],
    "colors": [
      {
        "name": "Varsity Black & White",
        "hex": "#0f172a"
      },
      {
        "name": "Varsity Crimson",
        "hex": "#991b1b"
      }
    ],
    "stock": 25,
    "rating": 4.8,
    "reviewCount": 30,
    "isTrending": true,
    "featured": true,
    "status": "active",
    "createdAt": "2026-01-24T10:00:00.000Z"
  },
  {
    "id": "mirli-cl-007",
    "slug": "goyal-boys-mandarin-linen-shirt",
    "sku": "GC-BW-002",
    "name": "Boys' Tailored Cotton Linen Mandarin Collar Shirt",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "boys-wear",
    "subcategoryTitle": "Boys' Wear",
    "price": 499,
    "mrp": 999,
    "discountPercent": 50,
    "description": "Sophisticated lightweight linen-cotton shirt with stand band collar, rolled-tab full sleeves, and wooden buttons for festive family gatherings.",
    "details": [
      "Breathable 60% Linen, 40% Cotton blend",
      "Modern Chinese mandarin collar",
      "Convertible roll-up sleeves with button tab",
      "Curved tail hem looks great untucked over jeans"
    ],
    "specifications": [
      {
        "label": "Fabric",
        "value": "Linen Cotton Blend"
      },
      {
        "label": "Collar",
        "value": "Mandarin Stand Collar"
      },
      {
        "label": "Occasion",
        "value": "Party, Family Functions, Casual"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "3-4Y",
      "5-6Y",
      "7-8Y",
      "9-10Y",
      "11-12Y"
    ],
    "colors": [
      {
        "name": "Pure White",
        "hex": "#ffffff"
      },
      {
        "name": "Sky Blue",
        "hex": "#38bdf8"
      },
      {
        "name": "Soft Peach",
        "hex": "#fdba74"
      }
    ],
    "stock": 30,
    "rating": 4.7,
    "reviewCount": 22,
    "isBestSeller": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-01-26T10:00:00.000Z"
  },
  {
    "id": "gc-bw-003",
    "slug": "goyal-boys-festive-kurta-pajama-set",
    "sku": "GC-BW-003",
    "name": "Boys' Festive Silk Kurta & Pajama with Waistcoat",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "boys-wear",
    "subcategoryTitle": "Boys' Wear",
    "price": 999,
    "mrp": 1999,
    "discountPercent": 50,
    "description": "Celebration-ready 3-piece traditional ethnic attire: Printed art silk Nehru jacket, soft cotton-silk kurta, and comfortable elasticized pajama.",
    "details": [
      "3-Piece Festive Set: Kurta + Elastic Pyjama + Brocade Waistcoat",
      "Kid-friendly non-scratchy soft inner lining",
      "Embroidered show buttons on front placket",
      "Comfortable fit for energetic dancing and weddings"
    ],
    "specifications": [
      {
        "label": "Material",
        "value": "Silk Blend with Cotton Lining"
      },
      {
        "label": "Occasion",
        "value": "Weddings, Diwali, Raksha Bandhan"
      },
      {
        "label": "Wash Care",
        "value": "Dry Clean or Gentle Hand Wash"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "2-3Y",
      "4-5Y",
      "6-7Y",
      "8-9Y",
      "10-11Y",
      "12-13Y"
    ],
    "colors": [
      {
        "name": "Maroon & Gold Brocade",
        "hex": "#991b1b"
      },
      {
        "name": "Royal Blue & Silver",
        "hex": "#1d4ed8"
      }
    ],
    "stock": 35,
    "rating": 4.9,
    "reviewCount": 38,
    "isTrending": true,
    "isNewArrival": true,
    "featured": true,
    "status": "active",
    "createdAt": "2026-02-05T10:00:00.000Z"
  },
  {
    "id": "gc-bw-004",
    "slug": "goyal-boys-heavy-cargo-joggers",
    "sku": "GC-BW-004",
    "name": "Boys' Heavy Cotton Cargo Joggers with Utility Pockets",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "boys-wear",
    "subcategoryTitle": "Boys' Wear",
    "price": 599,
    "mrp": 1199,
    "discountPercent": 50,
    "description": "Tough, trendy cargo trousers in heavy cotton twill with 6 functional pockets, elastic drawstring waist, and ribbed ankle cuffs.",
    "details": [
      "100% Tough Cotton Twill withstands rough play",
      "6 Utility Pockets including dual flap cargo pockets",
      "Wide ribbed waistband with drawstring for growing boys",
      "Comfortable tapered jogger fit"
    ],
    "specifications": [
      {
        "label": "Fit Type",
        "value": "Tapered Cargo Jogger"
      },
      {
        "label": "Pockets",
        "value": "6 Functional Pockets"
      },
      {
        "label": "Fabric",
        "value": "Pure Cotton Twill"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "4-5Y",
      "6-7Y",
      "8-9Y",
      "10-11Y",
      "12-13Y"
    ],
    "colors": [
      {
        "name": "Army Olive Green",
        "hex": "#3f6212"
      },
      {
        "name": "Stealth Black",
        "hex": "#0f172a"
      },
      {
        "name": "Desert Khaki",
        "hex": "#d4b996"
      }
    ],
    "stock": 42,
    "rating": 4.8,
    "reviewCount": 27,
    "isBestSeller": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-09T10:00:00.000Z"
  },
  {
    "id": "gc-bw-005",
    "slug": "goyal-boys-smart-colorblock-polo",
    "sku": "GC-BW-005",
    "name": "Boys' Smart Colorblock Cotton Polo Collar T-Shirt",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "boys-wear",
    "subcategoryTitle": "Boys' Wear",
    "price": 449,
    "mrp": 899,
    "discountPercent": 50,
    "description": "Classic pique cotton polo shirt with contrast colorblock chest panel, ribbed flat-knit collar, and two-button placket.",
    "details": [
      "Breathable 100% Pique Cotton honey-comb knit",
      "Shape-retaining ribbed collar and sleeve bands",
      "Side vents at hem for enhanced movement",
      "Resistant to shrinkage and color fading"
    ],
    "specifications": [
      {
        "label": "Material",
        "value": "100% Pique Cotton"
      },
      {
        "label": "Collar",
        "value": "Flat Knit Polo Collar"
      },
      {
        "label": "Pattern",
        "value": "Contrast Colorblock"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "3-4Y",
      "5-6Y",
      "7-8Y",
      "9-10Y",
      "11-12Y"
    ],
    "colors": [
      {
        "name": "Navy & White Colorblock",
        "hex": "#1e3a8a"
      },
      {
        "name": "Red & Charcoal Colorblock",
        "hex": "#dc2626"
      }
    ],
    "stock": 30,
    "rating": 4.7,
    "reviewCount": 19,
    "isNewArrival": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-14T10:00:00.000Z"
  },
  {
    "id": "mirli-cl-008",
    "slug": "goyal-girls-princess-party-gown",
    "sku": "GC-GW-001",
    "name": "Girls' Princess Tiered Tulle Party Frock & Gown",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "girls-wear",
    "subcategoryTitle": "Girls' Wear",
    "price": 999,
    "mrp": 1999,
    "discountPercent": 50,
    "description": "Dreamy birthday celebration gown with layered soft tulle skirt, satin waist sash with a rosette bow, and breathable cotton inner lining.",
    "details": [
      "Multi-tier soft micro-tulle skirt for princess flair",
      "100% Cotton soft inner lining to protect tender skin",
      "Satin tie-back waist sash for custom fitting",
      "Concealed back zip with smooth fabric zip-cover"
    ],
    "specifications": [
      {
        "label": "Dress Style",
        "value": "Tiered Party Frock"
      },
      {
        "label": "Lining",
        "value": "100% Pure Cotton"
      },
      {
        "label": "Closure",
        "value": "Concealed Back Zipper"
      },
      {
        "label": "Occasion",
        "value": "Birthdays, Parties, Celebrations"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "2-3 Years",
      "4-5 Years",
      "6-7 Years",
      "8-9 Years",
      "10-11 Years"
    ],
    "colors": [
      {
        "name": "Blush Pink",
        "hex": "#fbcfe8"
      },
      {
        "name": "Snow White",
        "hex": "#ffffff"
      },
      {
        "name": "Lavender Mist",
        "hex": "#e9d5ff"
      }
    ],
    "stock": 28,
    "rating": 4.9,
    "reviewCount": 46,
    "isTrending": true,
    "isBestSeller": true,
    "featured": true,
    "status": "active",
    "createdAt": "2026-01-28T10:00:00.000Z"
  },
  {
    "id": "mirli-cl-009",
    "slug": "goyal-girls-houndstooth-pinafore-set",
    "sku": "GC-GW-002",
    "name": "Girls' Monochrome Houndstooth Pinafore & Blouse Set",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "girls-wear",
    "subcategoryTitle": "Girls' Wear",
    "price": 799,
    "mrp": 1599,
    "discountPercent": 50,
    "description": "Chic 2-piece preppy outfit: A textured woven houndstooth overall dress paired with a puff-sleeve Peter Pan collar cotton blouse.",
    "details": [
      "2-Piece Set: Houndstooth Overall Pinafore + Blouse",
      "Peter pan collar with dainty button details",
      "Adjustable button shoulder straps on pinafore",
      "Wrinkle-free woven tweed-feel fabric"
    ],
    "specifications": [
      {
        "label": "Set Includes",
        "value": "Pinafore Dress + Cotton Blouse"
      },
      {
        "label": "Pattern",
        "value": "Micro Houndstooth Check"
      },
      {
        "label": "Style",
        "value": "Preppy Smart Casual"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "3-4Y",
      "5-6Y",
      "7-8Y",
      "9-10Y",
      "11-12Y"
    ],
    "colors": [
      {
        "name": "Classic Black & White",
        "hex": "#0f172a"
      },
      {
        "name": "Dusty Rose & Cream",
        "hex": "#fda4af"
      }
    ],
    "stock": 22,
    "rating": 4.8,
    "reviewCount": 25,
    "isBestSeller": false,
    "featured": false,
    "status": "active",
    "createdAt": "2026-01-30T10:00:00.000Z"
  },
  {
    "id": "gc-gw-003",
    "slug": "goyal-girls-festive-lehenga-choli",
    "sku": "GC-GW-003",
    "name": "Girls' Embroidered Festive Georgette Lehenga Choli Set",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "girls-wear",
    "subcategoryTitle": "Girls' Wear",
    "price": 1299,
    "mrp": 2599,
    "discountPercent": 50,
    "description": "Traditional celebration 3-piece set: Embroidered crop choli blouse, heavily flared printed georgette lehenga, and light net dupatta with gotta borders.",
    "details": [
      "Complete 3-Piece Festive Set: Choli + Lehenga + Dupatta",
      "Sequins and mirror-work thread embroidery on choli",
      "Soft cotton lining in both blouse and skirt for zero scratching",
      "Full elasticated lehenga waist with decorative latkan tassels"
    ],
    "specifications": [
      {
        "label": "Lehenga Fabric",
        "value": "Flowing Georgette with Cotton Lining"
      },
      {
        "label": "Choli Fabric",
        "value": "Embroidered Silk Blend"
      },
      {
        "label": "Occasion",
        "value": "Weddings, Festivals, Garba, Diwali"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "3-4Y",
      "5-6Y",
      "7-8Y",
      "9-10Y",
      "11-12Y",
      "13-14Y"
    ],
    "colors": [
      {
        "name": "Festive Rani Pink & Orange",
        "hex": "#db2777"
      },
      {
        "name": "Turquoise & Gold",
        "hex": "#0891b2"
      },
      {
        "name": "Sunshine Yellow",
        "hex": "#eab308"
      }
    ],
    "stock": 35,
    "rating": 4.9,
    "reviewCount": 48,
    "isTrending": true,
    "isNewArrival": true,
    "featured": true,
    "status": "active",
    "createdAt": "2026-02-06T10:00:00.000Z"
  },
  {
    "id": "gc-gw-004",
    "slug": "goyal-girls-denim-dungaree-set",
    "sku": "GC-GW-004",
    "name": "Girls' Washed Denim Dungaree Dress with Striped Top",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "girls-wear",
    "subcategoryTitle": "Girls' Wear",
    "price": 699,
    "mrp": 1399,
    "discountPercent": 50,
    "description": "Charming weekend outfit featuring a soft stretch-denim pinafore dress with front patch pocket, paired with a soft striped cotton inner t-shirt.",
    "details": [
      "2-Piece Set: Stretch Denim Pinafore + Striped Knit Tee",
      "Adjustable metal buckle shoulder straps",
      "Functional front kangaroo and side pockets",
      "Stone-washed soft denim won’t feel stiff"
    ],
    "specifications": [
      {
        "label": "Dungaree Fabric",
        "value": "98% Cotton Denim, 2% Spandex"
      },
      {
        "label": "Top Fabric",
        "value": "100% Cotton Ribbed Jersey"
      },
      {
        "label": "Closure",
        "value": "Side Metal Buttons"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "3-4Y",
      "5-6Y",
      "7-8Y",
      "9-10Y",
      "11-12Y"
    ],
    "colors": [
      {
        "name": "Medium Wash Indigo",
        "hex": "#2563eb"
      },
      {
        "name": "Light Sky Blue Denim",
        "hex": "#60a5fa"
      }
    ],
    "stock": 32,
    "rating": 4.8,
    "reviewCount": 29,
    "isBestSeller": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-10T10:00:00.000Z"
  },
  {
    "id": "gc-gw-005",
    "slug": "goyal-girls-floral-cotton-ruffle-dress",
    "sku": "GC-GW-005",
    "name": "Girls' Floral Summer Cotton Tiered Ruffle Dress",
    "category": "ready-made-clothes",
    "categoryTitle": "Ready-made Clothes",
    "subcategory": "girls-wear",
    "subcategoryTitle": "Girls' Wear",
    "price": 599,
    "mrp": 1199,
    "discountPercent": 50,
    "description": "Breezy everyday summer frock in delicate floral printed cotton with flutter ruffle sleeves and flared skirt for effortless twirling.",
    "details": [
      "100% Pure cambric cotton, cool in hot weather",
      "Charming flutter cap sleeves with picot trim",
      "Keyhole button back for easy dressing",
      "Flared tiered skirt for maximum twirl"
    ],
    "specifications": [
      {
        "label": "Fabric",
        "value": "100% Pure Cambric Cotton"
      },
      {
        "label": "Length",
        "value": "Knee Length"
      },
      {
        "label": "Care",
        "value": "Machine Wash Normal"
      }
    ],
    "images": [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop"
    ],
    "sizes": [
      "2-3Y",
      "4-5Y",
      "6-7Y",
      "8-9Y",
      "10-11Y"
    ],
    "colors": [
      {
        "name": "Daisy Yellow Floral",
        "hex": "#fef08a"
      },
      {
        "name": "Cornflower Blue Floral",
        "hex": "#93c5fd"
      },
      {
        "name": "Lavender Blossom",
        "hex": "#d8b4fe"
      }
    ],
    "stock": 38,
    "rating": 4.8,
    "reviewCount": 21,
    "isNewArrival": true,
    "featured": false,
    "status": "active",
    "createdAt": "2026-02-15T10:00:00.000Z"
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    "code": "GOYAL10",
    "discountPercent": 10,
    "maxDiscount": 1500,
    "minOrder": 1999,
    "description": "10% instant discount on orders above ₹1,999",
    "active": true,
    "expiresAt": "2026-12-31"
  },
  {
    "code": "MIRLI10",
    "discountPercent": 10,
    "maxDiscount": 1500,
    "minOrder": 1999,
    "description": "10% instant discount on orders above ₹1,999",
    "active": true,
    "expiresAt": "2026-12-31"
  },
  {
    "code": "LUXURY20",
    "discountPercent": 20,
    "maxDiscount": 3000,
    "minOrder": 4999,
    "description": "20% privilege discount on luxury orders above ₹4,999",
    "active": true,
    "expiresAt": "2026-12-31"
  },
  {
    "code": "WELCOME500",
    "discountPercent": 15,
    "maxDiscount": 500,
    "minOrder": 1499,
    "description": "Welcome perk: Flat 15% off up to ₹500 on your first purchase",
    "active": true,
    "expiresAt": "2026-12-31"
  }
];

export const INITIAL_REVIEWS: Record<string, any[]> = {
  "mirli-fw-001": [
    {
      "productId": "mirli-fw-001",
      "customerName": "Ishaan Verma",
      "rating": 4,
      "title": "Minimalist statement footwear",
      "comment": "The elastic gusset is snug and the sole grip is surprisingly great even on polished marble floors.",
      "verifiedPurchase": true,
      "id": "rev-1794768140285",
      "date": "2026-11-15",
      "status": "approved"
    },
    {
      "productId": "mirli-fw-001",
      "customerName": "Sameer Sen",
      "rating": 5,
      "title": "Comfortable from day one",
      "comment": "I walked all over Delhi in these boots without a single blister. The interior calfskin lining is like a glove.",
      "verifiedPurchase": true,
      "id": "rev-1794768140275",
      "date": "2026-11-15",
      "status": "approved"
    },
    {
      "productId": "mirli-fw-001",
      "customerName": "Raghav Singhal",
      "rating": 5,
      "title": "Exceptional Chelsea boot, pure luxury",
      "comment": "I wore these to a fashion dinner and got non-stop compliments. The silhouette is sharp and the leather feels truly bespoke.",
      "verifiedPurchase": true,
      "id": "rev-1794768132227",
      "date": "2026-11-15",
      "status": "approved"
    },
    {
      "id": "rev-1",
      "productId": "mirli-fw-001",
      "customerName": "Vikramaditya S.",
      "rating": 5,
      "title": "Supreme craftsmanship, turns heads everywhere",
      "comment": "The leather quality on the Onyx Chelsea is rivaling high-end European fashion houses. Zero break-in period and looks sensational with both tailored trousers and raw denim.",
      "verifiedPurchase": true,
      "date": "2026-02-10",
      "status": "approved"
    },
    {
      "id": "rev-2",
      "productId": "mirli-fw-001",
      "customerName": "Aditya Mehta",
      "rating": 5,
      "title": "Worth every rupee",
      "comment": "Packaging was like opening an unboxing experience in Paris. High quality dust bags, leather aroma, and snug fit.",
      "verifiedPurchase": true,
      "date": "2026-02-12",
      "status": "approved"
    }
  ],
  "mirli-fw-006": [
    {
      "id": "rev-3",
      "productId": "mirli-fw-006",
      "customerName": "Rohit K.",
      "rating": 5,
      "title": "The cleanest white luxury sneaker in India",
      "comment": "Super sleek profile, no tacky logos, premium Nappa leather that cleans with a simple wet wipe. Highly recommended!",
      "verifiedPurchase": true,
      "date": "2026-02-08",
      "status": "approved"
    }
  ],
  "mirli-cl-001": [
    {
      "id": "rev-4",
      "productId": "mirli-cl-001",
      "customerName": "Kunal Singhania",
      "rating": 5,
      "title": "Stunning silhouette and premium wool drape",
      "comment": "The oversized cut is perfectly proportioned without looking baggy. The peak lapel and subtle horn buttons look incredibly expensive.",
      "verifiedPurchase": true,
      "date": "2026-02-14",
      "status": "approved"
    }
  ]
};
