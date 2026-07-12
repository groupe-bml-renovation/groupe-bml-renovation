import puppeteer from 'puppeteer';
import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DIST_DIR = path.resolve(__dirname, '../dist');

// The routes we want to prerender for SEO
const ROUTES = [
  '/',
  '/entreprise-generale-batiment',
  '/entreprise-construction',
  '/maisons-et-villas',
  '/appartements',
  '/contact',
  '/grenoble',
  '/grenoble/entreprise-generale-batiment',
  '/grenoble/entreprise-construction',
  '/grenoble/maisons-et-villas',
  '/grenoble/appartements',
  '/grenoble/contact',
  '/grenoble/salles-de-bain',
  '/grenoble/salles-de-bain-pmr',
  '/grenoble/renovation-sejour',
  '/grenoble/cuisines',
  '/grenoble/salons'
];

async function startServer() {
  const app = express();
  
  // Serve static files from dist
  app.use(express.static(DIST_DIR));
  
  // SPA fallback
  app.use((req, res) => {
    res.sendFile(path.resolve(DIST_DIR, 'index.html'));
  });

  return new Promise((resolve) => {
    const server = app.listen(PORT, () => {
      console.log(`Local server started on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function prerender() {
  console.log('Starting prerendering process...');
  const server = await startServer();
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  for (const route of ROUTES) {
    console.log(`Prerendering route: ${route}`);
    try {
      // Go to the local URL
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0' });

      // Wait a bit just to be absolutely sure React and Helmet have updated the DOM
      await new Promise(r => setTimeout(r, 1000));

      // Get the full HTML
      const html = await page.content();

      // Create the directory if it doesn't exist
      // e.g. for /grenoble/maisons-et-villas, dir is dist/grenoble/maisons-et-villas
      const routePath = route === '/' ? '' : route;
      const targetDir = path.join(DIST_DIR, routePath);
      
      await fs.mkdir(targetDir, { recursive: true });

      // Save the HTML to index.html in that directory
      const filePath = path.join(targetDir, 'index.html');
      await fs.writeFile(filePath, html);
      console.log(`Saved ${filePath}`);
    } catch (err) {
      console.error(`Error prerendering ${route}:`, err);
    }
  }

  await browser.close();
  server.close();
  console.log('Prerendering complete!');
}

prerender().catch(console.error);
