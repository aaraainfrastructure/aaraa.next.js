import React from 'react';

const brands = [
  { id: 1, name: 'Reliance Construction Partner', src: '/image/brand/brand-1.png' },
  { id: 2, name: 'Blue Star Infrastructure Client', src: '/image/brand/brand-2.png' },
  { id: 3, name: 'VIBGYOR Institutional Client', src: '/image/brand/brand-3.png' },
  { id: 4, name: 'Waaree Solar EPC Partner', src: '/image/brand/brand-4.png' },
  { id: 5, name: 'Continuum Green Energy Partner', src: '/image/brand/brand-5.png' },
  { id: 6, name: 'Saint-Gobain Industrial Partner', src: '/image/brand/brand-6.png' },
  { id: 7, name: 'SRM University Institutional Development', src: '/image/brand/brand-7.png' },
  { id: 8, name: 'L&T Construction Collaboration', src: '/image/brand/brand-8.png' },
  { id: 9, name: 'Commercial Real Estate Partner', src: '/image/brand/brand-9.png' },
  { id: 10, name: 'Logistics Park Developer', src: '/image/brand/brand-10.png' },
  { id: 11, name: 'Corporate Facilities Partner', src: '/image/brand/brand-11.png' },
  { id: 12, name: 'PEB Steel Supplier Partner', src: '/image/brand/brand-12.png' },
  { id: 13, name: 'Infrastructure Development Partner', src: '/image/brand/brand-13.png' },
  { id: 14, name: 'Energy Sector Partner', src: '/image/brand/brand-14.png' },
  { id: 15, name: 'Civil Engineering Partner', src: '/image/brand/brand-15.png' },
  { id: 16, name: 'Industrial Construction Partner', src: '/image/brand/brand-16.png' },
  { id: 17, name: 'Urban Development Partner', src: '/image/brand/brand-17.png' },
  { id: 18, name: 'Real Estate Development Partner', src: '/image/brand/brand-18.png' },
  { id: 19, name: 'Power Infrastructure Partner', src: '/image/brand/brand-19.png' },
  { id: 20, name: 'Smart City Infrastructure Partner', src: '/image/brand/brand-20.png' },
  { id: 21, name: 'Turnkey Project Partner', src: '/image/brand/brand-21.png' },
  { id: 22, name: 'Construction Technology Partner', src: '/image/brand/brand-22.png' },
];

export default function BrandMarquee() {
  // We double the list of brands to make it seamless
  const allBrands = [...brands, ...brands];

  return (
    <div className="tf-marquee wg-brand mt-66 mb-2" aria-label="Our trusted partners" role="region">
      <div className="marquee-wrapper seamless-marquee">
        <div className="marquee-track" id="marquee-track-partners">
          {allBrands.map((brand, idx) => (
            <div key={`${brand.id}-${idx}`} className="marquee-child-item">
              <span className="brand-item">
                <img loading="lazy" src={brand.src} alt={brand.name} />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="line-marquee h-2 tf-aniamtion-line line-animation"></div>
    </div>
  );
}
