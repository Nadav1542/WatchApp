# Project Memory — YouTube Clone (ViewTube)

> **Purpose:** Quick-reference file for AI agents to save tokens and avoid re-discovering project context.  
> **Last updated:** 2025-06-20

---

## 1. Architecture Overview

```
MainProject/
├── webapp/          → React 18 frontend (CRA, port 3000)
├── server/          → Node.js/Express backend (port 8000)
├── c++_server/      → C++ recommendation engine (port 5555, TCP)
└── WIKI/            → Project documentation
```

- **Frontend** proxies API calls to backend via `"proxy": "http://localhost:8000"` in `webapp/package.json`
- **Backend** connects to MongoDB (`localhost:27017`, database: `data`)
- **C++ server** provides video recommendations over TCP socket (port 5555)
- Video files are served from `server/build/` via `GET /videowatch/:fileName`

---

## 2. Tech Stack

### Frontend (`webapp/`)
| Tech | Version | Notes |
|------|---------|-------|
| React | 18.3.1 | Create React App (react-scripts 5, Webpack) |
| Tailwind CSS | **v3** | `darkMode: 'class'`, installed as devDep. **v4 is NOT compatible with CRA/Webpack** |
| Bootstrap | 5.3.3 | Loaded via CDN in `public/index.html` (CSS + JS + Icons). Being phased out. |
| PostCSS + Autoprefixer | — | Configured in `postcss.config.js` |
| react-router-dom | 6.23.1 | Client-side routing |
| jwt-decode | 4.0.0 | JWT token handling |
| MUI | 6.4.6 | `@mui/material` installed but barely used |

### Backend (`server/`)
| Tech | Version | Notes |
|------|---------|-------|
| Express | 4.21.2 | ES modules (`"type": "module"`) |
| Mongoose | 8.5.1 | MongoDB ODM |
| Multer | 1.4.5 | File upload handling |
| jsonwebtoken | 9.0.2 | JWT auth |

---

## 3. Key Configuration Files

### Tailwind — `webapp/tailwind.config.js`
```js
module.exports = {
  darkMode: 'class',          // toggled by adding 'dark' class to <body>
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

### PostCSS — `webapp/postcss.config.js`
```js
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }
```

### Tailwind Entry — `webapp/src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
Imported in `src/index.js`.

### HTML — `webapp/public/index.html`
- Bootstrap 5.3.3 CSS via CDN
- Bootstrap 5.3.3 JS bundle via CDN
- Bootstrap Icons via CDN
- **NO** Tailwind CDN scripts (were removed — they conflicted with npm v3)

---

## 4. Dark Mode System

**File:** `src/DarkModeContext.js`
- React Context + `useDarkMode()` hook
- Toggles **BOTH** classes on `<body>`:
  - `dark` → used by Tailwind (`darkMode: 'class'`)
  - `dark-mode` → used by remaining legacy CSS rules
- State persisted in `localStorage` key `darkMode`
- Toggle triggered via `window.dispatchEvent(new Event('toggleDarkMode'))` pattern in some components

---

## 5. Routing — `src/App.js`

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `<Mainpage/>` | Home page with video grid |
| `/signup` | `<Signup/>` | Registration form |
| `/signin` | `<Signin/>` | Login form |
| `/Addingvideo` | `<Addingvideo/>` | Upload new video |
| `/videowatch/:id/:creator` | `<Videowatch/>` | Video player page |
| `/Myvideos/:id` | `<Myvideos/>` | User's channel/videos |

Component tree: `DarkModeProvider → BrowserRouter → ScrollingUp + AppProvider → AppContent (Routes)`

---

## 6. API Routes

### Backend (`server/server.js`)
- `server.use('/api/videos', videoRoutes)`
- `server.use('/api/users', userRoutes)`
- `server.use('/api/tokens/', generateTokenForUser)`
- `GET /videowatch/:fileName` — serves video files from `server/build/`

### Key Endpoints
- `POST /api/users` — register
- `POST /api/users/login` — login (returns JWT)
- `GET /api/users/:id` — get user details
- `GET /api/users/:userId/videos/:videoId` — get specific video
- `POST /api/users/:userId/videos/:videoId/views` — increment views
- `POST /api/videos/:id/comments` — add comment
- `PATCH /api/videos/:id/comments/:index` — edit comment
- `DELETE /api/videos/:id/comments/:index` — delete comment
- `POST /api/videos/:id/like` / `dislike` — like/dislike
- `POST /api/users/:userId/updateRecommend/:videoId` — update recommendations
- `GET /api/users/:userId/recommendedVideo/:videoId` — get recommended videos

---

## 7. File Structure — Frontend (`webapp/src/`)

### Core
| File | Purpose |
|------|---------|
| `index.js` | Entry point, imports `index.css` (Tailwind directives) |
| `App.js` | Router setup, wraps in DarkModeProvider + AppProvider |
| `Mainpage.js` | Home page: topbar + Quicksearch + video grid |
| `DarkModeContext.js` | Dark mode context with `dark` + `dark-mode` classes |
| `ScrollingUp.js` | Scroll-to-top on route change |

### Contexts (`src/contexts/`)
| File | Provides |
|------|----------|
| `AppProvider.js` | Wraps UserProvider + VideoProvider |
| `UserContext.js` | `connectedUser`, `userConnect`, `setuserConnect`, `setconnectedUser` |
| `VideoContext.js` | `videoList`, `deleteVideo`, `formatDate` |

### Topbar (`src/Topbar/`) — ✅ ALL MIGRATED TO TAILWIND
| File | Status | CSS File |
|------|--------|----------|
| `Menu.js` | ✅ Migrated | `Menu.css` — can delete |
| `SearchBar.js` | ✅ Migrated | `Searchbar.css` — can delete |
| `Quicksearch.js` | ✅ Migrated | `Quicksearch.css` — can delete |
| `Usericon.js` | ✅ Migrated | (had inline styles, no CSS file) |

### LeftMenu (`src/LeftMenu/`) — ✅ MIGRATED
| File | Status | CSS File |
|------|--------|----------|
| `Menubutton.js` | ✅ Migrated | — |
| `LeftMenu.js` | ✅ Migrated | `Itemslist.css` — **DELETED** |

### Sign (`src/Sign/`) — ✅ ALL MIGRATED
| File | Status | CSS File |
|------|--------|----------|
| `Signin.js` | ✅ Migrated | `Sign.css` — **DELETED** |
| `Signup.js` | ✅ Migrated | `Sign.css` — **DELETED** |

### videoItem (`src/videoItem/`) — ✅ MIGRATED
| File | Status | CSS File |
|------|--------|----------|
| `VideoItem.js` | ✅ Migrated | `Card.css` — **DELETED** |
| `Videolist.js` | ✅ Migrated | (imported Card.css, removed) |

### Videowatch (`src/Videowatch/`) — ✅ ALL MIGRATED
| File | Status | CSS File |
|------|--------|----------|
| `Videowatch.js` | ✅ Migrated | (no CSS file) |
| `Videodisplay.js` | ✅ Migrated | `Singlevideo.css` — **DELETED** |
| `Singlevideo.js` | ✅ Migrated | `Singlevideo.css` — **DELETED** |
| `Comments.js` | ✅ Migrated | `Comments.css` — **DELETED** |
| `LeftVideos.js` | ✅ Migrated | `videostyle.css` — **DELETED** |

### UserVideos (`src/UserVideos/`) — ✅ ALL MIGRATED
| File | Status | CSS File |
|------|--------|----------|
| `Addingvideo.js` | ✅ Migrated | `Addingvideo.css` — **DELETED** |
| `Myvideos.js` | ✅ Migrated | `myvideos.css` — **DELETED** |

---

## 8. Tailwind Migration Notes

### Pattern for migration
1. Remove `import './SomeFile.css'`
2. Replace custom CSS classes with Tailwind utilities
3. Use `!` prefix on Tailwind classes that need to override Bootstrap (e.g., `!bg-red-600`, `!text-white`)
4. Add dark mode variants: `dark:bg-...`, `dark:text-...`
5. Form inputs get `dark:!bg-transparent dark:!text-gray-100`
6. Delete the CSS file once no component imports it

### Common class mappings used
| Old (CSS/Bootstrap) | New (Tailwind) |
|---------------------|----------------|
| `btn-sign` | `!bg-red-600 hover:!bg-red-700 !text-white` |
| `cardreg` | `bg-gray-500/20 dark:bg-black/80 rounded p-4 shadow-lg` |
| `validinput` | `text-xs text-gray-500 dark:text-gray-100` |
| `btn-dark` | `!bg-gray-900 !text-gray-100 dark:!bg-gray-100 dark:!text-gray-900` |
| `card` (video) | `p-3 bg-transparent border-0 flex flex-col max-w-full overflow-hidden` |
| `card-img-top` | `w-full aspect-video object-cover rounded-lg` |
| `video-title` | `text-base font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2` |
| `video-uploader` | `text-sm text-gray-500 dark:text-gray-400 truncate` |

### Known issues & solutions
- **Tailwind v4 + CRA:** Incompatible. Must use v3.
- **CDN vs npm conflict:** Never load Tailwind via CDN and npm simultaneously.
- **Bootstrap specificity:** Use `!` prefix on Tailwind classes to win specificity battles.
- **Dark mode dual classes:** `DarkModeContext` adds both `dark` (Tailwind) and `dark-mode` (legacy CSS).
- **Itemslist.css conflicts:** Had `a { color: inherit }` rules that override Tailwind — were removed.
- **Card.css deleted but still imported:** ~~`Videodisplay.js` and `Singlevideo.js` still import `../videoItem/Card.css`~~ **FIXED** — imports removed during Videowatch migration

### Remaining CSS files in project
- `src/index.css` — Tailwind directives + `body.dark-mode` global rule (keep)
- **ALL component CSS files have been deleted** — migration complete!

---

## 9. Remaining Work — Bootstrap Removal (Phase 2)

**Phase 1 (DONE):** All custom CSS files eliminated, styles converted to Tailwind utilities.  
**Phase 2 (NOT DONE):** Bootstrap is still a core dependency. Removing it is a major effort:

### Bootstrap classes still used in JSX
| Category | Classes | Files |
|----------|---------|-------|
| **Grid** | `container`, `container-fluid`, `row`, `col-*`, `col-auto` | Mainpage, Videowatch, Myvideos, Signup, Signin, Addingvideo |
| **Forms** | `form-control`, `form-floating`, `form-select`, `form-group`, `form-label` | Signin, Signup, Addingvideo, Comments, Videodisplay, Myvideos |
| **Buttons** | `btn`, `btn-primary`, `btn-secondary`, `btn-danger`, `btn-warning`, `btn-outline-*` | Almost everywhere |
| **Modals (JS-dependent)** | `modal`, `modal-dialog`, `modal-content`, `modal-header/body/footer`, `data-bs-toggle/dismiss` | Videodisplay, Myvideos |
| **Offcanvas (JS-dependent)** | `offcanvas`, `offcanvas-start`, `offcanvas-header/body`, `data-bs-toggle/dismiss/scroll` | Menu.js |
| **Alerts** | `alert`, `alert-danger`, `alert-success`, `alert-info` | Comments, Signup, Myvideos |
| **Utilities** | `d-flex`, `justify-content-*`, `align-items-*`, `mb-3`, `ms-2`, `text-center` | Many files |

### Steps to fully remove Bootstrap
1. Replace grid classes with Tailwind (`container` → `max-w-7xl mx-auto`, `row` → `flex flex-wrap`, `col-*` → `w-*`)
2. Replace form classes with Tailwind styling (custom input classes)
3. Replace button classes with Tailwind (or create reusable button component)
4. **Rebuild modals** using React state + Tailwind (no more `data-bs-*` attributes)
5. **Rebuild offcanvas** using React state + Tailwind transitions
6. Replace alerts with Tailwind-styled divs
7. Replace Bootstrap utility classes with Tailwind equivalents
8. Remove Bootstrap CDN links from `public/index.html`
9. Remove `!` prefixes from Tailwind classes (no more specificity battles)
10. Optionally replace Bootstrap Icons CDN with a React icon library

---

## 10. Running the Project

```bash
# Terminal 1 — MongoDB (if not running as service)
mongod

# Terminal 2 — C++ Recommendation Server
cd c++_server && ./recommendation_server    # runs on port 5555

# Terminal 3 — Backend
cd server && node server.js                 # runs on port 8000

# Terminal 4 — Frontend
cd webapp && npm start                      # runs on port 3000
```

---

## 11. Database

- **MongoDB** on `localhost:27017`
- **Database name:** `data`
- **Collections:** `users`, `videos`
- **Models:** `server/models/users.js`, `server/models/Video.js`
- **Seed script:** `server/seed.js` (uses faker for test data)
