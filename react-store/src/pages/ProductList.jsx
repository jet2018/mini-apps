import {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {CATEGORIES, formatEtb, listProducts} from '../data/catalog.js';
import {startBridge} from '../bridge.js';

startBridge();

export default function ProductList() {
  const [category, setCategory] = useState('all');
  const products = useMemo(() => listProducts(category), [category]);

  return (
    <div className="stack">
      <div>
        <h1>Market</h1>
        <p className="muted">Staged catalog · prices in Ethiopian Birr</p>
      </div>

      <div className="chips">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            type="button"
            className={category === cat ? 'chip on' : 'chip'}
            onClick={() => setCategory(cat)}>
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      <div className="card-grid">
        {products.map(p => (
          <Link key={p.id} to={`/product/${p.id}`} className="card">
            <img src={p.image} alt="" />
            <div className="card-body">
              <strong>{p.title}</strong>
              <span className="muted">
                {p.seller} · {p.unit}
              </span>
              <span className="price">{formatEtb(p.price)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
