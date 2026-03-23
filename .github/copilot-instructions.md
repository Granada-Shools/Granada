# Granada Schools - Copilot Instructions

This is a Next.js frontend project with TypeScript, Tailwind CSS, and ESLint for the Granada School platform.

## Project Setup Status

- ✅ Project Requirements Clarified - Next.js with public folder for images
- ✅ Project Scaffolded - Next.js 16.1.6 with TypeScript and Tailwind CSS
- ✅ Project Customized - Added src directory structure and public folder
- ✅ Dependencies Installed - 381 packages installed successfully
- ✅ Development Task Created - Dev server running on http://localhost:3000
- ✅ Landing Page Created - Hero component with interactive value columns
- ✅ Color Scheme Implemented - Full Granada color palette configured
- ✅ Navigation Routes Created - Granada School and Granada International pages

## Development Commands

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── public/
│   ├── granada-hero2.jpg       ← ADD YOUR HERO IMAGE HERE
│   └── granada-logo.svg        # Granada logo with GS emblem
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home/Landing page
│   │   ├── colors.css          # Color scheme
│   │   ├── globals.css         # Global styles
│   │   ├── granada-school/
│   │   │   └── page.tsx        # Granada School page
│   │   └── granada-international/
│   │       └── page.tsx        # Granada International page
│   └── components/
│       └── Hero.tsx            # Hero landing component
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── .eslintrc.json
└── README.md
```

## Color Scheme

Primary Colors:
- Primary Blue: `#346988`
- Secondary Green: `#aac20c`
- Dark: `#0d0c0d`
- White: `#ffffff`

Accent Colors:
- Gray: `#afaeaf`
- Warm Accent: `#936c51`
- Green Accent: `#436b0d`
- Light Accent: `#ecfb94`
- Pink Accent: `#d52978`
- Blue Accent: `#0d88e4`

Granada Core Values (with Colors):
- Resilience: `#c0180b`
- Curiosity: `#ebae1b`
- Kindness: `#4a6428`
- Honesty: `#84b7c8`
- Respect: `#483454`

## Landing Page Features

The hero component includes:
- Full-screen hero image with dark tint overlay
- Granada logo (color-updated) positioned at top left
- Hamburger menu button (top right) that opens side navigation
- Side navigation menu (slides from right) with links to:
  - Granada School (local CBE curriculum)
  - Granada International (Edexcel curriculum)
- Interactive value columns:
  - Five columns representing core values (Resilience, Curiosity, Kindness, Honesty, Respect)
  - First four columns: each 20% width minus 10px
  - Last column (Respect): fills remaining width
  - Hover effect with tinted overlay showing value color
  - Text labels at bottom with corresponding background colors

## Important: Add Hero Image

**You must add the hero image file:**
- Place your image at: `public/granada-hero2.jpg`
- Recommended size: 1920x1080px or larger
- Supported formats: JPG, PNG, WebP

The image will be automatically optimized by Next.js Image component.

## Logo Details

Logo file: `public/granada-logo.svg`
- Emblem text "GS": White (#ffffff)
- Circle and text: #346988 (primary blue)
- Text: "GRANADA" around the circle

## Adding Components

Create new components in `src/components/`:

```tsx
// src/components/Header.tsx
export default function Header() {
  return <header>...</header>;
}
```

Then import and use them in your pages or layout.

## Tailwind CSS Colors

Use the configured color names in your Tailwind classes:
- `bg-primary` / `text-primary` - #346988
- `bg-secondary` / `text-secondary` - #aac20c
- `bg-dark` / `text-dark` - #0d0c0d
- `bg-gray` / `text-gray` - #afaeaf

Example:
```tsx
<div className="bg-primary text-white">Primary Blue Background</div>
<div className="bg-secondary text-dark">Secondary Green Background</div>
```

## Deployment Tips

This project is ready to deploy to Vercel, AWS, or any Node.js hosting platform. See README.md for more information.

