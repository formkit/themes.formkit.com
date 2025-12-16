# themes.formkit.com

Public showcase website for FormKit themes. Nuxt 3 app with live theme editing and CLI integration.

## Architecture

```
themes.formkit.com/
├── app.vue                 # Root layout
├── nuxt.config.ts          # Nuxt + Tailwind v4 CDN config
├── formkit.config.ts       # FormKit with Pro inputs
├── pages/
│   ├── index.vue           # Theme showcase + selector
│   └── editor.vue          # Full theme editor
├── components/
│   ├── AppHeader.vue       # Navigation + dark mode
│   ├── DownloadModal.vue   # TW3/TW4 CLI commands
│   └── FormKitExampleScroller.vue
├── server/api/
│   ├── themes.ts           # GET /api/themes
│   └── generate.post.ts    # POST /api/generate
├── src/
│   └── manifest.ts         # Theme imports
├── utils/
│   └── parseVariables.ts   # URL param parsing
└── plugins/
    ├── global-components.js
    └── analytics.client.js
```

## Key Features

### Tailwind CSS 4 CDN

Configured in `nuxt.config.ts`:

```typescript
script: [
  { src: 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4' }
],
style: [
  {
    type: 'text/tailwindcss',
    innerHTML: '@custom-variant dark (&:where(.dark, .dark *));'
  }
]
```

### Theme Manifest

```typescript
// src/manifest.ts
export const themeManifest = {
  regenesis: () => import('@formkit/theme-regenesis'),
  starter: () => import('@formkit/theme-starter'),
  'regenesis-tw3': () => import('@formkit/theme-regenesis-tw3'),
  'starter-tw3': () => import('@formkit/theme-starter-tw3'),
}
```

### Theme Switching

```typescript
// pages/index.vue
watch(activeTheme, async (themeName) => {
  const { default: theme } = await themeManifest[themeName]()
  config.rootClasses = rootClasses(theme(parseVariables()).tailwind())
  document.dispatchEvent(new Event('FormKitTheme'))
})
```

## API Routes

### GET /api/themes
Returns array of available theme metadata.

### POST /api/generate
Generates theme code file.

```typescript
// Request body (validated with Valibot)
{
  theme: string,        // Required
  variables?: string,   // "var1=val1,var2=val2"
  ts?: 'true'|'false',  // TypeScript output
  semantic?: 'true'|'false'
}
```

## Environment Variables

```env
FORMKIT_PRO_KEY=fk-***        # Pro inputs license
KV_DRIVER=cloudflare-kv-http  # Analytics storage
KV_ACCOUNT_ID=***
KV_NAMESPACE_ID=***
KV_API_TOKEN=***
NPM_TOKEN=***                 # Private package access
```

## Development

```bash
pnpm dev       # Nuxt dev server (port 3000)
pnpm build     # Production build
pnpm generate  # Static generation
pnpm preview   # Preview production build
```

## FormKit Configuration

```typescript
// formkit.config.ts
{
  plugins: [proPlugin, createMultiStepPlugin()],
  inputs: { barcode },
  icons: { ...genesisIcons, github, external, sun, moon },
  config: {
    rootClasses: rootClasses(theme().tailwind()),
  },
}
```

## Pages

### index.vue (Home)
- Theme selector cards
- Live form examples (FormKitExampleScroller)
- Download modal for CLI commands
- "Customize" link to editor

### editor.vue (Editor)
- Full theme editor integration
- URL-based state: `?theme=name&variables=...`
- FormKitKitchenSink for all inputs
- Real-time variable updates

## Theme Editor Integration

```typescript
// editor.vue
import { createEditor } from '@formkit/theme-editor'

onMounted(() => {
  createEditor()
  window.__FORMKIT_AVAILABLE_THEMES__ = themeManifest
})

// Listen for variable changes
document.addEventListener('formkit-theme-update', (e) => {
  // Update URL with new variables
  router.replace({ query: { theme, variables: e.detail.variables }})
})
```

## Interconnections

```
themes.formkit.com (this package)
    ↓ imports and displays
├── @formkit/theme-regenesis (main theme)
├── @formkit/theme-starter (starter theme)
├── @formkit/theme-regenesis-tw3 (TW3 variant)
├── @formkit/theme-starter-tw3 (TW3 variant)
├── @formkit/theme-editor (editor UI)
├── @formkit/theme-creator (rootClasses)
└── @formkit/pro (premium inputs demo)
```

## Common Tasks

### Adding a new theme

1. Add dependency in `package.json`
2. Add to `src/manifest.ts`
3. Theme appears in selector automatically

### Modifying download instructions

Edit `components/DownloadModal.vue`:
- TW3/TW4 variant handling
- CLI command format
- Copy functionality

### Updating FormKit config

Edit `formkit.config.ts`:
- Add/remove plugins
- Modify icons
- Change default theme

### Analytics

Uses Vue Fathom (privacy-first):
- Site ID: `LFEMPNAQ`
- Configured in `plugins/analytics.client.js`

## Deployment

Static generation + Nitro server for API routes:
- `pnpm generate` for static files
- API routes need Node.js runtime
- Cloudflare KV for analytics storage
