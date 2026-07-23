/**
 * Bole Mart cart — WebView localStorage (not host-managed).
 */

const KEY = 'bole_mart_cart_v1';

const empty = () => ({items: [], cartCount: 0, total: 0, ok: true});

const snapshot = items => {
  const rows = (items || []).map(row => ({...row}));
  const cartCount = rows.reduce(
    (sum, row) => sum + (Number(row.quantity) || 0),
    0,
  );
  const total = rows.reduce((sum, row) => {
    const price = Number(row.price);
    const qty = Number(row.quantity) || 0;
    if (Number.isNaN(price)) return sum;
    return sum + price * qty;
  }, 0);
  return {
    ok: true,
    items: rows,
    cartCount,
    total: Number(total.toFixed(2)),
  };
};

const readItems = () => {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeItems = items => {
  localStorage.setItem(KEY, JSON.stringify(items));
  return snapshot(items);
};

const listeners = new Set();

const notify = snap => {
  listeners.forEach(fn => {
    try {
      fn(snap);
    } catch {
      /* ignore */
    }
  });
};

export const getCart = () => snapshot(readItems());

export const subscribeCart = fn => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export const addToCart = (item = {}) => {
  const items = readItems();
  const id =
    item.id != null
      ? String(item.id)
      : `item_${Date.now().toString(36)}`;
  const quantity = Math.max(1, Number(item.quantity) || 1);
  const existing = items.find(row => String(row.id) === id);
  if (existing) {
    existing.quantity = (Number(existing.quantity) || 0) + quantity;
    if (item.title != null) existing.title = item.title;
    if (item.price != null) existing.price = item.price;
    if (item.currency != null) existing.currency = item.currency;
    if (item.image != null) existing.image = item.image;
  } else {
    items.push({
      id,
      title: item.title || item.name || id,
      price: item.price != null ? Number(item.price) : undefined,
      currency: item.currency || 'ETB',
      quantity,
      image: item.image || undefined,
    });
  }
  const snap = writeItems(items);
  notify(snap);
  return snap;
};

export const clearCart = () => {
  const snap = writeItems([]);
  notify(snap);
  return snap;
};

export const emptyCart = empty;
