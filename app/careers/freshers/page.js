import React from 'react';
import Link from 'next/link';
import { getPublishedJobs } from '@/lib/careers-store';
import JobCard from '@/components/careers/JobCard';
import { BASE_URL } from '@/lib/careers-seo';

export const metadata = {
  title: 'Civil Engineering Jobs for Freshers & Graduate Trainees | AARAA Infrastructure',
  description: 'Apply for Graduate Engineer Trainee (GET) and Junior Civil Engineer roles at AARAA Infrastructure. Structured site training, mentorship, and career progression.',
  alternates: { canonical: `${BASE_URL}/careers/freshers` }
};

export default async function FreshersPage() {
  const jobs = await getPublishedJobs();
  const fresherJobs = jobs.filter(j => j.experience_min <= 1);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px', fontFamily: "'Montserrat', sans-serif" }}>
      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff', padding: '48px 36px', borderRadius: '24px', marginBottom: '48px' }}>
        <span style={{ background: '#ed2f39', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>FRESHERS & TRAINEES</span>
        <h1 style={{ fontSize: '36px', fontWeight: '800', margin: '16px 0 12px' }}>
          Graduate Engineer Trainee Program
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '17px', lineHeight: '1.6', maxWidth: '750px', margin: '0 0 24px' }}>
          Start your construction engineering career with AARAA Infrastructure. Our GET program delivers immersive site experience across structural execution, quantity surveying, PEB installations, and solar EPC projects.
        </p>
        <Link href="/careers/jobs" style={{ display: 'inline-block', background: '#ed2f39', color: '#fff', padding: '12px 28px', borderRadius: '25px', textDecoration: 'none', fontWeight: '700' }}>
          View Entry-Level Openings →
        </Link>
      </div>

      {/* Program Highlights */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', marginBottom: '24px', textAlign: 'center' }}>
          Why Start Your Career at AARAA?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🏗️</div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px' }}>Real Site Exposure</h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Work on active commercial buildings, PEB industrial structures, and solar EPC developments from Day 1.
            </p>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>👨‍🏫</div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px' }}>Senior Mentorship</h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Learn directly from veteran Project Managers, Senior Quantity Surveyors, and Technical Directors.
            </p>
          </div>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📈</div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px' }}>Fast-Track Growth</h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Transparent career progression from Trainee to Site Engineer and Planning Specialist within 24 months.
            </p>
          </div>
        </div>
      </section>

      {/* Freshers Jobs */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', marginBottom: '24px' }}>
          Entry-Level Opportunities ({fresherJobs.length})
        </h2>
        {fresherJobs.length === 0 ? (
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '40px 24px', textAlign: 'center' }}>
            <p style={{ color: '#64748b', margin: '0 0 16px' }}>No specific fresher vacancies are open today, but you can submit your application for upcoming GET batches.</p>
            <Link href="/careers/jobs" style={{ color: '#ed2f39', fontWeight: '700', textDecoration: 'none' }}>
              Explore All Construction Jobs →
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {fresherJobs.map(j => <JobCard key={j.id} job={j} />)}
          </div>
        )}
      </section>
    </div>
  );
}
