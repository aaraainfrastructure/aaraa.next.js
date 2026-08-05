const BRANDS = [
  {src: '/image/brand/brand-1.png', alt: 'Reliance Construction Partner'},
  {src: '/image/brand/brand-2.png', alt: 'Blue Star Infrastructure Client'},
  {src: '/image/brand/brand-3.png', alt: 'VIBGYOR Institutional Client'},
  {src: '/image/brand/brand-4.png', alt: 'Waaree Solar EPC Partner'},
  {src: '/image/brand/brand-5.png', alt: 'Continuum Green Energy Partner'},
  {src: '/image/brand/brand-6.png', alt: 'Saint-Gobain Industrial Partner'},
  {src: '/image/brand/brand-7.png', alt: 'SRM University Institutional Development'},
  {src: '/image/brand/brand-8.png', alt: 'L&T Construction Collaboration'},
  {src: '/image/brand/brand-9.png', alt: 'Commercial Real Estate Partner'},
  {src: '/image/brand/brand-10.png', alt: 'Logistics Park Developer'},
  {src: '/image/brand/brand-11.png', alt: 'Corporate Facilities Partner'},
  {src: '/image/brand/brand-12.png', alt: 'PEB Steel Supplier Partner'},
  {src: '/image/brand/brand-13.png', alt: 'Infrastructure Development Partner'},
  {src: '/image/brand/brand-14.png', alt: 'Energy Sector Partner'},
  {src: '/image/brand/brand-15.png', alt: 'Civil Engineering Partner'},
  {src: '/image/brand/brand-16.png', alt: 'Industrial Construction Partner'},
  {src: '/image/brand/brand-17.png', alt: 'Urban Development Partner'},
  {src: '/image/brand/brand-18.png', alt: 'Real Estate Development Partner'},
  {src: '/image/brand/brand-19.png', alt: 'Power Infrastructure Partner'},
  {src: '/image/brand/brand-20.png', alt: 'Smart City Infrastructure Partner'},
  {src: '/image/brand/brand-21.png', alt: 'Turnkey Project Partner'},
  {src: '/image/brand/brand-22.png', alt: 'Construction Technology Partner'},
];

// Rendered twice so translateX(-50%) loops seamlessly with no JS needed.
const TRACK_ITEMS = [...BRANDS, ...BRANDS];

export default function BrandMarquee() {
  return (
    <div className="aaraa-fixed-brand-bar" aria-label="Our trusted partners" role="region">
      <div className="aaraa-fixed-brand-track">
        {TRACK_ITEMS.map((b, i) => (
          <span className="aaraa-fixed-brand-item" key={`${b.src}-${i}`}>
            <img src={b.src} alt={b.alt} loading="lazy" />
          </span>
        ))}
      </div>
    </div>
  );
}
