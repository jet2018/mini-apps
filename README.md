# Chooga demo mini-apps (Ethiopian market)

Three Netlify-ready mini-apps shaped like real Awash Superapp partners — local commerce, flights, and equb savings. All use **`@jetezra/bridge@0.0.2`**, greet the host user by name, and settle money with **Awash PIN** (`payments.initiate`). Data is staged (no live airline/equb APIs).

| Folder (deploy root) | Product | Flow |
|----------------------|---------|------|
| [`react-store`](./react-store) | **Bole Mart** — Merkato-style shop | Welcome → catalog (ETB) → localStorage cart → PIN checkout |
| [`vue-posts`](./vue-posts) | **Habesha Airways** — flight booking | Welcome → search → results → passenger → PIN ticket |
| [`html-todos`](./html-todos) | **Tena Equb** — rotating savings (eQUB-style) | Welcome → my equbs → contribute → PIN |

Branding is **demo-inspired** (not official Ethiopian Airlines / eQUB / Kacha apps).

## Why these three

- **Bole Mart** — everyday retail + host cart + PIN (replaces generic Fake Store).
- **Habesha Airways** — high-trust booking with staged ADD/Bahir Dar/DXB routes (replaces blog posts).
- **Tena Equb** — uniquely Ethiopian ROSCA / equb contribution with PIN (replaces todos; stands in for eQUB-class services; Kacha-like bill pay can be a follow-on).

## Bridge & permissions

| App | Suggested `requested_permissions` |
|-----|-----------------------------------|
| Bole Mart | `payments.initiate`, `host.progress`, `host.toast`, `user.identity`, `host.close` |
| Habesha Airways | `payments.initiate`, `host.toast`, `user.identity`, `host.close` |
| Tena Equb | `payments.initiate`, `host.toast`, `user.identity`, `host.close` |

CDN (HTML): `https://unpkg.com/@jetezra/bridge@0.0.2/dist/chooga-bridge.min.js`  
Browser demos: `mockHost` before `init` when not in `ReactNativeWebView`.

## Local run

```bash
cd react-store && npm install && npm run dev   # Bole Mart
cd vue-posts && npm install && npm run dev     # Habesha Airways
cd html-todos && npx serve .                   # Tena Equb
```

## Netlify

| Base | Build | Publish |
|------|-------|---------|
| `react-store` | `npm run build` | `dist` |
| `vue-posts` | `npm run build` | `dist` |
| `html-todos` | *(none)* | `.` |

After deploy, point Chooga `web_view_base_url` / `allowed_origins` at each origin and refresh the Awash Superapp catalog.

## Test checklist

1. Open each app → **Welcome, {name}** with real path choices (no HostPanel).
2. Bole Mart: add Yirgacheffe → checkout → PIN → success.
3. Habesha Airways: ADD → Bahir Dar → select flight → PIN → PNR ticket.
4. Tena Equb: open Bole Office Circle → contribute → PIN → “Paid this round”.
