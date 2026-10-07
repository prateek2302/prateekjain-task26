# Elsewhere — Destination Cards

A responsive React page that presents a curated collection of stays in reusable, gradient-bordered cards.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build, run `npm run build`.
The submission archive excludes `node_modules`; run `npm install` before starting the app.

## Deploy to GitHub Pages

The project is configured for the GitHub Pages URL at
`https://prateek2302.github.io/prateekjain-task26/`. Push changes to `main` to
trigger the workflow in `.github/workflows/deploy.yml`. In the repository's
Settings → Pages, select **GitHub Actions** as the build and deployment source.

## Component structure

- `DestinationCard` receives a destination object, saved state, and a save handler as props.
- `DestinationGallery` receives an array of destination objects and renders one card per item.
- `App` owns the destination data and state for region filters and saved stays.

Each destination object contains the copy, region, rating, duration, price, image URL, and accessible image description used by its card. To add or update a card, edit the `destinations` array in `src/App.jsx`.

## Design decisions

- Used a travel-discovery theme to give the reusable card a clear, realistic content example.
- Added a thin multicolor gradient around each card, keeping the card's image and details readable against a warm neutral page.
- Included responsive layouts, region filters, save buttons, keyboard focus states, and reduced-motion support to make the page comfortable to browse.
- Destination photography is loaded from Unsplash; an internet connection is needed to display those images.
