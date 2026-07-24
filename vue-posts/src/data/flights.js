/** Staged Ethiopian domestic + regional flights (demo data only). */

export const AIRPORTS = [
  {code: 'ADD', city: 'Addis Ababa', name: 'Bole International'},
  {code: 'DIR', city: 'Dire Dawa', name: 'Dire Dawa Airport'},
  {code: 'BJR', city: 'Bahir Dar', name: 'Bahir Dar Airport'},
  {code: 'GDQ', city: 'Gondar', name: 'Atse Tewodros'},
  {code: 'MQX', city: 'Mekelle', name: 'Alula Aba Nega'},
  {code: 'JIJ', city: 'Jijiga', name: 'Gode / Jijiga'},
  {code: 'ASO', city: 'Asosa', name: 'Asosa Airport'},
  {code: 'JIM', city: 'Jimma', name: 'Aba Segud'},
  {code: 'NBO', city: 'Nairobi', name: 'Jomo Kenyatta'},
  {code: 'DXB', city: 'Dubai', name: 'Dubai International'},
];

const pad = n => String(n).padStart(2, '0');
const SELECTED_KEY = 'habesha_air_selected_flight_v1';

export function formatEtb(amount) {
  return `ETB ${Number(amount).toLocaleString('en-ET', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export function airportLabel(code) {
  const a = AIRPORTS.find(x => x.code === code);
  return a ? `${a.city} (${a.code})` : code;
}

/** Build demo inventory for a search window around a given ISO date. */
export function searchFlights({from, to, date, cabin = 'economy'}) {
  if (!from || !to || from === to) return [];

  const base = new Date(`${date}T00:00:00`);
  if (Number.isNaN(base.getTime())) return [];

  const longHaul = from === 'DXB' || to === 'DXB' || from === 'NBO' || to === 'NBO';
  const distanceBias = from === 'ADD' || to === 'ADD' ? 1 : longHaul ? 1 : 1.15;

  const templates = [
    {depH: 6, depM: 15, durH: longHaul ? 4 : 1, durM: longHaul ? 25 : 10, flight: 'HA210', fare: longHaul ? 18500 : 4200},
    {depH: 9, depM: 40, durH: longHaul ? 4 : 1, durM: longHaul ? 40 : 25, flight: 'HA214', fare: longHaul ? 17200 : 3850},
    {depH: 13, depM: 5, durH: longHaul ? 5 : 1, durM: longHaul ? 5 : 15, flight: 'HA318', fare: longHaul ? 21000 : 5100},
    {depH: 17, depM: 50, durH: longHaul ? 4 : 1, durM: longHaul ? 55 : 20, flight: 'HA422', fare: longHaul ? 19800 : 4600},
    {depH: 21, depM: 10, durH: longHaul ? 4 : 1, durM: longHaul ? 35 : 35, flight: 'HA508', fare: longHaul ? 16400 : 3550},
  ];

  const cabinMult = cabin === 'business' ? 2.35 : 1;

  return templates.map((t, i) => {
    const dep = new Date(base);
    dep.setHours(t.depH, t.depM, 0, 0);
    const arr = new Date(dep.getTime() + (t.durH * 60 + t.durM) * 60000);
    const fare = Math.round(t.fare * distanceBias * cabinMult);
    const seats = 4 + ((i * 3 + from.charCodeAt(0) + to.charCodeAt(0)) % 18);

    return {
      id: [t.flight, from, to, date, cabin].join('__'),
      flightNo: t.flight,
      airline: 'Habesha Airways',
      from,
      to,
      date,
      cabin,
      departAt: dep.toISOString(),
      arriveAt: arr.toISOString(),
      departLabel: `${pad(dep.getHours())}:${pad(dep.getMinutes())}`,
      arriveLabel: `${pad(arr.getHours())}:${pad(arr.getMinutes())}`,
      durationLabel: `${t.durH}h ${pad(t.durM)}m`,
      aircraft: i % 2 === 0 ? 'Boeing 737-800' : 'Dash 8-400',
      fare,
      currency: 'ETB',
      seatsLeft: seats,
      baggage: cabin === 'business' ? '2 × 32 kg' : '1 × 23 kg',
      meal: cabin === 'business' ? 'Hot meal + soft drink' : 'Snack box',
    };
  });
}

export function rememberFlight(flight) {
  try {
    sessionStorage.setItem(SELECTED_KEY, JSON.stringify(flight));
  } catch {
    /* ignore */
  }
}

export function readRememberedFlight() {
  try {
    const raw = sessionStorage.getItem(SELECTED_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Resolve a flight from query params, remembered selection, or id. */
export function resolveFlight({flightNo, from, to, date, cabin, id} = {}) {
  const remembered = readRememberedFlight();
  if (
    remembered &&
    (!flightNo || remembered.flightNo === flightNo) &&
    (!from || remembered.from === from) &&
    (!to || remembered.to === to) &&
    (!date || remembered.date === date) &&
    (!cabin || remembered.cabin === cabin)
  ) {
    return remembered;
  }

  if (flightNo && from && to && date) {
    const match = searchFlights({
      from,
      to,
      date,
      cabin: cabin || 'economy',
    }).find(f => f.flightNo === flightNo);
    if (match) return match;
  }

  if (id) {
    const parts = String(id).split('__');
    if (parts.length >= 5) {
      return (
        searchFlights({
          from: parts[1],
          to: parts[2],
          date: parts[3],
          cabin: parts[4] || 'economy',
        }).find(f => f.flightNo === parts[0]) || null
      );
    }
  }

  return null;
}

export function defaultTravelDate() {
  const d = new Date();
  d.setDate(d.getDate() + 5);
  return d.toISOString().slice(0, 10);
}
