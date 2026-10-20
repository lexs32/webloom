import { PROJECTS, PROFILE } from './portfolio-data';

export const SITE_URL = 'https://portfolio-woad-three-61.vercel.app';
export const SEO_ROUTES = ['/', '/about', '/services', '/faq', '/contact', ...PROJECTS.map(project => `/work/${project.id}`)];
const pages: Record<string, [string, string]> = {
  '/': ['Webloom — Custom Website Design & SellAuth Development', 'Webloom is the independent web design studio of LexS. Explore custom gaming storefronts, SellAuth themes, responsive websites, and interactive product design.'],
  '/about': ['About LexS & Webloom — Web Designer and Developer', 'Meet LexS, the designer and developer behind Webloom. Discover the approach to custom storefronts, product experiences, and responsive web development.'],
  '/services': ['Web Design, Development & SellAuth Integration — Webloom', 'Custom website design, responsive development, SellAuth storefronts, and API integrations by Webloom. Explore services and discuss your next website with LexS.'],
  '/faq': ['Website Design FAQs — Pricing, Process & Integrations | Webloom', 'Find answers about Webloom website projects: design, custom storefronts, development, project preparation, and how to get started with LexS.'],
  '/contact': ['Contact Webloom — Start Your Website Project', 'Discuss your website with LexS at Webloom. Share your idea for a custom storefront, website redesign, or SellAuth theme by email or Discord.'],
};
export function getSeo(route: string) {
  const project = PROJECTS.find(project => route === `/work/${project.id}`);
  const [title, description] = project ? [`${project.name} — ${project.category} by Webloom`, project.description] : pages[route] || pages['/'];
  return { title, description, canonical: `${SITE_URL}${route === '/' ? '/' : route}`, known: SEO_ROUTES.includes(route) };
}
export function structuredData(route: string) {
  const seo = getSeo(route);
  const project = PROJECTS.find(project => route === `/work/${project.id}`);
  return { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Organization', '@id': `${SITE_URL}/#studio`, name: 'Webloom', url: SITE_URL, email: PROFILE.email, logo: `${SITE_URL}/assets/webloom/webloom-mark.png`, founder: { '@type': 'Person', name: 'LexS', jobTitle: 'Web Designer & Developer' } },
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'Webloom', url: SITE_URL, publisher: { '@id': `${SITE_URL}/#studio` }, inLanguage: 'en' },
    { '@type': project ? 'CreativeWork' : route === '/contact' ? 'ContactPage' : route === '/about' ? 'AboutPage' : 'WebPage', '@id': seo.canonical, url: seo.canonical, name: seo.title, description: seo.description, inLanguage: 'en', ...(project ? { creator: { '@id': `${SITE_URL}/#studio` }, image: `${SITE_URL}${project.image}` } : { isPartOf: { '@id': `${SITE_URL}/#website` } }) },
    ...(route === '/' ? [] : [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` }, { '@type': 'ListItem', position: 2, name: project?.name || route.slice(1), item: seo.canonical }] }]),
  ] };
}
export function applySeo(route: string) {
  const seo = getSeo(route);
  document.title = seo.title;
  for (const [selector, attribute, value] of [
    ['meta[name="description"]', 'content', seo.description],
    ['meta[property="og:title"]', 'content', seo.title],
    ['meta[property="og:description"]', 'content', seo.description],
    ['meta[property="og:url"]', 'content', seo.canonical],
    ['meta[name="twitter:title"]', 'content', seo.title],
    ['meta[name="twitter:description"]', 'content', seo.description],
    ['meta[name="robots"]', 'content', seo.known ? 'index, follow' : 'noindex, follow'],
    ['link[rel="canonical"]', 'href', seo.canonical],
  ]) document.querySelector(selector)?.setAttribute(attribute, value);
  const data = document.getElementById('structured-data');
  if (data) data.textContent = JSON.stringify(structuredData(route));
}
