import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// تعريف __dirname في ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://snc.cash';

const routes = [
  '/',
  '/SignUp',
  '/SignIn',
  '/ForgotPassword',
  '/Home',
  '/Home/silver',
  '/Home/gold',
  '/Home/vip',
  '/Office',
  '/Categories',
  // '/Categories/finance',
  '/Product',
  '/basket',
  '/Events',
  '/allEvents',
  // '/allEvents/tech-event',
  '/Profile',
  '/WhoUs',
  '/News',
  '/noInternet',
  '/NotFound',
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route === '/' || route === '/Home' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap, 'utf8');

console.log('✅ Sitemap generated at public/sitemap.xml');
