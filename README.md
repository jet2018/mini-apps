# Chooga demo mini-apps

Three Netlify-ready mini-apps for Awash Birr Pro’s Superapp host. Each boots on **`@jetezra/bridge@0.0.2`**, greets the host user by name, and only uses real product actions (progress, toast, cart, PIN payments)—no HostPanel / bridge playground.

| App | Stack | Dummy API | Flow |
|-----|--------|-----------|------|
| [`react-store`](./react-store) | Vite + React | [Fake Store](https://fakestoreapi.com) | Welcome → products → cart → `payments.initiate` (PIN) |
| [`vue-posts`](./vue-posts) | Vite + Vue 3 | [JSONPlaceholder](https://jsonplaceholder.typicode.com) posts | Welcome → browse / compose |
| [`html-todos`](./html-todos) | Plain HTML/CSS/JS | JSONPlaceholder todos | Welcome → list / add |

## Bridge

- **Vite apps:** `npm install @jetezra/bridge@0.0.2` → `import ChoogaBridge from '@jetezra/bridge'`
- **HTML:** CDN `https://unpkg.com/@jetezra/bridge@0.0.2/dist/chooga-bridge.min.js`
- **Browser demos:** `mockHost({…})` before `init()` when not inside `ReactNativeWebView`
- Host injects session, user, theme, safe area, hostInfo after `chooga.ready`

## Welcome → product

1. Welcome greets `user.display_name` / `user.name` and offers choose-how-to-proceed.
2. Product screens call host APIs only as needed (`showProgress`, `toast`, `cart.*`, `payments.initiate`, `close`).
3. **react-store** owns the PIN path: checkout → `payments.initiate` → host `PinScreenModal` → success bag (no live debit in this pass).

## Catalog permissions

Suggested `requested_permissions` when registering in Chooga:

| App | Permissions |
|-----|-------------|
| react-store | `payments.initiate`, `cart`, `host.progress`, `host.toast`, `wallet.pick`, `user.identity`, `host.close` |
| vue-posts | `host.progress`, `host.toast`, `user.identity`, `host.close` |
| html-todos | `host.progress`, `host.toast`, `user.identity`, `host.close` |

Also set `bridge_version` to `1`, `requires_auth` to `true`, and `web_view_base_url` / `allowed_origins` to each Netlify origin.

## Local run

```bash
# React
cd react-store && npm install && npm run dev

# Vue
cd vue-posts && npm install && npm run dev

# HTML (any static server)
cd html-todos && npx serve .
```

## Netlify

| Site base | Build | Publish |
|-----------|-------|---------|
| `react-store` | `npm run build` | `dist` |
| `vue-posts` | `npm run build` | `dist` |
| `html-todos` | *(none)* | `.` |

## Test in Awash

1. Register / update the three mini-apps in Chooga; sync Superapp catalog.
2. Open an app → **Welcome, {name}** with path choices (no HostPanel).
3. Store: add to cart → checkout → enter PIN → success result.
4. Posts / todos: list and compose with host progress / toast.
