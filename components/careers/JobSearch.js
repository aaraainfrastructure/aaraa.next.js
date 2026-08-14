'use client';

import React from 'react';
import { DEPARTMENTS, VERIFIED_LOCATIONS } from '@/lib/careers-taxonomy';

export default function JobSearch({ filters, onFilterChange }) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
      marginBottom: '32px'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {/* Search input */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Keyword Search</label>
          <input 
            type="text" 
            placeholder="e.g. Civil, Quantity Surveyor, Billing" 
            value={filters.query || ''} 
            onChange={(e) => onFilterChange('query', e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
          />
        </div>

        {/* Department Filter */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Department</label>
          <select 
            value={filters.department || ''} 
            onChange={(e) => onFilterChange('department', e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', background: '#fff' }}
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map((dept, idx) => (
              <option key={idx} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Location</label>
          <select 
            value={filters.location || ''} 
            onChange={(e) => onFilterChange('location', e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', background: '#fff' }}
          >
            <option value="">All Locations</option>
            {VERIFIED_LOCATIONS.map((loc) => (
              <option key={loc.slug} value={loc.name}>{loc.name}, {loc.state}</option>
            ))}
          </select>
        </div>

        {/* Employment Type */}
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Employment Type</label>
          <select 
            value={filters.type || ''} 
            onChange={(e) => onFilterChange('type', e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', background: '#fff' }}
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
      </div>
    </div>
  );
}
