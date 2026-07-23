/** Staged Addis Merkato / Bole retail catalog (demo only). */

/** Stable photo placeholders (Lorem Picsum). Seed keeps the same image per product. */
const photo = (seed, size = 640) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${size}/${size}`;

export const PRODUCTS = [
  {
    id: 'yirgacheffe-1kg',
    title: 'Yirgacheffe Grade 1 coffee',
    category: 'Coffee & tea',
    price: 1850,
    currency: 'ETB',
    unit: '1 kg bag',
    seller: 'Sidamo Roasters · Kazanchis',
    image: photo('bole-yirgacheffe-coffee'),
    description:
      'Washed Yirgacheffe from Gedeb cooperatives. Bright citrus, jasmine, and clean finish — roasted weekly in Addis.',
  },
  {
    id: 'berbere-500',
    title: 'House berbere spice blend',
    category: 'Spices',
    price: 420,
    currency: 'ETB',
    unit: '500 g',
    seller: 'Merkato Spice Alley',
    image: photo('bole-berbere-spice'),
    description:
      'Sun-dried chili, korarima, and fenugreek milled the traditional way. Perfect for doro wat and kitfo.',
  },
  {
    id: 'injera-mix',
    title: 'Teff injera flour mix',
    category: 'Staples',
    price: 780,
    currency: 'ETB',
    unit: '2 kg',
    seller: 'Gojo Foods · Piassa',
    image: photo('bole-teff-flour'),
    description:
      'Blend of ivory and brown teff for soft, sour injera at home. Includes starter tips in Amharic & English.',
  },
  {
    id: 'shiro-powder',
    title: 'Shiro powder (mitin)',
    category: 'Staples',
    price: 310,
    currency: 'ETB',
    unit: '1 kg',
    seller: 'Merkato Spice Alley',
    image: photo('bole-shiro-powder'),
    description:
      'Chickpea shiro with mild berbere. Ready for shiro wat in under 20 minutes.',
  },
  {
    id: 'nile-cotton-scarf',
    title: 'Handwoven cotton scarf',
    category: 'Fashion',
    price: 1250,
    currency: 'ETB',
    unit: 'One size',
    seller: 'Axum Weavers Co-op',
    image: photo('bole-netela-scarf'),
    description:
      'Lightweight netela-style scarf with subtle tibeb borders. Soft cotton for church and everyday wear.',
  },
  {
    id: 'honey-tigray',
    title: 'Tigray white honey',
    category: 'Pantry',
    price: 980,
    currency: 'ETB',
    unit: '500 g jar',
    seller: 'Highland Apiaries',
    image: photo('bole-tigray-honey'),
    description:
      'Slow-crystallizing white honey from highland flora. Ideal with buna or on dabo.',
  },
  {
    id: 'ethio-telecom-100',
    title: 'Ethio telecom airtime (demo)',
    category: 'Top-up',
    price: 100,
    currency: 'ETB',
    unit: 'Pin voucher',
    seller: 'Bole Mart Digital',
    image: photo('bole-airtime-topup'),
    description:
      'Demo airtime voucher for Ethio telecom. In production this would deliver a pin via SMS.',
  },
  {
    id: 'soap-olive',
    title: 'Olive oil castile soap set',
    category: 'Home',
    price: 540,
    currency: 'ETB',
    unit: '3 bars',
    seller: 'Bole Organic',
    image: photo('bole-olive-soap'),
    description:
      'Gentle castile bars with local olive oil. Unscented — good for sensitive skin.',
  },
];

export function formatEtb(amount) {
  return `ETB ${Number(amount).toLocaleString('en-ET', {
    maximumFractionDigits: 0,
  })}`;
}

export function getProduct(id) {
  return PRODUCTS.find(p => String(p.id) === String(id)) || null;
}

export function listProducts(category) {
  if (!category || category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

export const CATEGORIES = [
  'all',
  ...Array.from(new Set(PRODUCTS.map(p => p.category))),
];
