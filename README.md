# @easy-peasy/ui

Shared UI components for Easy Peasy apps.

## Installation

```bash
npm install @easy-peasy/ui
# or
yarn add @easy-peasy/ui
# or
pnpm add @easy-peasy/ui
```

## Usage

### AppSwitcher

Add the app switcher to your sidebar:

```tsx
import { AppSwitcher, DEFAULT_APPS } from "@easy-peasy/ui";

// In your sidebar component
<AppSwitcher
  currentAppId="requisition"  // Current app ID
  apps={DEFAULT_APPS}          // Or pass your own app list
  portalUrl="https://portal.easypeasy.com"
  variant="default"            // or "compact"
/>
```

### Custom Apps

You can pass a custom list of apps:

```tsx
import { AppSwitcher, type AppDefinition } from "@easy-peasy/ui";

const myApps: AppDefinition[] = [
  {
    id: "requisition",
    name: "Requisitions",
    description: "Purchase requests & approvals",
    url: "https://req.easypeasy.com",
    icon: "FileText",
    status: "live",
  },
  // ... more apps
];

<AppSwitcher currentAppId="requisition" apps={myApps} />
```

## Development

```bash
# Build the package
npm run build

# Watch mode
npm run dev
```

## Icons

The following icons are supported (from Lucide):
- `FileText` - Document/Requisitions
- `Store` - Store/Shop
- `Package` - Inventory
- `Users` - HR/People
- `BarChart3` - Analytics