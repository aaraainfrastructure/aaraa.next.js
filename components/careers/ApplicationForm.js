'use client';

import React, { useState } from 'react';

export default function ApplicationForm({ job, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    qualification: '',
    experience: '',
    current_company: '',
    message: '',
    consent: true
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [status, setStatus] = useState({ loading: false, success: false, error: null, submissionId: null });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateResumeFile = (file) => {
    if (!file) return { valid: false, message: null };
    const allowedExts = ['.pdf', '.doc', '.docx'];
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!allowedExts.includes(ext)) {
      return { valid: false, message: `Invalid file type. Only PDF, DOC, or DOCX allowed.` };
    }
    if (file.size > 5 * 1024 * 1024) {
      return { valid: false, message: `File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds 5MB limit.` };
    }
    return { valid: true, message: null };
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    if (!file) {
      setResumeFile(null);
      setFileError(null);
      return;
    }

    const check = validateResumeFile(file);
    if (!check.valid) {
      setResumeFile(null);
      setFileError(check.message);
      e.target.value = ''; // Reset input
    } else {
      setResumeFile(file);
      setFileError(null);
    }
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setFileError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("Consent is required to submit your application.");
      return;
    }
    if (!resumeFile) {
      setFileError("Please select a valid PDF, DOC, or DOCX resume.");
      return;
    }

    setStatus({ loading: true, success: false, error: null, submissionId: null });

    try {
      const data = new FormData();
      data.append('formType', 'careers');
      data.append('full_name', formData.name);
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('current_location', formData.location);
      data.append('location', formData.location);
      data.append('highest_qualification', formData.qualification);
      data.append('qualification', formData.qualification);
      data.append('years_of_experience', formData.experience);
      data.append('experience', formData.experience);
      data.append('current_company', formData.current_company);
      data.append('company', formData.current_company);
      data.append('cover_message', formData.message);
      data.append('message', formData.message);
      data.append('job_title', job ? job.title : 'General Application');
      data.append('position', job ? job.title : 'General Application');
      data.append('job_id', job ? job.job_code : 'N/A');
      data.append('jobCode', job ? job.job_code : 'N/A');
      data.append('consent', formData.consent ? 'true' : 'false');
      data.append('sourceUrl', typeof window !== 'undefined' ? window.location.href : '');

      data.append('resume', resumeFile);

      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        body: data
      });

      const json = await res.json();
      if (res.ok && (json.success || json.ok)) {
        setStatus({
          loading: false,
          success: true,
          error: null,
          submissionId: json.application_id || json.submission_id
        });
      } else {
        // FormBold / Server submission failed - DO NOT display success screen
        setStatus({
          loading: false,
          success: false,
          error: json.message || "FormBold submission failed. Please check your details and retry.",
          submissionId: null
        });
      }
    } catch (err) {
      console.error("FormBold Application submission error:", err);
      // Keep modal open, show error message, retain form data
      setStatus({
        loading: false,
        success: false,
        error: "FormBold delivery network error. Please check your connection and retry.",
        submissionId: null
      });
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        maxWidth: '650px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
          color: '#fff',
          padding: '24px 32px',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ background: '#ed2f39', color: '#fff', padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
              {job ? job.job_code : 'AARAA CAREERS'}
            </span>
            <h3 style={{ margin: '8px 0 0', fontSize: '20px', fontWeight: '700' }}>
              {job ? `Apply for ${job.title}` : 'Submit Resume'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}
          >
            &times;
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '32px' }}>
          {status.success ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <div style={{ width: '60px', height: '60px', background: '#def7ec', color: '#03543f', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', margin: '0 auto 16px' }}>
                ✓
              </div>
              <h4 style={{ fontSize: '22px', color: '#111827', margin: '0 0 12px', fontWeight: '800' }}>
                Application Submitted Successfully!
              </h4>
              <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: '1.6', margin: '0 0 24px' }}>
                Thank you for applying to AARAA Infrastructure. Your application ID is <strong>{status.submissionId}</strong>. Our HR team will review your credentials and contact you shortly.
              </p>
              <button 
                onClick={onClose}
                style={{ background: '#ed2f39', color: '#fff', padding: '12px 28px', border: 'none', borderRadius: '30px', fontWeight: '600', cursor: 'pointer' }}
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {status.error && (
                <div style={{ background: '#fde8e8', color: '#9b1c1c', border: '1px solid #f87171', padding: '12px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '600' }}>
                  ⚠️ {status.error}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Full Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name} 
                    onChange={handleChange}
                    placeholder="e.g. Rajesh Kumar" 
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Mobile Number *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    value={formData.phone} 
                    onChange={handleChange}
                    placeholder="10-digit mobile number" 
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    value={formData.email} 
                    onChange={handleChange}
                    placeholder="rajesh@example.com" 
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Current Location *</label>
                  <input 
                    type="text" 
                    name="location" 
                    required 
                    value={formData.location} 
                    onChange={handleChange}
                    placeholder="e.g. Chennai, Tamil Nadu" 
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Highest Qualification *</label>
                  <input 
                    type="text" 
                    name="qualification" 
                    required 
                    value={formData.qualification} 
                    onChange={handleChange}
                    placeholder="e.g. B.E. Civil Engineering" 
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Years of Experience *</label>
                  <input 
                    type="text" 
                    name="experience" 
                    required 
                    value={formData.experience} 
                    onChange={handleChange}
                    placeholder="e.g. 3.5 Years" 
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                  />
                </div>
              </div>

              {/* Resume Upload Field with Dynamic State Machine */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                  Attach Resume (PDF, DOC, DOCX - Max 5MB) *
                </label>

                {resumeFile ? (
                  /* Success State Styling */
                  <div style={{
                    border: '2px solid #059669',
                    background: '#ecfdf5',
                    color: '#065f46',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '18px' }}>✓</span>
                      <span>{resumeFile.name}</span>
                      <span style={{ fontSize: '12px', color: '#047857', opacity: 0.8 }}>
                        ({(resumeFile.size / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                    </div>
                    <button 
                      type="button" 
                      onClick={handleRemoveFile}
                      style={{ background: 'transparent', border: 'none', color: '#dc2626', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
                    >
                      ✕ Remove
                    </button>
                  </div>
                ) : (
                  /* Default / Error Validation State Styling */
                  <div>
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      required 
                      onChange={handleFileChange}
                      style={{ 
                        width: '100%', 
                        padding: '10px', 
                        border: fileError ? '2px dashed #dc2626' : '1px dashed #ed2f39', 
                        borderRadius: '8px', 
                        background: '#fef2f2',
                        fontSize: '13px'
                      }}
                    />
                    {fileError && (
                      <div style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>
                        ⚠️ {fileError}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Cover Message / Key Projects Handled</label>
                <textarea 
                  name="message" 
                  rows={3} 
                  value={formData.message} 
                  onChange={handleChange}
                  placeholder="Briefly describe your site experience or key construction projects..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox" 
                  id="consent" 
                  name="consent" 
                  checked={formData.consent} 
                  onChange={handleChange}
                />
                <label htmlFor="consent" style={{ fontSize: '12px', color: '#6b7280' }}>
                  I consent to AARAA Infrastructure storing my details and contacting me regarding employment opportunities.
                </label>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={onClose}
                  style={{ background: '#f3f4f6', color: '#374151', border: 'none', padding: '10px 20px', borderRadius: '25px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={status.loading}
                  style={{ background: '#ed2f39', color: '#fff', border: 'none', padding: '10px 28px', borderRadius: '25px', fontWeight: '600', cursor: 'pointer', opacity: status.loading ? 0.7 : 1 }}
                >
                  {status.loading ? 'Submitting to FormBold...' : 'Submit Application'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
