# NEU CSE Index – Dashboard

## File structure

```
app/dashboard/
├── layout.tsx                  ← Server component; fetches data, wraps everything
├── page.tsx                    ← Redirects /dashboard → /dashboard/profile
│
├── _types/index.ts             ← All TypeScript types (Role, User, Admin, …)
├── _data/
│   ├── seed.ts                 ← Server-side data fetching (replace with Prisma/API)
│   └── constants.ts            ← COUNTRIES, CITIES, NAV_STRUCTURE, colours, etc.
│
├── _components/
│   ├── AppProvider.tsx         ← Client context provider; receives data as props
│   ├── DashboardShell.tsx      ← Responsive wrapper (sidebar + mobile overlay)
│   ├── Sidebar.tsx             ← Navigation sidebar with role switcher
│   ├── ui.tsx                  ← Primitives: Btn, Input, Select, Card, Badge, StatCard,
│   │                              ConfirmModal, Toast, useConfirm(), useToast()
│   └── shared.tsx              ← Domain components: Avatar, PhotoUpload, CropModal,
│                                  CityPicker, CityCountry, InstSelect,
│                                  AddressModal, InstitutionModal
│
├── profile/page.tsx
├── social/page.tsx
├── academic/page.tsx           ← Read-only; admin-managed
├── history/page.tsx
├── address/page.tsx
├── change-password/page.tsx    ← Available to all roles
├── stats/page.tsx              ← Admin / superadmin only
├── register-users/page.tsx     ← Admin / superadmin only
├── user-management/page.tsx    ← Admin / superadmin only
├── data-management/page.tsx    ← Admin / superadmin only
└── admin-management/page.tsx   ← Superadmin only
```

## Setup

### 1 – Drop the folder

Copy `dashboard/` into your `app/` directory alongside your existing routes.

### 2 – Tabler Icons

Add to your root `layout.tsx` `<head>`:

```tsx
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
/>
```

Or install the package:

```bash
npm install @tabler/icons-webfont
```

Then in `globals.css`:

```css
@import "@tabler/icons-webfont/dist/tabler-icons.css";
```

### 3 – Tailwind v4 (optional palette tokens)

Add to your `globals.css` inside `@theme`:

```css
@theme {
  --color-neu-green:         #02644A;
  --color-neu-green-hover:   #00916A;
  --color-neu-emerald:       #10B981;
  --color-neu-emerald-light: #D1FAE5;
}
```

### 4 – Replace seed data with real DB calls

Open `_data/seed.ts`. Each `await getSeedData()` call in `layout.tsx` is where
you plug in your Prisma queries:

```ts
// _data/seed.ts
import { prisma } from "@/lib/prisma";

export async function getSeedData(): Promise<AppData> {
  const [users, admins, ...] = await Promise.all([
    prisma.user.findMany(),
    prisma.admin.findMany(),
    ...
  ]);
  return { role: session.user.role, users, admins, ... };
}
```

### 5 – Role protection

The sidebar navigation (`NAV_STRUCTURE` in `_data/constants.ts`) already restricts
which pages are reachable per role:

| Role        | Visible sections                        |
|-------------|------------------------------------------|
| `user`      | Account only (profile → change-password)|
| `admin`     | Management only (stats → change-password)|
| `superadmin`| System + Management                      |

For hard server-side protection, add middleware or check the session role in each
page server component and call `notFound()` or `redirect()` as needed.
