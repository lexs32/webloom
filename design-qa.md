# Design QA — Webloom / YWY adaptation

Source visual truth: https://ywy.framer.website/ and its About, Contact, and project-detail routes. Captured references in `E:/stack/portfolio-work/references/`.
Implementation: http://127.0.0.1:5177/

## Scope and intentional differences

This is a branded adaptation, not an unchanged copy. Requested differences: navy/white palette, white clouds, Webloom/LexS identity, four cheat-store websites, removal of Vogue IDE, Discord social contact. Source photos, product renders, unrelated personal identity, rates, and testimonials are replaced. Project screenshots use contain sizing to preserve the full website composition. Homepage heading wraps differently because the copy is specific to Webloom.

## Evidence and comparison

- Desktop source: `E:/stack/portfolio-work/references/ywy-home-desktop.png`
- Desktop implementation: `E:/stack/portfolio-work/webloom-ywy-desktop-final.png`
- Combined desktop comparison opened and inspected: `E:/stack/portfolio-work/comparison-desktop.png`
- Mobile source: `E:/stack/portfolio-work/references/ywy-home-mobile.png`
- Mobile implementation: `E:/stack/portfolio-work/webloom-ywy-mobile.png`
- Combined mobile comparison opened and inspected: `E:/stack/portfolio-work/comparison-mobile.png`
- FAQ source: `E:/stack/portfolio-work/references/ywy-about-faq.png`
- Expanded implementation: `E:/stack/portfolio-work/webloom-faq-desktop.png` and `webloom-faq-mobile.png`

CSS viewports: 1280 x 720 desktop and 390 x 844 mobile. Browser screenshot outputs are 1265 x 712 desktop and 375 x 812 mobile on both sides. Combined inputs preserve their identical pixel dimensions; no unequal-density comparison. The browser excludes its scrollbar/viewport framing in the output. Full-view composition and focused readable hero controls, project crops, navigation, and expanded FAQ were inspected in browser screenshots.

## Required fidelity surfaces

- Typography: local Geist files match the source family. Oversized compact hero, muted lead phrase, small pill labels, regular body hierarchy preserved. Content-specific wrapping intentional.
- Spacing/layout: desktop split hero and stacked previews; mobile single column with menu, intro, CTAs, tags, then projects. Service grid, rounded cards, centered section introductions, wide contact split preserved.
- Colors: source's light/black system intentionally changed to requested navy/white. Hero tags have dark backing to retain contrast over clouds. Blue contact accent and muted blue secondary text consistent.
- Images: real existing project screenshots, full aspect ratio visible. Generated white cloud asset is local WebP. Discord uses actual brand icon. No source portrait is represented as LexS.
- Copy: actual agency, name, contacts and projects. Review cards are explicitly samples. No source designer's statements are represented as Webloom endorsements.

## Comparison history and fixes

1. Initial browser inspection found cropped website screenshots, poor tag contrast over bright clouds, and Services navigation firing before the new page mounted (P2). Fixed object-fit to contain, supplied dark tag/link backing, and scroll after page entrance. Re-captured desktop final and compared it to the source in the combined board; full screenshot compositions and legible controls verified.
2. Page transitions could retain scroll position from a long previous route (P2). Reset scroll on completed entrance for page routes. Mobile project detail opened at its heading, with metadata and full screenshot visible. Return Home opened at the hero.
3. React development warnings from a mixed mount/component entry and fetchPriority were resolved by a dedicated mount file and HTML preload. Reloaded final entry; fresh log tail contains Vite/React informational output only.

## Functional checks

- Desktop Services/FAQ navigation and mobile menu open/navigate/close.
- Service card opens a native modal with service details and focus on Close.
- FAQ expands and exposes matching accessible regions on desktop/mobile.
- Project opens its detail view, actual external RiftCheats link preserved, return to work works.
- Contact screen has real email/Discord and labeled required fields. Email draft action is intentionally mailto, not a backend send.
- All checked project/brand images loaded; mobile document width 375 inside 390 CSS viewport with no horizontal overflow.
- Reduced motion CSS disables cloud, floating shots, marquee, and transitions; animation-aware React paths included. OS setting was not changed during this run.
- Build/type check passes. Whitespace check passes.

## Follow-up / limitations

Clipboard copy is browser-permission-dependent; this in-app browser did not confirm copying, so fallback is Contact with the visible username. Mail application launching and real email delivery were not exercised. Review samples need actual client feedback before publication. These are explicit preview behavior, not hidden backend functionality.

No actionable P0/P1/P2 visual findings remain within the requested adaptation. No production deployment performed.

final result: passed
