import React from 'react';
import Link from 'next/link';

export default function JobCard({ job, onApply }) {
  if (!job) return null;

  const isClosedOrExpired = job.status === 'CLOSED' || job.status === 'EXPIRED' || (job.valid_through && new Date(job.valid_through) < new Date());

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '16px',
      padding: '24px',
      transition: 'all 0.2s ease-in-out',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative'
    }}>
      <div>
        {/* Badges */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{
            background: '#fef2f2',
            color: '#ed2f39',
            border: '1px solid #fee2e2',
            fontSize: '12px',
            fontWeight: '700',
            padding: '4px 12px',
            borderRadius: '20px'
          }}>
            {job.job_code || `AARAA-JOB-${job.id}`}
          </span>

          {job.featured && !isClosedOrExpired && (
            <span style={{
              background: '#fef3c7',
              color: '#92400e',
              fontSize: '11px',
              fontWeight: '700',
              padding: '3px 10px',
              borderRadius: '12px'
            }}>
              ★ FEATURED
            </span>
          )}

          {isClosedOrExpired && (
            <span style={{
              background: '#f3f4f6',
              color: '#6b7280',
              fontSize: '11px',
              fontWeight: '700',
              padding: '3px 10px',
              borderRadius: '12px'
            }}>
              POSITION CLOSED
            </span>
          )}
        </div>

        {/* Title */}
        <h3 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: '700', color: '#111827', lineHeight: '1.3' }}>
          <Link href={`/careers/jobs/${job.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {job.title}
          </Link>
        </h3>

        {/* Key Info Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', margin: '12px 0 16px', color: '#4b5563', fontSize: '13px', fontWeight: '500' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            📍 {job.location}, {job.state}
          </span>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            🏗️ {job.department}
          </span>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            ⏱️ {job.experience_min}-{job.experience_max} Yrs Exp
          </span>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            💼 {job.employment_type || 'Full-time'}
          </span>
        </div>

        {/* Short Description */}
        <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5', margin: '0 0 20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {job.description}
        </p>
      </div>

      {/* Footer / Actions */}
      <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ fontSize: '12px', color: '#9ca3af' }}>
          Posted: {job.date_posted || 'Recently'}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href={`/careers/jobs/${job.slug}`} style={{
            background: '#f3f4f6',
            color: '#1f2937',
            padding: '8px 18px',
            borderRadius: '20px',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: '600'
          }}>
            View Details
          </Link>

          {!isClosedOrExpired && onApply && (
            <button 
              onClick={() => onApply(job)}
              style={{
                background: '#ed2f39',
                color: '#ffffff',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
