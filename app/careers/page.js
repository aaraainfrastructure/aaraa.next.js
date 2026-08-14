import React from 'react';
import Link from 'next/link';
import CareerHero from '@/components/careers/CareerHero';
import JobCard from '@/components/careers/JobCard';
import { getPublishedJobs } from '@/lib/careers-store';
import { DEPARTMENTS, VERIFIED_LOCATIONS } from '@/lib/careers-taxonomy';
import { BASE_URL } from '@/lib/careers-seo';

export const metadata = {
  title: 'Build Your Career Where Infrastructure Happens | AARAA Infrastructure Careers',
  description: 'Join AARAA Infrastructure. Explore construction jobs, civil engineering vacancies, site engineering roles, freshers opportunities, and internships across India.',
  alternates: {
    canonical: `${BASE_URL}/careers`
  },
  openGraph: {
    title: 'AARAA Infrastructure Careers – Engineering & Construction Jobs',
    description: 'Work on real-world civil, industrial, infrastructure, PEB, and solar EPC projects across India.',
    url: `${BASE_URL}/careers`,
    siteName: 'AARAA Infrastructure',
    images: [{ url: `${BASE_URL}/logo.png`, width: 1200, height: 630 }]
  }
};

export default async function CareersPage() {
  const jobs = await getPublishedJobs();
  const featuredJobs = jobs.filter(j => j.featured).slice(0, 4);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: "'Montserrat', sans-serif" }}>
      {/* Hero Section */}
      <CareerHero />

      {/* Stats Counter */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '60px', textAlign: 'center' }}>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#ed2f39' }}>14+</div>
          <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', marginTop: '4px' }}>Years of Engineering Excellence</div>
        </div>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#ed2f39' }}>100+</div>
          <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', marginTop: '4px' }}>Projects Delivered Nationwide</div>
        </div>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#ed2f39' }}>20+</div>
          <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', marginTop: '4px' }}>Operating Cities & Sites</div>
        </div>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#ed2f39' }}>100%</div>
          <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', marginTop: '4px' }}>Commitment to Safety & Quality</div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>Featured Opportunities</h2>
            <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>Explore active vacancies in civil, MEP, planning, and quantity surveying.</p>
          </div>
          <Link href="/careers/jobs" style={{ color: '#ed2f39', fontWeight: '700', textDecoration: 'none', fontSize: '15px' }}>
            View All Openings ({jobs.length}) →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {featuredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* Departments Grid */}
      <section id="departments" style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 12px', textAlign: 'center' }}>
          Engineering & Operations Disciplines
        </h2>
        <p style={{ color: '#64748b', fontSize: '15px', textAlign: 'center', margin: '0 0 36px', maxWidth: '650px', marginLeft: 'auto', marginRight: 'auto' }}>
          We offer diverse career tracks across heavy civil engineering, industrial PEB, renewables, and specialized project controls.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
          {DEPARTMENTS.slice(0, 12).map((dept, idx) => (
            <div key={idx} style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏗️</div>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: '0 0 6px' }}>{dept}</h4>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Site Execution, Quality & Delivery</p>
            </div>
          ))}
        </div>
      </section>

      {/* Freshers & Internships Banner */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '60px' }}>
        <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: '#fff', padding: '36px', borderRadius: '20px' }}>
          <span style={{ background: '#ed2f39', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>FRESHERS HUB</span>
          <h3 style={{ fontSize: '24px', fontWeight: '800', margin: '16px 0 10px' }}>Graduate Engineer Trainees</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', margin: '0 0 24px' }}>
            Kickstart your construction career with structured hands-on site exposure, mentorship, and accelerated growth at AARAA.
          </p>
          <Link href="/careers/freshers" style={{ display: 'inline-block', background: '#ffffff', color: '#0f172a', padding: '10px 24px', borderRadius: '25px', fontWeight: '700', textDecoration: 'none', fontSize: '14px' }}>
            Explore Freshers Program →
          </Link>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #ed2f39 0%, #b91c1c 100%)', color: '#fff', padding: '36px', borderRadius: '20px' }}>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>INTERNSHIPS</span>
          <h3 style={{ fontSize: '24px', fontWeight: '800', margin: '16px 0 10px' }}>Civil & Technical Internships</h3>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', lineHeight: '1.6', margin: '0 0 24px' }}>
            Gain real project exposure in site execution, quantity surveying, PEB detailing, and MEP engineering.
          </p>
          <Link href="/careers/internships" style={{ display: 'inline-block', background: '#ffffff', color: '#b91c1c', padding: '10px 24px', borderRadius: '25px', fontWeight: '700', textDecoration: 'none', fontSize: '14px' }}>
            Apply for Internship →
          </Link>
        </div>
      </section>

      {/* Verified Locations */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 12px', textAlign: 'center' }}>
          Project & Office Locations
        </h2>
        <p style={{ color: '#64748b', fontSize: '15px', textAlign: 'center', margin: '0 0 32px' }}>
          Real site opportunities in major infrastructure and industrial hubs across India.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {VERIFIED_LOCATIONS.map((loc) => (
            <Link key={loc.slug} href={`/careers/locations/${loc.slug}`} style={{
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '25px',
              padding: '10px 24px',
              color: '#334155',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              📍 {loc.name}, {loc.state}
            </Link>
          ))}
        </div>
      </section>

      {/* Recruitment Process */}
      <section style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '40px 32px', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '0 0 28px', textAlign: 'center' }}>
          Our Recruitment Process
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', textAlign: 'center' }}>
          <div>
            <div style={{ width: '48px', height: '48px', background: '#ed2f39', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px', margin: '0 auto 12px' }}>1</div>
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: '0 0 6px' }}>Online Application</h4>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Submit your details & resume through our secure application engine.</p>
          </div>
          <div>
            <div style={{ width: '48px', height: '48px', background: '#ed2f39', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px', margin: '0 auto 12px' }}>2</div>
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: '0 0 6px' }}>Technical Screening</h4>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Evaluation of domain skills, site experience, and qualification alignment.</p>
          </div>
          <div>
            <div style={{ width: '48px', height: '48px', background: '#ed2f39', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px', margin: '0 auto 12px' }}>3</div>
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: '0 0 6px' }}>Interview Round</h4>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>In-depth technical and project management discussion with senior leaders.</p>
          </div>
          <div>
            <div style={{ width: '48px', height: '48px', background: '#ed2f39', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px', margin: '0 auto 12px' }}>4</div>
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: '0 0 6px' }}>Onboarding</h4>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Formal offer, site allocation, and introduction to Team AARAA.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
