# Webloom portfolio

Navy and white redesign based on https://ywy.framer.website/, with the requested white cloud hero, three selected projects: RiftCheats, MadCheats, and Ma3loMate, and Discord contact.

## Active app

- `index.html` / `public/index.html`: document metadata and React entry.
- `src/webloom-main.tsx`: React mount.
- `src/Webloom.tsx`: split homepage, project details, About, services, reviews preview, FAQ, contact.
- `src/webloom.css`: responsive design, hover states, entrances, cloud drift, review marquee, reduced motion.
- `src/portfolio-data.ts`: actual profile, projects, services, FAQs.

The older App.tsx and personalize files remain as inactive source history; they are not loaded by this entry.

Run `npm run dev -- --host 127.0.0.1 --port 5177` or `npm run build`.

## Content and behavior

RiftCheats, MadCheats, and Ma3loMate are featured. HiddenCheats, NanoCheats, and Vogue IDE are removed from project data. Project cards scroll through captured full-page previews on hover and return to the top when the pointer leaves.

Discord links open the Webloom server. Members can run `/website-request` to fill out an intake form; completed briefs go to the configured private channel. Email: `lexsinfo@gmail.com`. The contact form opens the visitor's email app with a draft. Bot setup and required environment variables are documented in `bot/README.md`.

Review cards demonstrate the reference's scrolling treatment with clearly marked original sample copy. Replace samples with genuine Webloom feedback before publishing. No prices, timelines, or source-template identities were copied as Webloom business claims.

Hash routes keep navigation working on static hosting. Social metadata stays text-only; no RiftCheats screenshot is embedded in Discord previews.

## Assets

- `public/assets/webloom/white-clouds.webp`: generated with the built-in Image Gen tool, copied into the project and compressed to WebP.
- Prompt: “Create a high-resolution website background asset only, no text, no interface. Landscape 3:2. Deep midnight navy sky (#080f24) with luminous soft WHITE cumulus clouds sweeping across the lower half and left edge. Dreamy realistic photographic cloud volume, bright white sunlit cloud edges, soft cool blue shadows, elegant editorial mood. Upper center and upper right mostly open deep navy negative space for white website typography. No stars, no moon, no mountains, no objects. The clouds must be white, not blue smoke. This will fill the left half of a split-layout Webloom web designer portfolio hero.”
- Geist regular and medium font files downloaded from the reference's observed Google Fonts URLs.
- Discord icon from Simple Icons (`https://cdn.simpleicons.org/discord/ffffff`).
- Captured opening and full-page screenshots for RiftCheats, MadCheats, and Ma3loMate.

See `design-qa.md` for visual verification. Production deployment is managed through Vercel.
