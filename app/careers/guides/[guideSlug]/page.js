import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BASE_URL } from '@/lib/careers-seo';

const GUIDES_DATA = [
  {
    slug: "how-to-become-a-civil-site-engineer",
    title: "How to Become a Successful Civil Site Engineer in India",
    category: "Career Roadmap",
    readTime: "6 min read",
    summary: "Essential guide covering required technical skills, IS code knowledge, site safety compliance, and career progression for civil engineers.",
    content: `
      Becoming a successful Civil Site Engineer requires a strong foundation in structural drawings, concrete technology, quality assurance, and manpower management.

      ### 1. Key Technical Skills Required
      - **Drawing Interpretation:** Ability to read structural (RCC), architectural, and MEP layout drawings.
      - **Site Surveying:** Leveling using Auto-level, Total Station, and setting out coordinates.
      - **Bar Bending Schedules (BBS):** Calculating steel reinforcement cut lengths according to IS 2502.
      - **Concrete Mix Quality:** Testing slump, cube compressive strength (IS 516), and curing protocols.

      ### 2. Daily Site Responsibilities
      Site engineers ensure work progresses in accordance with the project schedule while maintaining strict safety standards. You will prepare Daily Progress Reports (DPR), coordinate material deliveries, and certify joint measurement sheets.

      ### 3. Career Growth Trajectory
      - Junior Site Engineer (0-2 Yrs)
      - Civil Site Engineer (2-5 Yrs)
      - Assistant Project Manager (5-8 Yrs)
      - Construction Project Manager (8+ Yrs)
    `
  },
  {
    slug: "quantity-surveyor-career-path",
    title: "The Quantity Surveyor & Billing Engineer Career Guide",
    category: "Specialized Roles",
    readTime: "7 min read",
    summary: "Detailed overview of cost management, RA billing, variation claims, and contractor bill certification in commercial & PEB construction.",
    content: `
      Quantity Surveying (QS) is one of the most vital functions in construction management. A Quantity Surveyor ensures projects are completed within budget and BOQ parameters.

      ### Key Functions of a Quantity Surveyor:
      - Bill of Quantities (BOQ) preparation & verification.
      - Running Account (RA) Billing for clients and certifying subcontractor invoices.
      - Rate Analysis for Extra Items & Variations.
      - Material Reconciliation & Wastage Control.
    `
  }
];

export async function generateMetadata({ params }) {
  const { guideSlug } = await params;
  const guide = GUIDES_DATA.find(g => g.slug === guideSlug);
  if (!guide) return {};

  return {
    title: `${guide.title} | AARAA Career Guides`,
    description: guide.summary,
    alternates: { canonical: `${BASE_URL}/careers/guides/${guide.slug}` }
  };
}

export default async function CareerGuidePage({ params }) {
  const { guideSlug } = await params;
  const guide = GUIDES_DATA.find(g => g.slug === guideSlug);

  if (!guide) {
    notFound();
  }

  return (
    <article style={{ maxWidth: '850px', margin: '0 auto', padding: '40px 20px', fontFamily: "'Montserrat', sans-serif" }}>
      <nav style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
        <Link href="/careers" style={{ color: '#64748b', textDecoration: 'none' }}>Careers</Link> / 
        <span style={{ color: '#0f172a', fontWeight: '700', marginLeft: '6px' }}>Guides</span>
      </nav>

      <span style={{ background: '#fef2f2', color: '#ed2f39', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>
        {guide.category} • {guide.readTime}
      </span>

      <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '16px 0 12px', lineHeight: '1.3' }}>
        {guide.title}
      </h1>

      <p style={{ fontSize: '17px', color: '#475569', lineHeight: '1.6', margin: '0 0 32px', fontStyle: 'italic' }}>
        {guide.summary}
      </p>

      <div style={{ color: '#334155', fontSize: '16px', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
        {guide.content}
      </div>

      <div style={{ marginTop: '48px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px' }}>Ready to Apply Your Skills?</h3>
        <p style={{ color: '#64748b', margin: '0 0 20px' }}>Explore active engineering positions at AARAA Infrastructure sites across India.</p>
        <Link href="/careers/jobs" style={{ display: 'inline-block', background: '#ed2f39', color: '#fff', padding: '12px 28px', borderRadius: '25px', textDecoration: 'none', fontWeight: '700' }}>
          Explore Open Positions →
        </Link>
      </div>
    </article>
  );
}
