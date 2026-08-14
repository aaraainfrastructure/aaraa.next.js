'use client';

import React, { useState, useEffect } from 'react';
import JobSearch from '@/components/careers/JobSearch';
import JobCard from '@/components/careers/JobCard';
import ApplicationForm from '@/components/careers/ApplicationForm';
import { BASE_URL } from '@/lib/careers-seo';

export default function JobsListingPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ query: '', department: '', location: '', type: '' });
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  useEffect(() => {
    async function loadJobs() {
      try {
        // Fetch published jobs from store via client helper or initial load
        const res = await fetch('/api/config'); // sanity fetch
        // Load initial data
        const initialJobs = [
          {
            id: "job-001",
            job_code: "AARAA-JOB-2026-001",
            title: "Civil Site Engineer",
            slug: "civil-site-engineer-chennai",
            department: "Site Engineering",
            category: "Civil Engineering",
            location: "Chennai",
            state: "Tamil Nadu",
            employment_type: "Full-time",
            experience_min: 2,
            experience_max: 5,
            description: "AARAA Infrastructure is seeking an experienced Civil Site Engineer to oversee daily construction operations, quality execution, structural reinforcement, and contractor coordination for high-value commercial and industrial PEB projects in Chennai.",
            date_posted: "2026-08-01",
            status: "PUBLISHED",
            featured: true
          },
          {
            id: "job-002",
            job_code: "AARAA-JOB-2026-002",
            title: "Senior Quantity Surveyor & Billing Engineer",
            slug: "quantity-surveyor-billing-engineer-chennai",
            department: "Quantity Surveying",
            category: "Billing & Estimation",
            location: "Chennai",
            state: "Tamil Nadu",
            employment_type: "Full-time",
            experience_min: 4,
            experience_max: 8,
            description: "Join AARAA Infrastructure as a Senior Quantity Surveyor & Billing Engineer. Responsible for joint measurement verification, client billing, subcontractor bill certification, rate analysis, and cost optimization.",
            date_posted: "2026-08-05",
            status: "PUBLISHED",
            featured: true
          },
          {
            id: "job-003",
            job_code: "AARAA-JOB-2026-003",
            title: "MEP Project Engineer",
            slug: "mep-project-engineer-bengaluru",
            department: "MEP (Mechanical, Electrical, Plumbing)",
            category: "MEP",
            location: "Bengaluru",
            state: "Karnataka",
            employment_type: "Full-time",
            experience_min: 3,
            experience_max: 7,
            description: "AARAA Infrastructure is hiring a dedicated MEP Project Engineer for IT parks and commercial fit-out projects in Bengaluru. Manage HVAC, Electrical HT/LT systems, Plumbing, and Firefighting integration.",
            date_posted: "2026-08-08",
            status: "PUBLISHED",
            featured: false
          },
          {
            id: "job-004",
            job_code: "AARAA-JOB-2026-004",
            title: "Planning & Scheduling Engineer",
            slug: "planning-scheduling-engineer-pune",
            department: "Planning & Scheduling",
            category: "Project Management",
            location: "Pune",
            state: "Maharashtra",
            employment_type: "Full-time",
            experience_min: 3,
            experience_max: 6,
            description: "Seeking a proactive Planning Engineer to develop baseline schedules, resource histograms, S-curves, and delay analyses for industrial manufacturing construction projects in Pune.",
            date_posted: "2026-08-10",
            status: "PUBLISHED",
            featured: false
          }
        ];
        setJobs(initialJobs);
      } catch (err) {
        console.error("Error loading jobs:", err);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsApplyOpen(true);
  };

  const filteredJobs = jobs.filter(job => {
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchDept = job.department.toLowerCase().includes(q);
      const matchDesc = job.description.toLowerCase().includes(q);
      if (!matchTitle && !matchDept && !matchDesc) return false;
    }
    if (filters.department && job.department !== filters.department) return false;
    if (filters.location && job.location !== filters.location) return false;
    if (filters.type && job.employment_type !== filters.type) return false;
    return true;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: "'Montserrat', sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <span style={{ fontSize: '13px', fontWeight: '700', color: '#ed2f39', textTransform: 'uppercase', letterSpacing: '1px' }}>
          AARAA INFRASTRUCTURE VACANCIES
        </span>
        <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', margin: '8px 0 12px' }}>
          Open Construction Positions
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px', margin: 0, maxWidth: '700px' }}>
          Browse verified site engineering, quantity surveying, planning, MEP, and project management vacancies across India.
        </p>
      </div>

      {/* Filter Component */}
      <JobSearch filters={filters} onFilterChange={handleFilterChange} />

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: 0 }}>
          Showing {filteredJobs.length} Positions
        </h3>
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>Loading available vacancies...</div>
      ) : filteredJobs.length === 0 ? (
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '60px 20px', textAlign: 'center' }}>
          <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#334155', margin: '0 0 8px' }}>No positions matching your filters</h4>
          <p style={{ color: '#64748b', margin: '0 0 20px' }}>Try resetting your filters or submit a general application for future openings.</p>
          <button 
            onClick={() => handleApplyClick(null)}
            style={{ background: '#ed2f39', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '25px', fontWeight: '600', cursor: 'pointer' }}
          >
            Submit General Resume
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} onApply={handleApplyClick} />
          ))}
        </div>
      )}

      {/* Modal Application Form */}
      <ApplicationForm 
        job={selectedJob} 
        isOpen={isApplyOpen} 
        onClose={() => setIsApplyOpen(false)} 
      />
    </div>
  );
}
