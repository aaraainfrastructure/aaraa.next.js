'use client';

import React, { useState, useEffect } from 'react';
import SEOPreview from '@/components/careers/SEOPreview';
import { DEPARTMENTS, VERIFIED_LOCATIONS } from '@/lib/careers-taxonomy';

export default function HRAdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'editor'
  
  // Job Form State
  const [jobForm, setJobForm] = useState({
    id: '',
    job_code: '',
    title: '',
    slug: '',
    department: DEPARTMENTS[0],
    location: VERIFIED_LOCATIONS[0].name,
    state: VERIFIED_LOCATIONS[0].state,
    employment_type: 'Full-time',
    experience_min: 2,
    experience_max: 5,
    qualification: 'B.E. / B.Tech in Civil Engineering',
    salary_min: 400000,
    salary_max: 700000,
    description: '',
    status: 'PUBLISHED',
    featured: false,
    seo_title: '',
    seo_description: '',
    valid_through: ''
  });

  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Initial dummy load for admin editor
    setJobs([
      {
        id: "job-001",
        job_code: "AARAA-JOB-2026-001",
        title: "Civil Site Engineer",
        slug: "civil-site-engineer-chennai",
        department: "Site Engineering",
        location: "Chennai",
        status: "PUBLISHED",
        featured: true,
        date_posted: "2026-08-01"
      },
      {
        id: "job-002",
        job_code: "AARAA-JOB-2026-002",
        title: "Senior Quantity Surveyor & Billing Engineer",
        slug: "quantity-surveyor-billing-engineer-chennai",
        department: "Quantity Surveying",
        location: "Chennai",
        status: "PUBLISHED",
        featured: true,
        date_posted: "2026-08-05"
      }
    ]);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'aaraa2026' || passcode === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert("Invalid Admin Passcode. Access restricted to AARAA Infrastructure HR.");
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const loc = jobForm.location || 'chennai';
    const autoSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + `-${loc.toLowerCase()}`;
    const autoSeoTitle = `${title} Jobs in ${jobForm.location} | AARAA Infrastructure`;
    
    setJobForm(prev => ({
      ...prev,
      title,
      slug: autoSlug,
      seo_title: autoSeoTitle
    }));
  };

  const handleSaveJob = (e) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.description) {
      alert("Title and Description are required.");
      return;
    }

    const updatedJob = {
      ...jobForm,
      id: jobForm.id || `job-${Date.now()}`,
      job_code: jobForm.job_code || `AARAA-JOB-2026-00${jobs.length + 1}`,
      date_posted: new Date().toISOString().split('T')[0]
    };

    setJobs(prev => [updatedJob, ...prev.filter(j => j.id !== updatedJob.id)]);
    setMessage("Job posting saved & published successfully!");
    setTimeout(() => {
      setMessage(null);
      setActiveTab('list');
    }, 1500);
  };

  const handleEditJob = (job) => {
    setJobForm(job);
    setActiveTab('editor');
  };

  const handleStatusChange = (id, newStatus) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: newStatus } : j));
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Montserrat', sans-serif", padding: '20px' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '40px 32px', maxWidth: '400px', width: '100%', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
          <img src="/logo.png" alt="AARAA Logo" style={{ height: '40px', marginBottom: '16px' }} />
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px' }}>HR Admin Portal</h2>
          <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 24px' }}>Restricted access for AARAA Infrastructure HR Personnel.</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter HR Passcode" 
              value={passcode} 
              onChange={(e) => setPasscode(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '16px', fontSize: '14px' }}
            />
            <button type="submit" style={{ width: '100%', background: '#ed2f39', color: '#fff', border: 'none', padding: '12px', borderRadius: '25px', fontWeight: '700', cursor: 'pointer' }}>
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: "'Montserrat', sans-serif" }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #e2e8f0', pb: '20px' }}>
        <div>
          <span style={{ background: '#ed2f39', color: '#fff', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '700' }}>AARAA HR MANAGEMENT</span>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '6px 0 0' }}>Job Posting & SEO Control</h1>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => { setJobForm({ id: '', job_code: '', title: '', slug: '', department: DEPARTMENTS[0], location: VERIFIED_LOCATIONS[0].name, state: VERIFIED_LOCATIONS[0].state, employment_type: 'Full-time', experience_min: 2, experience_max: 5, qualification: 'B.E. Civil', salary_min: 400000, salary_max: 700000, description: '', status: 'PUBLISHED', featured: false, seo_title: '', seo_description: '', valid_through: '' }); setActiveTab('editor'); }}
            style={{ background: '#ed2f39', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '20px', fontWeight: '700', cursor: 'pointer' }}
          >
            + Create New Vacancy
          </button>
          <button 
            onClick={() => setIsAuthenticated(false)}
            style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '10px 20px', borderRadius: '20px', fontWeight: '600', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      </div>

      {message && (
        <div style={{ background: '#def7ec', color: '#03543f', padding: '12px 20px', borderRadius: '8px', marginBottom: '24px', fontWeight: '600' }}>
          ✓ {message}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <button 
          onClick={() => setActiveTab('list')}
          style={{ background: activeTab === 'list' ? '#0f172a' : '#f1f5f9', color: activeTab === 'list' ? '#fff' : '#475569', border: 'none', padding: '10px 20px', borderRadius: '20px', fontWeight: '700', cursor: 'pointer' }}
        >
          Active Job Postings ({jobs.length})
        </button>
        <button 
          onClick={() => setActiveTab('editor')}
          style={{ background: activeTab === 'editor' ? '#0f172a' : '#f1f5f9', color: activeTab === 'editor' ? '#fff' : '#475569', border: 'none', padding: '10px 20px', borderRadius: '20px', fontWeight: '700', cursor: 'pointer' }}
        >
          {jobForm.id ? 'Edit Vacancy' : 'Create Job Editor'}
        </button>
      </div>

      {activeTab === 'list' ? (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '16px 20px' }}>Job Code</th>
                <th style={{ padding: '16px 20px' }}>Title & Role</th>
                <th style={{ padding: '16px 20px' }}>Location</th>
                <th style={{ padding: '16px 20px' }}>Status</th>
                <th style={{ padding: '16px 20px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(j => (
                <tr key={j.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 20px', fontWeight: '700', color: '#ed2f39' }}>{j.job_code}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: '700', color: '#0f172a' }}>{j.title}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{j.department}</div>
                  </td>
                  <td style={{ padding: '16px 20px', color: '#475569' }}>{j.location}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <select 
                      value={j.status} 
                      onChange={(e) => handleStatusChange(j.id, e.target.value)}
                      style={{ padding: '6px 12px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: '700', background: j.status === 'PUBLISHED' ? '#ecfdf5' : '#fef2f2', color: j.status === 'PUBLISHED' ? '#047857' : '#b91c1c' }}
                    >
                      <option value="PUBLISHED">PUBLISHED</option>
                      <option value="PAUSED">PAUSED</option>
                      <option value="CLOSED">CLOSED</option>
                      <option value="DRAFT">DRAFT</option>
                    </select>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <button 
                      onClick={() => handleEditJob(j)}
                      style={{ background: '#f1f5f9', border: 'none', padding: '6px 14px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                    >
                      Edit SEO & Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <form onSubmit={handleSaveJob} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Job Title *</label>
              <input 
                type="text" 
                required 
                value={jobForm.title} 
                onChange={handleTitleChange} 
                placeholder="e.g. Civil Site Engineer" 
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Auto URL Slug *</label>
              <input 
                type="text" 
                required 
                value={jobForm.slug} 
                onChange={(e) => setJobForm({ ...jobForm, slug: e.target.value })} 
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', background: '#f8fafc' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Department *</label>
              <select 
                value={jobForm.department} 
                onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
              >
                {DEPARTMENTS.map((d, i) => <option key={i} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Location *</label>
              <select 
                value={jobForm.location} 
                onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
              >
                {VERIFIED_LOCATIONS.map((l) => <option key={l.slug} value={l.name}>{l.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Status</label>
              <select 
                value={jobForm.status} 
                onChange={(e) => setJobForm({ ...jobForm, status: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
              >
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="PAUSED">PAUSED</option>
                <option value="CLOSED">CLOSED</option>
                <option value="DRAFT">DRAFT</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Full Role Description *</label>
            <textarea 
              rows={5} 
              required 
              value={jobForm.description} 
              onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
              placeholder="Describe daily site execution tasks, concrete standards, and contractor coordination..."
              style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
            />
          </div>

          {/* SEO Override Controls */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px', marginTop: '20px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '14px' }}>Custom SEO Overrides</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Custom SEO Title</label>
                <input 
                  type="text" 
                  value={jobForm.seo_title} 
                  onChange={(e) => setJobForm({ ...jobForm, seo_title: e.target.value })} 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Custom Meta Description</label>
                <input 
                  type="text" 
                  value={jobForm.seo_description} 
                  onChange={(e) => setJobForm({ ...jobForm, seo_description: e.target.value })} 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                />
              </div>
            </div>
          </div>

          {/* Live SERP Preview */}
          <SEOPreview job={jobForm} />

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '28px' }}>
            <button 
              type="button" 
              onClick={() => setActiveTab('list')}
              style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '12px 24px', borderRadius: '25px', fontWeight: '600', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={{ background: '#ed2f39', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: '25px', fontWeight: '700', cursor: 'pointer' }}
            >
              Publish Vacancy
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
