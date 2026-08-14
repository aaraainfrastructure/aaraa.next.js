import React from 'react';
import { generateJobPostingSchema, generateBreadcrumbSchema } from '@/lib/careers-seo';

export default function JobPostingSchema({ job, breadcrumbs }) {
  const schema = generateJobPostingSchema(job);
  const breadcrumbSchema = breadcrumbs ? generateBreadcrumbSchema(breadcrumbs) : null;

  if (!schema && !breadcrumbSchema) return null;

  return (
    <>
      {schema && (
        <script
          id="job-posting-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
    </>
  );
}
