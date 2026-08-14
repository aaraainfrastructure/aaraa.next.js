/**
 * AARAA Infrastructure - Career SEO & Schema Generator
 * Generates valid Schema.org JobPosting & BreadcrumbList JSON-LD,
 * OpenGraph, Canonical URLs, and indexability rules.
 */

export const BASE_URL = "https://www.aaraainfrastructure.com";

export function generateJobPostingSchema(job) {
  if (!job || job.status !== 'PUBLISHED') return null;

  const validThroughDate = job.valid_through || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const schema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description || `${job.title} position at AARAA Infrastructure Pvt. Ltd.`,
    "identifier": {
      "@type": "PropertyValue",
      "name": "AARAA Infrastructure Pvt Ltd",
      "value": job.job_code || `AARAA-JOB-${job.id}`
    },
    "datePosted": job.published_at || job.date_posted || job.created_at || new Date().toISOString().split('T')[0],
    "validThrough": `${validThroughDate}T23:59:59Z`,
    "employmentType": (job.employment_type || "FULL_TIME").toUpperCase().replace(/\s+/g, '_'),
    "hiringOrganization": {
      "@type": "Organization",
      "name": "AARAA Infrastructure Pvt. Ltd.",
      "sameAs": BASE_URL,
      "logo": `${BASE_URL}/logo.png`
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location || "Chennai",
        "addressRegion": job.state || "Tamil Nadu",
        "addressCountry": job.country || "IN"
      }
    },
    "directApply": true
  };

  if (job.salary_min && job.salary_max) {
    schema.baseSalary = {
      "@type": "MonetaryAmount",
      "currency": job.salary_currency || "INR",
      "value": {
        "@type": "QuantitativeValue",
        "minValue": Number(job.salary_min),
        "maxValue": Number(job.salary_max),
        "unitText": (job.salary_period || "YEAR").toUpperCase()
      }
    };
  }

  return schema;
}

export function generateBreadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`
    }))
  };
}

export function generateJobMetadata(job) {
  if (!job) {
    return {
      title: "Careers & Job Vacancies | AARAA Infrastructure",
      description: "Explore rewarding career paths in civil engineering, PEB, industrial construction, and solar EPC at AARAA Infrastructure Pvt. Ltd."
    };
  }

  const cleanTitle = `${job.title} Jobs in ${job.location || 'India'} | AARAA Infrastructure`;
  const cleanDescription = job.seo_description || 
    `Apply for the ${job.title} position (${job.job_code}) at AARAA Infrastructure in ${job.location || 'India'}. View requirements, responsibilities, experience (${job.experience_min || 0}-${job.experience_max || 5} yrs), and apply online.`;

  const canonicalUrl = `${BASE_URL}/careers/jobs/${job.slug}`;

  const isClosedOrExpired = job.status === 'CLOSED' || job.status === 'EXPIRED' || (job.valid_through && new Date(job.valid_through) < new Date());

  return {
    title: cleanTitle,
    description: cleanDescription,
    alternates: {
      canonical: canonicalUrl
    },
    robots: {
      index: !isClosedOrExpired,
      follow: true
    },
    openGraph: {
      title: cleanTitle,
      description: cleanDescription,
      url: canonicalUrl,
      siteName: 'AARAA Infrastructure',
      images: [
        {
          url: `${BASE_URL}/logo.png`,
          width: 1200,
          height: 630,
          alt: cleanTitle
        }
      ],
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle,
      description: cleanDescription,
      images: [`${BASE_URL}/logo.png`]
    }
  };
}

export function shouldIndex(pageType, data = {}) {
  switch (pageType) {
    case 'JOB_DETAIL':
      if (!data.job) return false;
      const isExpired = data.job.valid_through && new Date(data.job.valid_through) < new Date();
      return data.job.status === 'PUBLISHED' && !isExpired;

    case 'ROLE_LOCATION':
      // Strict rule: Only index role+location pages if there are active jobs or high quality content
      return (data.activeJobsCount && data.activeJobsCount > 0) || Boolean(data.hasUniqueContent);

    case 'SEARCH_RESULTS':
      return false; // Never index search/filter URLs with parameters

    case 'ADMIN':
      return false;

    default:
      return true;
  }
}
