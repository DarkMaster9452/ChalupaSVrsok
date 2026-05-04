# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for **Chalupa Pod skleným vŕškom** — a holiday cottage rental in the village of **Huty, okr. Liptovský Mikuláš**. All content is in Slovak. No build step, no package manager, no test runner.

**To preview:** open any `.html` file directly in a browser, or serve with `python -m http.server`.

## Architecture

Everything is split across two shared files and five standalone HTML pages:

- **`css/style.css`** — all styles, single file. Design tokens at `:root` top (colors, sidebar width, transition speed). Sections separated by `/* ---- NAME ---- */` comments.
- **`js/main.js`** — all shared JS in one IIFE: sidebar toggle, hero slider, scroll-reveal (IntersectionObserver), progress bars, counters, lightbox, back-to-top.
- **`index.html`** — homepage with hero slider (two `.slide` divs, auto-advances every 5s via `setInterval` in main.js)
- **`o-chalupe.html`**, **`galeria.html`**, **`rezervacia.html`**, **`kontakt.html`** — inner pages; each has a `.page-hero` banner, inline `<footer>`, and a page-specific `<script>` block after `main.js` if needed.

## CDN Dependencies

Loaded from CDN — no local copies:
- **MapLibre GL v5** — `unpkg.com/maplibre-gl@5` (kontakt.html only; tiles from `tiles.openfreemap.org/styles/liberty`)
- **Font Awesome 6.4.0** — `cdnjs.cloudflare.com`
- **Google Fonts** — Lora (serif/italic headings) + Raleway (body/UI)

## Design System

| Token | Value | Usage |
|---|---|---|
| `--accent` | `#bfa97d` | Gold — borders, highlights, markers |
| `--accent-dark` | `#8c7a52` | Hover state |
| `--bg-dark` | `#1c150d` | Sidebar, footer, stats section |
| `--bg-card` | `#f2ebe0` | Alternating section backgrounds |
| `--sidebar-w` | `280px` | Desktop layout offset (`margin-left` on `.main`) |

## Key Patterns

**Scroll animations:** Add `.reveal` class to any element — `IntersectionObserver` in main.js adds `.in-view` when it enters the viewport. Needs both classes in CSS to work.

**Hero slider:** `.slide` divs inside `.hero`. Active slide gets `.active` (opacity 1, z-index 1). Outgoing slide gets `.leaving` (opacity 0, z-index 2) for smooth crossfade, removed after 1s timeout.

**Mobile layout:** At `≤900px`, `--sidebar-w` becomes `0px`, sidebar transforms off-screen, `.mobile-header` appears. Hamburger toggle adds `.open` to both `#hamburger` and `#sidebar`.

**Footer:** Identical HTML block in every page — edit all five files when changing footer content.

**Forms (rezervacia, kontakt):** No backend. Submit handler builds a `mailto:` URL with pre-filled subject/body and redirects to it.

## Coordinates

Chalupa location: `lon: 19.5733, lat: 49.2220` (Huty, Liptovský Mikuláš) — used in the MapLibre map on kontakt.html.
