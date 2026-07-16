# Chooga demo mini-apps

Three Netlify-ready mini-apps that exercise the **Chooga bridge v1** contract used by Awash Birr Pro’s Superapp host (`Application/Screens/Superapp`).

| App | Stack | Dummy API | Pages |
|-----|--------|-----------|--------|
| [`react-store`](./react-store) | Vite + React + React Router | [Fake Store](https://fakestoreapi.com) | List → Details → Checkout form |
| [`vue-posts`](./vue-posts) | Vite + Vue 3 + Vue Router | [JSONPlaceholder](https://jsonplaceholder.typicode.com) posts | List → Details → Compose form |
| [`html-todos`](./html-todos) | Plain HTML/CSS/JS | JSONPlaceholder todos | List → Details → Add form |

Shared client: [`shared/chooga-bridge.js`](./shared/chooga-bridge.js) (vendored into each app).

## Bridge behavior

On load each app calls `chooga.ready`. The host then injects:

- `chooga.session` — JWT + `expires_at`
- `chooga.user` — sanitized claims
- `chooga.theme` — `mode`, `primary_color` (also CSS `--chooga-primary`)
- `chooga.safeArea` — insets

Mini-app → host buttons:

| Button | Message |
|--------|---------|
| Request identity | `chooga.requestCapability` / `user.identity` |
| Request phone | `chooga.requestCapability` / `user.phone` |
| Open docs | `chooga.openExternal` (https URL) |
| Close mini-app | `chooga.close` |

Standalone browser mode works without the host (`Host bridge: standalone`); API data still loads.

## Local run

```bash
# React
cd react-store && npm install && npm run dev

# Vue
cd vue-posts && npm install && npm run dev

# HTML (any static server)
cd html-todos && npx serve .
# or: python3 -m http.server 5175
```

## Netlify deploy

Deploy **three separate sites** (one origin each):

| Site base directory | Build command | Publish |
|---------------------|---------------|---------|
| `react-store` | `npm run build` | `dist` |
| `vue-posts` | `npm run build` | `dist` |
| `html-todos` | *(none / echo)* | `.` |

Each folder already has a `netlify.toml`. After deploy, copy the three `https://….netlify.app` URLs.

CLI example:

```bash
# from each app folder
npx netlify deploy --prod
```

## Register in Chooga (so Awash can open them)

Mini-apps are loaded from the catalog via `web_view_base_url` — the host does not discover Netlify URLs automatically.

In Chooga Developer / Admin, create (or update) three mini-apps:

| Field | Value |
|-------|--------|
| `web_view_base_url` | Netlify URL for that app (https) |
| `allowed_origins` | Same origin as the Netlify URL |
| `requested_permissions` | `user.identity`, `user.phone`, `host.openExternal`, `host.close` |
| `bridge_version` | `1` |
| `requires_auth` | `true` |
| Status | `testing` (non-PROD host merges testing + production) |

Suggested display names:

- Chooga React Store
- Chooga Vue Posts
- Chooga HTML Todos

## Test in Awash Birr Pro

1. Ensure the mobile host points at your Chooga environment (`SUPER_URL` / keys in app config).
2. Open Superapp catalog → pull to refresh / wait for background sync.
3. Find each demo app → **Download** → allow the four permissions.
4. **Open** → confirm Host bridge shows session, user, theme, safe area.
5. Tap capability / open docs / close buttons and confirm host responses.

## Layout

```
chooga-demo-mini-apps/
  README.md
  shared/chooga-bridge.js
  react-store/
  vue-posts/
  html-todos/
```

After editing `shared/chooga-bridge.js`, re-copy into:

- `react-store/src/chooga-bridge.js`
- `vue-posts/src/chooga-bridge.js`
- `html-todos/js/chooga-bridge.js` (strip the trailing `export` lines for classic scripts)
