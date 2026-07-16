import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Checkout() {
  const location = useLocation();
  const product = location.state?.product || null;
  const [form, setForm] = useState({
    name: '',
    email: '',
    quantity: 1,
  });
  const [submitted, setSubmitted] = useState(null);

  function onChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value,
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
    setSubmitted({
      ...form,
      productId: product?.id ?? null,
      productTitle: product?.title ?? 'Any product',
      unitPrice: product?.price ?? null,
      total:
        product?.price != null
          ? (Number(product.price) * Number(form.quantity || 1)).toFixed(2)
          : null,
    });
  }

  return (
    <div className="stack">
      <Link to="/">← Back to list</Link>
      <div className="panel stack">
        <h1>Checkout form</h1>
        <p className="muted">
          Demo only — no payment. Prefilled from{' '}
          {product ? product.title : 'catalog (no product selected)'}.
        </p>

        <form className="stack" onSubmit={onSubmit}>
          <label>
            Full name
            <input name="name" required value={form.name} onChange={onChange} placeholder="Ada Lovelace" />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={onChange}
              placeholder="ada@example.com"
            />
          </label>
          <label>
            Quantity
            <input
              name="quantity"
              type="number"
              min="1"
              required
              value={form.quantity}
              onChange={onChange}
            />
          </label>
          <button type="submit">Submit order</button>
        </form>

        {submitted && (
          <div>
            <h3>Confirmation</h3>
            <pre>{JSON.stringify(submitted, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
