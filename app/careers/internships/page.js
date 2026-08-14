import React from 'react';
import Link from 'next/link';
import { BASE_URL } from '@/lib/careers-seo';

export const metadata = {
  title: 'Civil Engineering & Construction Internships | AARAA Infrastructure',
  description: 'Apply for civil engineering, site execution, quantity surveying, and MEP internships at AARAA Infrastructure. Practical site exposure and project experience.',
  alternates: { canonical: `${BASE_URL}/careers/internships` }
};

export default function InternshipsPage() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px', fontFamily: "'Montserrat', sans-serif" }}>
      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg, #ed2f39 0%, #991b1b 100%)', color: '#fff', padding: '48px 36px', borderRadius: '24px', marginBottom: '48px' }}>
        <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>INTERNSHIP PROGRAM</span>
        <h1 style={{ fontSize: '36px', fontWeight: '800', margin: '16px 0 12px' }}>
          Construction & Engineering Internships
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '17px', lineHeight: '1.6', maxWidth: '750px', margin: '0 0 24px' }}>
          Gain hands-on industry training on active EPC, PEB, commercial construction, and solar infrastructure project sites in Chennai, Bengaluru, and Pune.
        </p>
        <Link href="/careers/jobs" style={{ display: 'inline-block', background: '#ffffff', color: '#991b1b', padding: '12px 28px', borderRadius: '25px', textDecoration: 'none', fontWeight: '700' }}>
          Apply For Internship →
        </Link>
      </div>

      {/* Internship Tracks */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', marginBottom: '24px', textAlign: 'center' }}>
          Available Internship Disciplines
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px' }}>Civil Site Execution</h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px' }}>
              Learn shuttering, reinforcement inspection, concrete pour management, and drawing interpretation on live construction sites.
            </p>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#ed2f39' }}>Duration: 1 to 6 Months</span>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px' }}>Quantity Surveying & Estimation</h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px' }}>
              Gain hands-on skills in joint measurement, BOQ verification, material reconciliation, and rate analysis.
            </p>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#ed2f39' }}>Duration: 2 to 6 Months</span>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px' }}>Solar EPC & Renewable Engineering</h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px' }}>
              Understand solar module mounting structures, inverter station civil works, and grid connectivity.
            </p>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#ed2f39' }}>Duration: 1 to 3 Months</span>
          </div>
        </div>
      </section>
    </div>
  );
}
