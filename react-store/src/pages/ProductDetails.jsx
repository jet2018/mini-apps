import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import ChoogaBridge, {startBridge} from '../bridge.js';

export default function ProductDetails() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    startBridge();
    let cancelled = false;
    (async () => {
      ChoogaBridge.showProgress({message: 'Loading product…'});
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setProduct(data);
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load product');
      } finally {
        ChoogaBridge.dismissProgress();
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
      ChoogaBridge.dismissProgress();
    };
  }, [id]);

  const addToCart = async () => {
    if (!product || busy) return;
    setBusy(true);
    try {
      const result = await ChoogaBridge.call('cart.add', {
        id: product.id,
        title: product.title,
        price: product.price,
        currency: 'ETB',
        image: product.image,
        quantity: 1,
      });
      ChoogaBridge.toast(
        result?.cartCount
          ? `Added · ${result.cartCount} in cart`
          : 'Added to cart',
        'success',
      );
    } catch (e) {
      ChoogaBridge.toast(e?.message || 'Could not add to cart', 'error');
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <p className="muted">Loading product…</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!product) return <p className="error">Product not found</p>;

  return (
    <div className="stack">
      <Link to="/products">← Back to products</Link>
      <div className="detail-layout panel">
        <img src={product.image} alt={product.title} />
        <div className="stack">
          <h1>{product.title}</h1>
          <p className="muted">{product.category}</p>
          <p className="price">${Number(product.price).toFixed(2)}</p>
          <p>{product.description}</p>
          <div className="row">
            <button type="button" disabled={busy} onClick={addToCart}>
              {busy ? 'Adding…' : 'Add to cart'}
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => navigate('/checkout')}>
              Go to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
