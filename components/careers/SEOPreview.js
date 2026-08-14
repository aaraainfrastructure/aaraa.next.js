'use client';

import React from 'react';
import { generateJobPostingSchema, BASE_URL } from '@/lib/careers-seo';

export default function SEOPreview({ job }) {
  if (!job) return null;

  const title = job.seo_title || `${job.title || 'Job Title'} Jobs in ${job.location || 'Location'} | AARAA Infrastructure`;
  const url = `${BASE_URL}/careers/jobs/${job.slug || 'job-slug'}`;
  const description = job.seo_description || job.description || 'Job description preview for Google search snippet.';

  const schema = generateJobPostingSchema(job);
  const isValidSchema = schema && schema.title && schema.hiringOrganization && schema.jobLocation;

  return (
    <div style={{
      background: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '20px',
      marginTop: '24px'
    }}>
      <h4 style={{ margin: '0 0 16px', fontSize: '15px', color: '#111827', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
        🔍 Live Google SERP & Schema Validation Preview
      </h4>

      {/* Google SERP Snippet Box */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #dfe1e5',
        borderRadius: '8px',
        padding: '16px',
        fontFamily: 'arial, sans-serif'
      }}>
        <div style={{ fontSize: '14px', color: '#202124', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <img src="/logo.png" alt="AARAA Logo" style={{ width: '16px', height: '16px' }} />
          <span>aaraainfrastructure.com</span>
          <span style={{ color: '#5f6368', fontSize: '12px' }}>› careers › jobs › {job.slug || 'job-slug'}</span>
        </div>
        <div style={{ color: '#1a0dab', fontSize: '20px', fontWeight: '400', lineHeight: '1.3', marginBottom: '4px', textDecoration: 'none' }}>
          {title}
        </div>
        <div style={{ color: '#4d5156', fontSize: '14px', lineHeight: '1.58' }}>
          {description.length > 160 ? description.substring(0, 157) + '...' : description}
        </div>
      </div>

      {/* Schema Status */}
      <div style={{ marginTop: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px' }}>
        <div style={{ color: isValidSchema ? '#059669' : '#dc2626', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {isValidSchema ? '✓ JobPosting JSON-LD Schema Valid' : '⚠️ Missing Schema Fields'}
        </div>
        <div style={{ color: '#4b5563' }}>
          <strong>Canonical:</strong> <code>{url}</code>
        </div>
      </div>
    </div>
  );
}
