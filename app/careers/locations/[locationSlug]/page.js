import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { VERIFIED_LOCATIONS } from '@/lib/careers-taxonomy';
import { getJobsByLocation } from '@/lib/careers-store';
import JobCard from '@/components/careers/JobCard';
import { BASE_URL } from '@/lib/careers-seo';

export async function generateMetadata({ params }) {
  const { locationSlug } = await params;
  const loc = VERIFIED_LOCATIONS.find(l => l.slug === locationSlug);
  if (!loc) return {};

  return {
    title: `Construction Jobs in ${loc.name}, ${loc.state} | AARAA Infrastructure Careers`,
    description: `Explore engineering, civil construction, PEB, and project management jobs at AARAA Infrastructure sites in ${loc.name}, ${loc.state}.`,
    alternates: { canonical: `${BASE_URL}/careers/locations/${loc.slug}` }
  };
}

export default async function LocationPage({ params }) {
  const { locationSlug } = await params;
  const loc = VERIFIED_LOCATIONS.find(l => l.slug === locationSlug);

  if (!loc) {
    notFound();
  }

  const jobs = await getJobsByLocation(locationSlug);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px', fontFamily: "'Montserrat', sans-serif" }}>
      <div style={{ marginBottom: '32px' }}>
        <span style={{ fontSize: '13px', fontWeight: '700', color: '#ed2f39', textTransform: 'uppercase', letterSpacing: '1px' }}>
          PROJECT & SITE LOCATIONS
        </span>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '8px 0 12px' }}>
          Construction Jobs in {loc.name}, {loc.state}
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.6', maxWidth: '750px' }}>
          AARAA Infrastructure executes major commercial, industrial PEB, renewable energy, and turnkey civil projects in {loc.name}. Explore active positions at our {loc.name} sites and regional offices.
        </p>
      </div>

      <section style={{ marginBottom: '48px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>
          Active Jobs in {loc.name} ({jobs.length})
        </h3>
        {jobs.length === 0 ? (
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '40px 24px', textAlign: 'center' }}>
            <p style={{ color: '#64748b', margin: '0 0 16px' }}>There are currently no active openings posted in {loc.name}.</p>
            <Link href="/careers/jobs" style={{ color: '#ed2f39', fontWeight: '700', textDecoration: 'none' }}>
              View All Construction Openings →
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {jobs.map(j => <JobCard key={j.id} job={j} />)}
          </div>
        )}
      </section>
    </div>
  );
}
