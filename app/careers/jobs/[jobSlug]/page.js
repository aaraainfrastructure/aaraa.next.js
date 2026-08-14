import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJobBySlug, getPublishedJobs } from '@/lib/careers-store';
import { generateJobMetadata } from '@/lib/careers-seo';
import JobPostingSchema from '@/components/careers/JobPostingSchema';
import JobCard from '@/components/careers/JobCard';

export async function generateMetadata({ params }) {
  const { jobSlug } = await params;
  const job = await getJobBySlug(jobSlug);
  return generateJobMetadata(job);
}

export default async function JobDetailPage({ params }) {
  const { jobSlug } = await params;
  const job = await getJobBySlug(jobSlug);

  if (!job) {
    notFound();
  }

  const allJobs = await getPublishedJobs();
  const similarJobs = allJobs.filter(j => j.slug !== job.slug && (j.department === job.department || j.location === job.location)).slice(0, 3);

  const isClosedOrExpired = job.status === 'CLOSED' || job.status === 'EXPIRED' || (job.valid_through && new Date(job.valid_through) < new Date());

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' },
    { name: 'Jobs', url: '/careers/jobs' },
    { name: job.title, url: `/careers/jobs/${job.slug}` }
  ];

  return (
    <>
      <JobPostingSchema job={job} breadcrumbs={breadcrumbs} />

      <article style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', fontFamily: "'Montserrat', sans-serif" }}>
        {/* Breadcrumb Navigation */}
        <nav style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
          {breadcrumbs.map((item, idx) => (
            <span key={idx}>
              <Link href={item.url} style={{ color: idx === breadcrumbs.length - 1 ? '#0f172a' : '#64748b', textDecoration: 'none', fontWeight: idx === breadcrumbs.length - 1 ? '700' : '500' }}>
                {item.name}
              </Link>
              {idx < breadcrumbs.length - 1 && <span style={{ margin: '0 8px' }}>/</span>}
            </span>
          ))}
        </nav>

        {/* Closed/Expired Notice Banner */}
        {isClosedOrExpired && (
          <div style={{ background: '#fffbe6', border: '1px solid #ffe58f', borderRadius: '12px', padding: '16px 24px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>⚠️</span>
            <div>
              <h4 style={{ margin: '0 0 4px', fontSize: '16px', color: '#873800', fontWeight: '700' }}>Position Closed</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#612500' }}>
                Applications for this specific opening are currently closed. Please explore our active vacancies below.
              </p>
            </div>
          </div>
        )}

        {/* Header Block */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '36px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', marginBottom: '40px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ background: '#fef2f2', color: '#ed2f39', fontWeight: '700', fontSize: '12px', padding: '4px 12px', borderRadius: '20px' }}>
              {job.job_code}
            </span>
            <span style={{ background: '#f1f5f9', color: '#475569', fontWeight: '600', fontSize: '12px', padding: '4px 12px', borderRadius: '20px' }}>
              {job.department}
            </span>
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '0 0 16px', lineHeight: '1.2' }}>
            {job.title}
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', color: '#475569', fontSize: '14px', fontWeight: '600', margin: '0 0 24px' }}>
            <span>📍 Location: {job.location}, {job.state}</span>
            <span>•</span>
            <span>⏱️ Experience: {job.experience_min}-{job.experience_max} Years</span>
            <span>•</span>
            <span>💼 Type: {job.employment_type || 'Full-time'}</span>
            {job.salary_min && (
              <>
                <span>•</span>
                <span>💰 CTC Range: ₹{(job.salary_min / 100000).toFixed(1)}L - ₹{(job.salary_max / 100000).toFixed(1)}L P.A.</span>
              </>
            )}
          </div>

          {!isClosedOrExpired && (
            <Link href="/careers/jobs" style={{ display: 'inline-block', background: '#ed2f39', color: '#fff', padding: '12px 32px', borderRadius: '25px', textDecoration: 'none', fontWeight: '700', fontSize: '15px' }}>
              Apply For Position →
            </Link>
          )}
        </div>

        {/* Content Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '36px' }}>
          {/* About & Role */}
          <section>
            <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>Role Overview</h3>
            <p style={{ color: '#334155', fontSize: '16px', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
              {job.description}
            </p>
          </section>

          {/* Key Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <section>
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>Key Responsibilities</h3>
              <ul style={{ color: '#334155', fontSize: '15px', lineHeight: '1.7', paddingLeft: '20px' }}>
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{resp}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Requirements & Qualification */}
          {job.requirements && job.requirements.length > 0 && (
            <section>
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>Qualifications & Skill Requirements</h3>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                <strong>Educational Qualification:</strong> {job.qualification}
              </div>
              <ul style={{ color: '#334155', fontSize: '15px', lineHeight: '1.7', paddingLeft: '20px' }}>
                {job.requirements.map((req, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{req}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <section>
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>Benefits & Offerings</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {job.benefits.map((b, idx) => (
                  <span key={idx} style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                    ✓ {b}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Similar Opportunities */}
        {similarJobs.length > 0 && (
          <section style={{ marginTop: '60px', borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '24px' }}>
              Similar Construction Opportunities
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {similarJobs.map(sj => (
                <JobCard key={sj.id} job={sj} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
