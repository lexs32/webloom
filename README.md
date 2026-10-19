# Webloom portfolio

Webloom, the independent web design and development studio of LexS.

## Local development

npm install
npm run dev

## Production check

npm run build
npm run preview

## Content and design

- `index.html`: locally owned homepage layout, preserving the existing Webloom/Framer export styling and artwork.
- `src/portfolio-data.ts`: agency and profile, five project URLs, service details, and FAQ answers. Add websites here.
- `src/personalize.ts`: project cards, native contact/FAQ dialogs, Discord copy, and dock navigation.
- `src/personalize.css`: responsive portfolio refinements and interaction styles.
- `public/assets/portfolio/`: actual screenshots of the five supplied websites.
- `public/index.html`: copy of the homepage entry; keep synchronized if editing the exported markup.

The homepage no longer loads the original remote Framer application, so remote hydration cannot replace personal content with template copy. Original React components and demo assets remain in the repository, but the active entry is `src/personalize.ts`.

Contact: lexsinfo@gmail.com / Discord `.yvko`.

The existing Vercel project configuration is preserved. Publishing is separate from local development.
