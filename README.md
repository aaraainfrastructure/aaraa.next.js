# AARAA Infrastructure — Next.js migration

Complete migration of the supplied multi-page HTML site to the Next.js App Router while retaining all original `.html` URLs and visual assets.

## Run
```bash
npm install
npm run dev
```
For production: `npm run build && npm start`.

## Structure
- `app/[[...slug]]/page.js`: resolves every existing page URL through Next.js.
- `legacy-pages/`: 315 source HTML pages used by the route.
- `public/`: original CSS, JavaScript, images, fonts, videos, locales, and uploads.
- `legacy-backend/`: preserved Firebase/server code for separate deployment.

The compatibility component mounts original scripts in order, retaining jQuery, GSAP, Bootstrap, Swiper, Firebase forms, analytics, SEO metadata, and canonical links. Existing backend/API endpoints still require their original deployment and environment configuration.
