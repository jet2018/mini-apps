const KEY = 'habesha_air_bookings_v1';

export function loadBookings() {
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveBooking(booking) {
  const next = [booking, ...loadBookings()].slice(0, 20);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function getBooking(pnr) {
  return loadBookings().find(b => b.pnr === pnr) || null;
}
