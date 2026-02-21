# Gioia — React Router Starter

This project has been reset to a minimal React + Vite + TypeScript setup using React Router.

## Quick Start

```cmd
npm install
npm run dev
```

FRONTEND

Open the app, then navigate using the header links. Routes included:

- Home: `/`
- About: `/about`
- Not Found: any unknown path

## Files

- `src/router.tsx`: App routes via `createBrowserRouter`.
- `src/App.tsx`: Root layout with navigation and `<Outlet />`.
- `src/pages/*`: Example route components.

## Add a New Route

1. Create a page in `src/pages/YourPage.tsx`.
2. Add it to `src/router.tsx` under the root children.

Example:

```tsx
// src/pages/Contact.tsx
export default function Contact() {
  return <h2>Contact</h2>
}

// src/router.tsx
import Contact from './pages/Contact'
// ...
{ path: 'contact', element: <Contact /> },
```
