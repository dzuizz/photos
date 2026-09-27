# Dzuizz — Selected photographs

An editorial photography portfolio built with Next.js 14, React 18, and TypeScript. The exhibition pairs an ivory background and serif typography with uncropped photographs, subject filters, an index view, and a keyboard-accessible full-screen viewer.

## Development

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
npm start
```

Deploy with a Next.js-compatible host or Node.js server to support the built-in image optimizer. Include `pictures/` in the repository or build context; statically imported images are bundled automatically. No image copying step is needed.

## Project structure

- `pictures/` — gallery photographs and the photographer portrait, `pfp.jpeg`.
- `lib/photographs.ts` — static image imports, display order, titles, categories, and alt text.
- `lib/site.ts` — photographer name and contact details.
- `components/gallery/` — gallery, viewer, header, and footer.
- `components/PageShell.tsx` — shared layout for supporting pages.
- `app/globals.css` — responsive layouts and design tokens.
- `app/about/page.tsx` and `app/contact/page.tsx` — biography and contact pages.

## Adding photographs

1. Place a web-ready image in `pictures/`.
2. Import it in `lib/photographs.ts` and add a record with a unique ID, title, category, and descriptive alt text.
3. Update the introductory collection count in `app/page.tsx` to match.
4. Run `npm run build` before deploying.

`next/image` derives image dimensions and blur previews from static imports and serves responsive image variants. Keep archival camera originals outside the repository. The portrait is imported separately by the About page and is not part of the exhibition.

## Pages and controls

- `/` — exhibition, subject filters, and compact index view.
- `/frame/[id]` — individual photograph with previous/next links.
- `/about` — photographer biography and portrait.
- `/contact` — email and Instagram links.
- Old `/series/*` URLs redirect to the exhibition.

Click a photograph to open the viewer. Use arrow keys or the navigation buttons to move between works and Escape to close. Focus returns to the selected photograph. Layouts adapt to mobile screens and honor reduced-motion preferences.
