/** Staged Addis Merkato / Bole retail catalog (demo only). */

export const PRODUCTS = [
  {
    id: 'yirgacheffe-1kg',
    title: 'Yirgacheffe Grade 1 coffee',
    category: 'Coffee & tea',
    price: 1850,
    currency: 'ETB',
    unit: '1 kg bag',
    seller: 'Sidamo Roasters · Kazanchis',
    image:
      'data:image/svg+xml,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480"><rect fill="#3f2a1d" width="480" height="480"/><circle fill="#6b4226" cx="240" cy="210" r="110"/><ellipse fill="#c4a484" cx="240" cy="340" rx="120" ry="28"/><text x="240" y="430" fill="#f5e6d3" font-family="Georgia,serif" font-size="28" text-anchor="middle">Yirgacheffe</text></svg>`,
      ),
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
    image:
      'data:image/svg+xml,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480"><rect fill="#7c2d12" width="480" height="480"/><circle fill="#ea580c" cx="240" cy="220" r="100"/><text x="240" y="400" fill="#ffedd5" font-family="Georgia,serif" font-size="32" text-anchor="middle">Berbere</text></svg>`,
      ),
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
    image:
      'data:image/svg+xml,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480"><rect fill="#44403c" width="480" height="480"/><ellipse fill="#d6d3d1" cx="240" cy="230" rx="150" ry="90"/><text x="240" y="400" fill="#fafaf9" font-family="Georgia,serif" font-size="28" text-anchor="middle">Teff mix</text></svg>`,
      ),
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
    image:
      'data:image/svg+xml,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480"><rect fill="#78350f" width="480" height="480"/><circle fill="#fbbf24" cx="240" cy="220" r="95"/><text x="240" y="400" fill="#fffbeb" font-family="Georgia,serif" font-size="30" text-anchor="middle">Shiro</text></svg>`,
      ),
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
    image:
      'data:image/svg+xml,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480"><rect fill="#1e3a5f" width="480" height="480"/><path fill="#f8fafc" d="M80 140h320v40H80zm0 80h320v40H80zm0 80h320v40H80z"/><text x="240" y="420" fill="#e2e8f0" font-family="Georgia,serif" font-size="26" text-anchor="middle">Netela</text></svg>`,
      ),
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
    image:
      'data:image/svg+xml,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480"><rect fill="#92400e" width="480" height="480"/><ellipse fill="#fcd34d" cx="240" cy="230" rx="90" ry="120"/><text x="240" y="420" fill="#fef3c7" font-family="Georgia,serif" font-size="28" text-anchor="middle">Honey</text></svg>`,
      ),
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
    image:
      'data:image/svg+xml,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480"><rect fill="#0ea5e9" width="480" height="480"/><rect fill="#fff" x="140" y="160" width="200" height="120" rx="16"/><text x="240" y="235" fill="#0369a1" font-family="Arial,sans-serif" font-size="36" font-weight="700" text-anchor="middle">100</text><text x="240" y="400" fill="#e0f2fe" font-family="Georgia,serif" font-size="24" text-anchor="middle">Airtime</text></svg>`,
      ),
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
    image:
      'data:image/svg+xml,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480"><rect fill="#365314" width="480" height="480"/><rect fill="#a3e635" x="150" y="150" width="70" height="140" rx="10"/><rect fill="#bef264" x="235" y="150" width="70" height="140" rx="10"/><text x="240" y="400" fill="#ecfccb" font-family="Georgia,serif" font-size="26" text-anchor="middle">Soap set</text></svg>`,
      ),
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
