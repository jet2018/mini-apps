import {useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import ChoogaBridge, {startBridge} from '../bridge.js';
import {formatEtb, getProduct} from '../data/catalog.js';

startBridge();

export default function ProductDetails() {
  const {id} = useParams();
  const navigate = useNavigate();
  const product = getProduct(id);
  const [busy, setBusy] = useState(false);

  if (!product) {
    return (
      <div className="stack">
        <Link to="/products">← Back</Link>
        <p className="error">Product not found</p>
      </div>
    );
  }

  const addToCart = async () => {
    if (busy) return;
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

  return (
    <div className="stack">
      <Link to="/products">← Back to market</Link>
      <div className="detail-layout panel">
        <img src={product.image} alt="" />
        <div className="stack">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="muted">
            {product.seller} · {product.unit}
          </p>
          <p className="price">{formatEtb(product.price)}</p>
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
