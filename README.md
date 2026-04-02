# Granada Schools

Website for the Granada group of schools — a dual-site platform serving two distinct institutions under one domain.

## About

### Granada School (`/granada-school`)
Granada CBE Junior & Senior Girls' Boarding Secondary School, located in Kenya. Follows the Competency-Based Education (CBE) curriculum. Provides boarding for both junior and senior secondary girls, with a focus on academic excellence, character formation, and holistic development.

- **Email:** admissions@granadagirls.ac.ke
- **Admissions team:** Christopher Sabwa (+254 714 848 289) · Asya Adan (+254 717 682 138)

### Granada International (`/granada-international`)
Granada International School. Follows the Edexcel / British international curriculum, preparing students for globally recognised qualifications.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework & routing |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| CSS custom properties | Brand colour tokens |
| Next.js `<Image>` | Optimised image delivery |
| ESLint | Code quality |

## Colour Scheme

| Token | Hex | Usage |
|---|---|---|
| Primary Blue | `#213558` | Main brand colour |
| Secondary Green | `#aac20c` | Accents & highlights |
| Dark | `#0d0c0d` | Body text |
| Gray | `#afaeaf` | Secondary text |
| Warm Accent | `#936c51` | Decorative |

### Core Value Colours (Granada School)
| Value | Hex |
|---|---|
| Resilience | `#c0180b` |
| Curiosity | `#ebae1b` |
| Kindness | `#4a6428` |
| Honesty | `#84b7c8` |
| Respect | `#483454` |

---

## Project Structure

```
public/
  g-school.svg             # Granada School logo (for light backgrounds)
  g-school-dark.svg        # Granada School logo (for dark backgrounds)
  Schools.svg / Schools-dark.svg   # Combined group logos
  *.jpg                    # Hero & campus images

src/
  app/
    page.tsx               # Landing page (school selector)
    layout.tsx             # Root layout
    globals.css            # Global styles
    colors.css             # CSS colour tokens
    granada-school/
      page.tsx             # Homepage
      about/               # About the school
      academics/           # Curriculum & academics
      admissions/          # Admissions process & team
      campus-life/         # Boarding & student life
      wellbeing/           # Student wellbeing
      news/                # News & updates
    granada-international/
      page.tsx             # Homepage
      about/               # About the school
      academics/           # Curriculum & academics
  components/
    Hero.tsx               # Landing hero component
```

---

## Development

```bash
npm install        # Install dependencies
npm run dev        # Start dev server → http://localhost:3000
npm run build      # Production build
npm start          # Start production server
npm run lint       # Run ESLint
```

## Deployment

Compatible with any Node.js hosting platform. Recommended: **Vercel** (zero-config for Next.js).
