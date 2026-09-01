import './globals.css';
import BrandMarquee from '@/components/BrandMarquee';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://www.aaraainfrastructure.com'),
  title: 'AARAA Infrastructure',
  verification: {
    google: 'google_site_verification_placeholder',
    other: {
      'msvalidate.01': ['msvalidate_verification_placeholder'],
    },
  },
};

export default function RootLayout({children}){
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/css/brand_marquee.css" />
      </head>
      <body>
        {/* Google Analytics 4 (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B83YDF8ME5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B83YDF8ME5', { page_path: window.location.pathname });
            gtag('config', 'G-DHGDK2T2VR', { page_path: window.location.pathname });
          `}
        </Script>


        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID || 'xxliejeihp'}");
          `}
        </Script>

        {/* Domain-Wide Mobile/Tablet Lead Form Auto-Pop Suppression Guard */}
        <Script id="disable-mobile-lead-autopop" strategy="afterInteractive">
          {`
            (function() {
              if (typeof window === 'undefined') return;
              var lastUserInteraction = 0;
              function recordUserTouchOrClick() { lastUserInteraction = Date.now(); }
              window.addEventListener('click', recordUserTouchOrClick, true);
              window.addEventListener('touchstart', recordUserTouchOrClick, { passive: true, capture: true });
              window.addEventListener('pointerdown', recordUserTouchOrClick, { passive: true, capture: true });

              function isMobileOrTablet() {
                var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
                var isSmall = w <= 1024;
                var isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(navigator.userAgent || '');
                var isTouch = ('ontouchstart' in window || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0)) && isSmall;
                return isSmall || isMobileUA || isTouch;
              }

              function isUserInitiated() {
                return (Date.now() - lastUserInteraction) < 1200;
              }

              window.__aaraaShouldBlockAutoPop = function() {
                return isMobileOrTablet() && !isUserInitiated();
              };

              // MutationObserver to intercept any direct DOM auto-pop triggers on mobile/tablet
              if (typeof MutationObserver !== 'undefined') {
                var observer = new MutationObserver(function(mutations) {
                  if (!isMobileOrTablet() || isUserInitiated()) return;
                  mutations.forEach(function(mutation) {
                    var target = mutation.target;
                    if (!target || !target.classList) return;
                    var isLeadModal = target.classList.contains('aaraa-popup-overlay') ||
                                      target.classList.contains('ai-modal-overlay') ||
                                      target.classList.contains('modal') ||
                                      (target.id && /enquiry|vendor|popup|modal/i.test(target.id));
                    if (isLeadModal) {
                      var isFlexOrBlock = target.style.display === 'flex' || target.style.display === 'block';
                      var isActive = target.classList.contains('active');
                      if (isFlexOrBlock || isActive) {
                        target.classList.remove('active');
                        target.style.display = 'none';
                        document.body.classList.remove('ai-modal-open', 'aaraa-popup-open');
                        document.documentElement.classList.remove('ai-modal-open', 'aaraa-popup-open');
                      }
                    }
                  });
                });

                var startObserver = function() {
                  if (document.body) {
                    observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'style'], subtree: true });
                  }
                };
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', startObserver);
                } else {
                  startObserver();
                }
              }
            })();
          `}
        </Script>

        {children}
        <BrandMarquee/>
      </body>
    </html>
  );
}