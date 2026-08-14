import React from 'react';
import Link from 'next/link';

export default function CareerHero() {
  return (
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

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/careers/jobs" style={{
            background: '#ed2f39',
            color: '#ffffff',
            padding: '14px 36px',
            borderRadius: '30px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '16px',
            boxShadow: '0 10px 20px rgba(237, 47, 57, 0.3)',
            transition: 'all 0.3s ease'
          }}>
            View Open Positions →
          </Link>

          <a href="#departments" style={{
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '14px 32px',
            borderRadius: '30px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px',
            backdropFilter: 'blur(10px)'
          }}>
            Explore Careers
          </a>
        </div>
      </div>
    </section>
  );
}
