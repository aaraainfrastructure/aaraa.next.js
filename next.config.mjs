/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingIncludes: { '/*': ['./legacy-pages/**/*'] },
  devIndicators: false,
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
      ]
    }];
  },
  async redirects() {
    return [
      { source: '/projects-details.html', destination: '/completed-projects', permanent: true },
      { source: '/projects-details', destination: '/completed-projects', permanent: true },
      { source: '/ongoingorchid-project.html', destination: '/project-details-orchid', permanent: true },
      { source: '/ongoingorchid-project', destination: '/project-details-orchid', permanent: true },
      { source: '/140-6-mw-wind-solar-hybrid-power-project', destination: '/140.6_MW_Capacity_Wind%E2%80%93Solar_Hybrid_Power_Project', permanent: true },
      { source: '/reliance-civil-interior-mep-fitout', destination: '/commercial', permanent: true },
      { source: '/blog/rmky-industrial-construction-dobbaspet-karnataka', destination: '/blog/ramky-industrial-construction-dobbaspet-karnataka', permanent: true },
      { source: '/blog/rmky-industrial-construction-dobbaspet-karnataka.html', destination: '/blog/ramky-industrial-construction-dobbaspet-karnataka', permanent: true },
      { source: '/rmky-industrial-construction-dobbaspet-karnataka', destination: '/blog/ramky-industrial-construction-dobbaspet-karnataka', permanent: true },
      { source: '/rmky-industrial-construction-dobbaspet-karnataka.html', destination: '/blog/ramky-industrial-construction-dobbaspet-karnataka', permanent: true },
      { source: '/ramky-industrial-construction-dobbaspet-karnataka', destination: '/blog/ramky-industrial-construction-dobbaspet-karnataka', permanent: true },
      { source: '/ramky-industrial-construction-dobbaspet-karnataka.html', destination: '/blog/ramky-industrial-construction-dobbaspet-karnataka', permanent: true },
      { source: '/Institutional-Development-VIBGYOR-Group-Hinjewadi-Pune.html', destination: '/blog/institutional-development-vibgyor-group-hinjewadi', permanent: true },
      { source: '/institutional-development-vibgyor-group-hinjewadi.html', destination: '/blog/institutional-development-vibgyor-group-hinjewadi', permanent: true },
      { source: '/contact.html', destination: '/contact-us', permanent: true },
      { source: '/contact', destination: '/contact-us', permanent: true },
      { source: '/privacy-policy', destination: '/aaraa-privacy-policy', permanent: true },
      { source: '/about-us.html', destination: '/about', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/our-services.html', destination: '/services', permanent: true },
      { source: '/our-services', destination: '/services', permanent: true },
      { source: '/careers.html', destination: '/careers', permanent: true },
      { source: '/leadership.html', destination: '/about', permanent: true },
      { source: '/leadership-details.html', destination: '/about', permanent: true },
      { source: '/epc-contractor-chennai', destination: '/construction/epc-contractor-chennai', permanent: true },
      { source: '/peb-company-chennai', destination: '/construction/peb-company-chennai', permanent: true },
      { source: '/solar-epc-company-chennai', destination: '/construction/solar-epc-company-chennai', permanent: true },
      { source: '/mep-contractor-chennai', destination: '/construction/mep-contractor-chennai', permanent: true },
      { source: '/steel-structure-contractor-chennai', destination: '/construction/steel-structure-contractor-chennai', permanent: true },
      { source: '/warehouse-construction-chennai', destination: '/construction/warehouse-construction-chennai', permanent: true },
      { source: '/industrial-construction-chennai', destination: '/construction/industrial-construction-chennai', permanent: true },
      { source: '/institutional-construction-chennai', destination: '/construction/institutional-construction-chennai', permanent: true },
      { source: '/infrastructure-construction-chennai', destination: '/construction/infrastructure-construction-chennai', permanent: true },
      { source: '/interior-fit-out-contractor-chennai', destination: '/construction/interior-fit-out-contractor-chennai', permanent: true },
      { source: '/renovation-contractor-chennai', destination: '/construction/renovation-contractor-chennai', permanent: true },
      { source: '/commercial-construction-chennai', destination: '/construction/commercial-construction-chennai', permanent: true },
      { source: '/renewable-energy-contractor-chennai', destination: '/construction/renewable-energy-contractor-chennai', permanent: true },
      { source: '/home-2.html', destination: '/', permanent: true },
      { source: '/home-3.html', destination: '/', permanent: true },
      { source: '/home-4.html', destination: '/', permanent: true },
      { source: '/home-5.html', destination: '/', permanent: true },
      { source: '/why-choose-us.html', destination: '/about', permanent: true },
      { source: '/core-values.html', destination: '/about', permanent: true },
      { source: '/what-we-do.html', destination: '/services', permanent: true },
      { source: '/what-we-do-detail.html', destination: '/services', permanent: true },
      { source: '/working-process.html', destination: '/about', permanent: true },
      { source: '/testimonials.html', destination: '/about', permanent: true },
      { source: '/pricing.html', destination: '/contact-us', permanent: true },
      { source: '/shop.html', destination: '/', permanent: true },
      { source: '/shop-detail.html', destination: '/', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/:path*.html', destination: '/:path*', permanent: true }
    ];
  }
};

export default nextConfig;
