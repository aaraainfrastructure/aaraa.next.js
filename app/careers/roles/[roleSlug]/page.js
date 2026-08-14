import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CORE_ROLES } from '@/lib/careers-taxonomy';
import { getJobsByRole } from '@/lib/careers-store';
import JobCard from '@/components/careers/JobCard';
import { BASE_URL } from '@/lib/careers-seo';

export async function generateMetadata({ params }) {
  const { roleSlug } = await params;
  const role = CORE_ROLES.find(r => r.slug === roleSlug);
  if (!role) return {};

  return {
    title: `${role.title} Jobs | AARAA Infrastructure Careers`,
    description: `Explore ${role.title} career opportunities, site responsibilities, required qualifications, and active vacancies at AARAA Infrastructure Pvt. Ltd.`,
    alternates: { canonical: `${BASE_URL}/careers/roles/${role.slug}` }
  };
}

export default async function RolePage({ params }) {
  const { roleSlug } = await params;
  const role = CORE_ROLES.find(r => r.slug === roleSlug);

  if (!role) {
    notFound();
  }

  const jobs = await getJobsByRole(roleSlug);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px', fontFamily: "'Montserrat', sans-serif" }}>
      <div style={{ marginBottom: '32px' }}>
        <span style={{ fontSize: '13px', fontWeight: '700', color: '#ed2f39', textTransform: 'uppercase', letterSpacing: '1px' }}>
          CAREER PATHWAYS AT AARAA
        </span>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '8px 0 12px' }}>
          {role.title} Careers & Opportunities
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.6', maxWidth: '750px' }}>
          {role.title}s at AARAA Infrastructure play a vital role in structural execution, site coordination, quality assurance, and project delivery across commercial, industrial, and renewable energy sites.
        </p>
      </div>

      {/* Active Vacancies Section */}
      <section style={{ marginBottom: '48px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>
          Current {role.title} Openings ({jobs.length})
        </h3>
        {jobs.length === 0 ? (
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '40px 24px', textAlign: 'center' }}>
            <p style={{ color: '#64748b', margin: '0 0 16px' }}>There are currently no active openings for {role.title}.</p>
            <Link href="/careers/jobs" style={{ color: '#ed2f39', fontWeight: '700', textDecoration: 'none' }}>
              View All Open Construction Jobs →
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
