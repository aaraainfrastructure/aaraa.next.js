import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CORE_ROLES, VERIFIED_LOCATIONS } from '@/lib/careers-taxonomy';
import { getJobsByRole } from '@/lib/careers-store';
import JobCard from '@/components/careers/JobCard';
import { BASE_URL, shouldIndex } from '@/lib/careers-seo';

export async function generateMetadata({ params }) {
  const { roleSlug, locationSlug } = await params;
  const role = CORE_ROLES.find(r => r.slug === roleSlug);
  const loc = VERIFIED_LOCATIONS.find(l => l.slug === locationSlug);

  if (!role || !loc) return {};

  const allRoleJobs = await getJobsByRole(roleSlug);
  const activeJobs = allRoleJobs.filter(j => j.location.toLowerCase() === loc.name.toLowerCase());

  const isIndexable = shouldIndex('ROLE_LOCATION', { activeJobsCount: activeJobs.length });

  return {
    title: `${role.title} Jobs in ${loc.name} | AARAA Infrastructure`,
    description: `Apply for ${role.title} positions at AARAA Infrastructure in ${loc.name}, ${loc.state}. View requirements, responsibilities, and site opportunities.`,
    robots: {
      index: isIndexable,
      follow: true
    },
    alternates: {
      canonical: `${BASE_URL}/careers/roles/${role.slug}/${loc.slug}`
    }
  };
}

export default async function RoleLocationPage({ params }) {
  const { roleSlug, locationSlug } = await params;
  const role = CORE_ROLES.find(r => r.slug === roleSlug);
  const loc = VERIFIED_LOCATIONS.find(l => l.slug === locationSlug);

  if (!role || !loc) {
    notFound();
  }

  const allRoleJobs = await getJobsByRole(roleSlug);
  const jobs = allRoleJobs.filter(j => j.location.toLowerCase() === loc.name.toLowerCase());

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px', fontFamily: "'Montserrat', sans-serif" }}>
      <div style={{ marginBottom: '32px' }}>
        <nav style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
          <Link href="/careers" style={{ color: '#64748b', textDecoration: 'none' }}>Careers</Link> / 
          <Link href={`/careers/roles/${role.slug}`} style={{ color: '#64748b', textDecoration: 'none', marginLeft: '6px' }}>{role.title}</Link> / 
          <span style={{ color: '#0f172a', fontWeight: '700', marginLeft: '6px' }}>{loc.name}</span>
        </nav>

        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '0 0 12px' }}>
          {role.title} Jobs in {loc.name}, {loc.state}
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.6', maxWidth: '750px' }}>
          Explore opportunities for {role.title}s at AARAA Infrastructure projects in {loc.name}. Work on turnkey civil, industrial PEB, and commercial building developments.
        </p>
      </div>

      <section style={{ marginBottom: '48px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>
          Available Openings ({jobs.length})
        </h3>
        {jobs.length === 0 ? (
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '40px 24px', textAlign: 'center' }}>
            <p style={{ color: '#64748b', margin: '0 0 16px' }}>There are currently no active {role.title} openings in {loc.name}.</p>
            <Link href="/careers/jobs" style={{ color: '#ed2f39', fontWeight: '700', textDecoration: 'none' }}>
              Explore All Active Construction Jobs →
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
