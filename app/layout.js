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

        {/* Google Tag Manager (GTM) */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PLACEHOLDER');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","clarity_project_id_placeholder");
          `}
        </Script>

        {children}
        <BrandMarquee/>
      </body>
    </html>
  );
}