import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API = 'https://fakestoreapi.com/products';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(API);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setProducts(data);
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load products');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <p className="muted">Loading products…</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="stack">
      <div>
        <h1>Fake Store</h1>
        <p className="muted">Products from fakestoreapi.com — tap a card for details.</p>
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
