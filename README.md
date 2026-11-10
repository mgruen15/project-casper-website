# Casper website

Marketing site for Casper (working name): a single page startup site at `/` plus placeholder legal pages.

Stack: React 19, Vite, Tailwind CSS v4, shadcn/ui style components (Radix), Framer Motion, React Router.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:5173/project-casper-website/

## Edit content

- `src/config.ts`: brand name (`BRAND_NAME`), tagline, contact email, site URL. Rename the product here.
- `src/content.ts`: every piece of copy. Search for `TODO` and `[brackets]` to find placeholders (team, legal pages, contact person).
- `public/og-image.png`: social preview image. Source: `public/og-image.svg`. Regenerate it after a rename.

## Deploy to GitHub Pages

1. Push to `main`.
2. In the repository go to Settings, Pages, and set Source to **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes the site.

The site is served from `https://<user>.github.io/project-casper-website/`. The base path is set in `vite.config.ts`.
For a custom domain, build with `VITE_BASE=/` and update `SITE_URL` in `src/config.ts`.
`404.html` is a copy of `index.html`, so deep links such as `/impressum` work on GitHub Pages.

## Pilot form and Supabase (optional)

Without configuration the form shows a success state only. To store signups:

1. Run `supabase/schema.sql` in the Supabase SQL editor.
2. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (see `.env.example`). For GitHub Pages, add them as repository variables under Settings, Secrets and variables, Actions, Variables.

The anon key is public by design. Row level security only allows inserts.
