# MediaVault Global

> **Business, leadership, and founder stories from the corridors, plants, and offices driving India's economy.**

MediaVault Global is a modern digital business magazine and editorial platform providing in-depth, verified reporting and long-form analysis across India's emerging industrial, leadership, and startup landscapes.

---

## 📌 Editorial Pillars

- **Enterprise**: Deep dives into state-level industrial policy, infrastructure investments, and manufacturing corridors (e.g., Pune MIDC, Gujarat's Sanand-Dholera fab, Sriperumbudur-Oragadam, Noida Yamuna Expressway, and North Karnataka).
- **Leadership**: Boardroom trends, executive transitions, gender representation in governance, and operational decision-making playbooks.
- **MSME & Growth**: Grounded strategies for mid-market and small enterprises spanning working-capital financing (TReDS), factory floor productivity, sales scaling, and compliance.
- **Startups & Founders**: High-signal reporting on early-stage mechanics, venture dynamics, unit economics, and operator-level lessons.
- **Industries**: Sector-specific intelligence across manufacturing, electronics, clean energy, technology, logistics, and healthcare.
- **Digital Magazine**: Curated monthly issue previews formatted for high-fidelity editorial viewing.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router with Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom design tokens
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/)
- **Icons & UI Primitives**: [Lucide React](https://lucide.dev/) & [Radix UI](https://www.radix-ui.com/)
- **Testing**: [Vitest](https://vitest.dev/) with JSDOM and Testing Library
- **SEO & Performance**: Static Site Generation (`generateStaticParams`), JSON-LD structured data (Schema.org), and dynamic metadata generation

---

## 📁 Project Structure

```text
├── public/                  # Static assets (editorial photography, logos, icons)
│   ├── enterprise/          # Enterprise industrial photography
│   ├── leadership/          # Leadership and executive editorial visuals
│   ├── startup-founders/    # Startup spotlight imagery
│   └── ...
├── src/
│   ├── app/                 # Next.js App Router pages and route handlers
│   │   ├── article/         # Unified reading interface with table of contents & schema
│   │   ├── category/        # Dynamic category and subcategory index views
│   │   ├── enterprise/      # Enterprise corridor routing and redirects
│   │   ├── leadership/      # Leadership corridor routing
│   │   ├── magazine/        # Issue viewer and monthly editions
│   │   └── ...
│   ├── components/
│   │   ├── magazine/        # Publication components (hero covers, story cards, nav)
│   │   └── ui/              # Accessible design system primitives (Radix UI)
│   ├── lib/
│   │   ├── data.ts          # Central publication data aggregation
│   │   ├── queries.ts       # Query and filtering helpers
│   │   ├── types.ts         # TypeScript schema definitions
│   │   └── *Data.ts         # Strongly-typed article and section datasets
│   └── test/                # Unit and routing integration tests
└── vitest.config.ts         # Vitest test suite configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ompalande-2151/media-vault-test.git
   cd media-vault-test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js local development server with Turbopack |
| `npm run build` | Pre-renders static pages and creates an optimized production bundle |
| `npm run start` | Serves the production build locally |
| `npm run test` | Runs the test suite via Vitest |
| `npm run test:watch` | Starts Vitest in interactive watch mode |
| `npm run lint` | Analyzes code for quality and style issues with ESLint |
| `npm run format` | Formats codebase using Prettier |

---

## 🔒 Publishing Standards & Compliance

- All publication pages are generated statically to guarantee sub-second delivery and high SEO rankings.
- Articles implement Schema.org `Article` metadata and OpenGraph social protocol specifications.
- Photographic media is organized by editorial section under `/public` with descriptive alt metadata.
