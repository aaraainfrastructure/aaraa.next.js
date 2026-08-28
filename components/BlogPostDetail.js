'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Simple SVG Icons for Premium Lucide look
const Icons = {
  Calendar: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
  ),
  Clock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  Share: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
  Heart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  ),
  ChefHat: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18h12a2 2 0 0 0 2-2V9a6 6 0 0 0-12 0v7a2 2 0 0 0 2 2Z"/><path d="M9 18v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3"/></svg>
  ),
  Globe: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  Facebook: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ),
  Twitter: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
  ),
  Linkedin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  )
};

// Hardcoded premium related stories data
const RELATED_POSTS = [
  { id: 'onam-celebration-at-our-office', title: 'Onam Celebration at Our Office', category: 'Corporate & Culture', image: '/image/blog/onam-celebration-at-our-office.jpg', date: 'August 28, 2026' },
  { id: 'blog-post-9.html', title: 'BOAT Apprenticeship Partner', category: 'Partnerships', image: '/image/blog/blog-boat-partnership.png', date: 'July 3, 2026' },
  { id: 'blog-post-3.html', title: '180 MWp Solar Project Tuticorin', category: 'Solar Energy', image: '/image/blog/blog-tuticorin.png', date: 'June 20, 2026' }
];

export default function BlogPostDetail({ page }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [revealedElements, setRevealedElements] = useState({});
  const proseRef = useRef(null);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightboxImg = (e) => {
    if (e) e.stopPropagation();
    if (page.galleryImages && page.galleryImages.length > 0) {
      setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % page.galleryImages.length));
    }
  };

  const prevLightboxImg = (e) => {
    if (e) e.stopPropagation();
    if (page.galleryImages && page.galleryImages.length > 0) {
      setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + page.galleryImages.length) % page.galleryImages.length));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') nextLightboxImg();
      if (e.key === 'ArrowLeft') prevLightboxImg();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, page.galleryImages]);

  // Scroll and reading progress
  useEffect(() => {
    const handleScroll = () => {
      // 1. Reading progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // 2. Active Section Highlight
      if (page.tocLinks && page.tocLinks.length > 0) {
        let current = '';
        for (const link of page.tocLinks) {
          const el = document.getElementById(link.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 140) {
              current = link.id;
            }
          }
        }
        setActiveSection(current || page.tocLinks[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page.tocLinks]);

  // Reveal-on-scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08 }
    );

    const revealables = document.querySelectorAll('.blog-reveal');
    revealables.forEach((el) => observer.observe(el));

    return () => {
      revealables.forEach((el) => observer.unobserve(el));
    };
  }, [page.articleHtml]);

  // Clean raw HTML structure rule for hide/show elements
  useEffect(() => {
    // Inject styling directly to hide default parsed inline images in blog-prose
    const style = document.createElement('style');
    style.innerHTML = `
      .blog-prose img { display: none !important; }
      .blog-prose blockquote { display: none !important; }
      .blog-prose cite { display: none !important; }
      .blog-prose #introduction + section[class*="border-l-4"] { display: none !important; }
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = page.title;
    if (platform === 'twitter') {
      window.open(`https://twitter.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
    }
  };

  return (
    <div className="premium-blog-wrapper">
      {/* Sticky Header with Reading Progress */}
      <nav className="blog-nav-sticky">
        <div className="blog-nav-container">
          <Link href="/" className="blog-logo">
            <img src="/logo.png" alt="AARAA Infrastructure Logo" />
          </Link>
          <div className="blog-nav-links">
            <Link href="/" className="blog-nav-link">Home</Link>
            <Link href="/about" className="blog-nav-link">About</Link>
            <Link href="/blog" className="blog-nav-link" style={{ color: 'var(--color-primary)' }}>Blog</Link>
            <Link href="/contact-us" className="blog-nav-link">Contact</Link>
          </div>
        </div>
        <div className="blog-progress-bar-container">
          <div className="blog-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="blog-hero">
        {page.heroImage && (
          <div className="blog-hero-bg">
            <img src={page.heroImage} alt={page.title} />
          </div>
        )}
        <div className="blog-hero-overlay"></div>
        <div className="blog-hero-container">
          <div className="blog-breadcrumbs">
            <Link href="/">Home</Link>
            <span className="separator"></span>
            <Link href="/blog">Blog</Link>
            <span className="separator"></span>
            <span style={{ opacity: 0.6 }}>Details</span>
          </div>
          <span className="blog-badge-category">{page.category}</span>
          <h1 className="blog-hero-title">{page.title}</h1>
          {page.subtitle && <p className="blog-hero-subtitle">{page.subtitle}</p>}
          
          <div className="blog-hero-meta">
            <div className="blog-meta-item">
              <span className="blog-meta-icon"><Icons.Calendar /></span>
              <span>{page.date}</span>
            </div>
            <div className="blog-meta-item">
              <span className="blog-meta-icon"><Icons.Clock /></span>
              <span>{page.readTime}</span>
            </div>
            <div className="blog-meta-item">
              <span className="blog-meta-icon"><Icons.MapPin /></span>
              <span>{page.location}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content Layout Grid */}
      <section className="blog-content-layout">
        {/* Left Sticky Sidebar (TOC & Share) */}
        <aside className="blog-sidebar-left">
          <div className="blog-sticky-sidebar">
            {page.tocLinks && page.tocLinks.length > 0 && (
              <>
                <h3 className="blog-toc-title">Table of Contents</h3>
                <ul className="blog-toc-list">
                  {page.tocLinks.map((link) => (
                    <li key={link.id} className={`blog-toc-item ${activeSection === link.id ? 'active' : ''}`}>
                      <a href={`#${link.id}`}>{link.title}</a>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="blog-share-widget">
              <h4 className="blog-share-title">Share Article</h4>
              <div className="blog-share-buttons">
                <button onClick={() => handleShare('twitter')} className="blog-share-btn" aria-label="Share on Twitter">
                  <Icons.Twitter />
                </button>
                <button onClick={() => handleShare('facebook')} className="blog-share-btn" aria-label="Share on Facebook">
                  <Icons.Facebook />
                </button>
                <button onClick={() => handleShare('linkedin')} className="blog-share-btn" aria-label="Share on LinkedIn">
                  <Icons.Linkedin />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Column */}
        <main className="blog-main-column">
          {/* Standalone Video Card (if not part of gallery) */}
          {page.videoSrc && (!page.galleryImages || !page.galleryImages.some(img => img.src === page.videoSrc)) && (
            <div 
              className="blog-video-card blog-reveal" 
              style={page.videoSrc.includes('.mp4') ? { maxWidth: '400px', margin: '0 auto 64px', aspectRatio: '9/16' } : {}}
            >
              {page.videoSrc.includes('.mp4') ? (
                <video 
                  controls 
                  preload="metadata" 
                  poster={page.heroImage} 
                  style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-premium)', objectFit: 'contain', background: '#000' }}
                >
                  <source src={page.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  src={page.videoSrc}
                  title="Featured Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          )}

          {/* Article Prose Content */}
          <article 
            ref={proseRef}
            className="blog-prose blog-reveal"
            dangerouslySetInnerHTML={{ __html: page.articleHtml }}
          />

          {/* Image & Video Gallery Grid */}
          {page.galleryImages && page.galleryImages.length > 0 && (
            <div className="blog-gallery-section blog-reveal">
              <h3 className="blog-gallery-title">
                {page.category === 'Corporate & Culture' || (page.title && (page.title.includes('Onam') || page.title.includes('Celebration'))) ? 'Celebration Photo & Video Gallery' : 'Project Site Gallery'}
              </h3>
              <div className="blog-gallery-grid">
                {page.galleryImages.map((item, index) => {
                  const isVideo = item.type === 'video' || item.src.endsWith('.mp4') || item.src.endsWith('.webm');
                  return (
                    <div 
                      key={index} 
                      className={`blog-gallery-item ${index % 3 === 0 ? 'span-2' : ''}`}
                      onClick={() => openLightbox(index)}
                    >
                      {isVideo ? (
                        <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000', overflow: 'hidden' }}>
                          <video 
                            src={`${item.src}#t=0.1`} 
                            poster={page.heroImage} 
                            muted 
                            preload="metadata" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} 
                          />
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0,0,0,0.35)'
                          }}>
                            <div style={{
                              width: '60px',
                              height: '60px',
                              borderRadius: '50%',
                              background: 'rgba(186,0,19,0.95)',
                              color: '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '22px',
                              paddingLeft: '4px',
                              boxShadow: '0 4px 25px rgba(186,0,19,0.6)'
                            }}>
                              ▶
                            </div>
                          </div>
                        </div>
                      ) : (
                        <img src={item.src} alt={item.alt} loading="lazy" />
                      )}
                      <div className="blog-gallery-overlay">
                        <span className="blog-gallery-caption">
                          {isVideo ? '▶ Play Video — ' + item.alt : item.alt}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quote Block */}
          {page.quoteText && (
            <div className="blog-quote-block blog-reveal">
              <span className="blog-quote-icon">“</span>
              <p className="blog-quote-text">"{page.quoteText}"</p>
              <div className="blog-quote-cite">
                <div className="blog-quote-avatar">
                  {page.quoteCite ? page.quoteCite.charAt(0) : 'A'}
                </div>
                <div className="blog-quote-meta">
                  <div className="blog-quote-name">{page.quoteCite.split('/')[0]?.trim()}</div>
                  <div className="blog-quote-title">{page.quoteCite.split('/')[1]?.trim() || 'AARAA Executive'}</div>
                </div>
              </div>
            </div>
          )}

          {/* Celebration Highlights Section */}
          <div className="blog-celebration-section blog-reveal">
            <h3 className="blog-celebration-title">Building a Culture of Excellence</h3>
            <div className="blog-celebration-grid">
              <div className="blog-celebration-card">
                <span className="blog-celebration-icon"><Icons.Users /></span>
                <div>
                  <h4 className="blog-celebration-name">Team Spirit</h4>
                  <p className="blog-celebration-desc">Fostering collaboration, leadership, and structured field mentorship across all active project locations.</p>
                </div>
              </div>
              <div className="blog-celebration-card">
                <span className="blog-celebration-icon"><Icons.ChefHat /></span>
                <div>
                  <h4 className="blog-celebration-name">Homemade Food</h4>
                  <p className="blog-celebration-desc">Cultivating wellness and a supportive work family dynamic during team luncheons and office potlucks.</p>
                </div>
              </div>
              <div className="blog-celebration-card">
                <span className="blog-celebration-icon"><Icons.Globe /></span>
                <div>
                  <h4 className="blog-celebration-name">Cultural Diversity</h4>
                  <p className="blog-celebration-desc">Celebrating inclusive growth and unique ideas from young engineering talent from diverse regions.</p>
                </div>
              </div>
              <div className="blog-celebration-card">
                <span className="blog-celebration-icon"><Icons.Heart /></span>
                <div>
                  <h4 className="blog-celebration-name">Employee Engagement</h4>
                  <p className="blog-celebration-desc">Providing direct career-path mapping and permanent engineering placements for top performers.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>

      {/* Related Posts Section */}
      <section className="blog-related-section">
        <div className="blog-related-container">
          <h2 className="blog-related-title">Explore Related Stories</h2>
          <div className="blog-related-grid">
            {RELATED_POSTS.map((post, idx) => (
              <Link key={idx} href={`/${post.id}`} className="blog-related-card">
                <div className="blog-related-img">
                  <img src={post.image} alt={post.title} loading="lazy" />
                </div>
                <div className="blog-related-card-content">
                  <span className="blog-related-card-category">{post.category}</span>
                  <h3 className="blog-related-card-title">{post.title}</h3>
                  <div className="blog-related-card-meta">{post.date}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Call to Action */}
      <section className="blog-cta-section">
        <div className="blog-cta-bg"></div>
        <div className="blog-cta-container">
          <h2 className="blog-cta-title">Shaping India's Modern Landscape</h2>
          <p className="blog-cta-subtitle">
            Partner with AARAA Infrastructure Pvt. Ltd. to experience engineering precision, fast-track mobilization, and structured sustainable developments.
          </p>
          <div className="blog-cta-buttons">
            <Link href="/completed-projects" className="blog-cta-btn primary">
              Explore Our Projects
            </Link>
            <Link href="/forms/careers" className="blog-cta-btn secondary">
              Join Our Team
            </Link>
            <Link href="/contact-us" className="blog-cta-btn secondary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer style={{ background: '#0B132B', color: '#FFFFFF', padding: '60px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '40px' }}>
          <div>
            <img src="/logo.png" alt="AARAA Infrastructure Logo" style={{ height: '36px', marginBottom: '20px' }} />
            <p style={{ opacity: 0.6, fontSize: '14px', maxWidth: '320px' }}>
              AARAA Infrastructure Pvt. Ltd. is a premier general contractor specializing in commercial, industrial, infrastructure, and renewable energy developments.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '60px' }}>
            <div>
              <h5 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>Sectors</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, opacity: 0.7, fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><Link href="/commercial" style={{ color: '#fff', textDecoration: 'none' }}>Commercial</Link></li>
                <li><Link href="/industrial" style={{ color: '#fff', textDecoration: 'none' }}>Industrial</Link></li>
                <li><Link href="/infrastructure" style={{ color: '#fff', textDecoration: 'none' }}>Infrastructure</Link></li>
                <li><Link href="/renewables" style={{ color: '#fff', textDecoration: 'none' }}>Renewables</Link></li>
              </ul>
            </div>
            <div>
              <h5 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>Office</h5>
              <p style={{ opacity: 0.7, fontSize: '14px', lineHeight: '1.6', maxWidth: '240px' }}>
                Lotus Tower, Guindy,<br />
                Chennai, Tamil Nadu 600032<br />
                India
              </p>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '1280px', margin: '40px auto 0', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '13px', opacity: 0.5, textAlign: 'center' }}>
          © {new Date().getFullYear()} AARAA Infrastructure Pvt. Ltd. All rights reserved.
        </div>
      </footer>

      {/* Lightbox Slider Overlay */}
      {lightboxIndex !== null && page.galleryImages && page.galleryImages[lightboxIndex] && (
        <div className="blog-lightbox" onClick={closeLightbox}>
          <button className="blog-lightbox-close" onClick={closeLightbox} aria-label="Close Lightbox">×</button>
          
          {page.galleryImages.length > 1 && (
            <>
              <button className="blog-lightbox-nav blog-lightbox-prev" onClick={prevLightboxImg} aria-label="Previous image">‹</button>
              <button className="blog-lightbox-nav blog-lightbox-next" onClick={nextLightboxImg} aria-label="Next image">›</button>
            </>
          )}

          <div className="blog-lightbox-content" onClick={(e) => e.stopPropagation()}>
            {page.galleryImages[lightboxIndex].type === 'video' || page.galleryImages[lightboxIndex].src.endsWith('.mp4') || page.galleryImages[lightboxIndex].src.endsWith('.webm') ? (
              <video 
                src={page.galleryImages[lightboxIndex].src} 
                controls 
                autoPlay 
                playsInline
                className="blog-lightbox-img" 
                style={{ width: '100%', maxWidth: '800px', maxHeight: '75vh', borderRadius: '12px', background: '#000' }}
              />
            ) : (
              <img 
                src={page.galleryImages[lightboxIndex].src} 
                className="blog-lightbox-img" 
                alt={page.galleryImages[lightboxIndex].alt} 
              />
            )}
            <div className="blog-lightbox-caption-wrap">
              <span style={{ fontWeight: 600 }}>{lightboxIndex + 1} / {page.galleryImages.length}</span>
              <span style={{ margin: '0 6px', opacity: 0.4 }}>•</span>
              <span>{page.galleryImages[lightboxIndex].alt}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
