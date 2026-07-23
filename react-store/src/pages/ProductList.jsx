import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import ChoogaBridge, {startBridge} from '../bridge.js';

const API = 'https://fakestoreapi.com/products';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    startBridge();
    let cancelled = false;
    (async () => {
      ChoogaBridge.showProgress({message: 'Loading products…'});
      try {
        const res = await fetch(API);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setProducts(data);
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load products');
      } finally {
        ChoogaBridge.dismissProgress();
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
      ChoogaBridge.dismissProgress();
    };
  }, []);

  if (loading) return <p className="muted">Loading products…</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="stack">
      <div>
        <h1>Products</h1>
        <p className="muted">Tap a product to add it to your host cart.</p>
      </div>
      <div className="card-grid">
        {products.map(p => (
          <Link key={p.id} to={`/product/${p.id}`} className="card">
            <img src={p.image} alt={p.title} />
            <div className="card-body">
              <strong>{p.title}</strong>
              <span className="muted">{p.category}</span>
              <span className="price">${Number(p.price).toFixed(2)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
