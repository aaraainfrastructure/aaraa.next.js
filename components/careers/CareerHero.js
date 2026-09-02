'use client';

import React, { useState } from 'react';
import ApplicationForm from './ApplicationForm';

export default function CareerHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section style={{
        background: 'linear-gradient(135deg, #0b0c0e 0%, #1a1d24 100%)',
        color: '#ffffff',
        padding: '80px 24px',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '48px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}>
        {/* Decorative accent */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(237,47,57,0.2) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(237, 47, 57, 0.15)',
            color: '#ed2f39',
            border: '1px solid rgba(237, 47, 57, 0.3)',
            padding: '6px 16px',
            borderRadius: '30px',
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}>
            AARAA INFRASTRUCTURE CAREERS
          </span>

          <h1 style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '44px',
            fontWeight: '800',
            lineHeight: '1.2',
            margin: '0 0 20px',
            letterSpacing: '-0.5px'
          }}>
            Build Your Career Where <span style={{ color: '#ed2f39' }}>Infrastructure Happens.</span>
          </h1>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            color: '#d1d5db',
            margin: '0 0 36px',
            maxWidth: '720px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Join AARAA Infrastructure and work on real-world civil, industrial, PEB, infrastructure, MEP, and renewable energy projects across India.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{
                background: 'linear-gradient(135deg, #ed2f39 0%, #c81e28 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '16px 48px',
                borderRadius: '35px',
                fontWeight: '800',
                fontSize: '18px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                boxShadow: '0 12px 28px rgba(237, 47, 57, 0.45)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              APPLY NOW →
            </button>
          </div>
        </div>
      </section>

      <ApplicationForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={{ title: 'General Career Application', job_code: 'AARAA-CAREERS' }}
      />
    </>
  );
}
