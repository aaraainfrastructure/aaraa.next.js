import './globals.css';
import BrandMarquee from '@/components/BrandMarquee';
export const metadata={metadataBase:new URL('https://aaraainfrastructure.com'),title:'AARAA Infrastructure'};

export default function RootLayout({children}){
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/css/brand_marquee.css" />
      </head>
      <body>
        {children}
        <BrandMarquee/>
      </body>
    </html>
  );
}