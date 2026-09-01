import os

SOLAR_PAGES_DATA = [
    {
        "location_key": "chennai",
        "file_path": "legacy-pages/location/chennai/solar-epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/chennai/solar-epc-contractor",
        "location_name": "Chennai",
        "title": "Solar EPC Contractors in Chennai | Top Solar EPC Companies",
        "meta_desc": "Explore leading Solar EPC contractors in Chennai. Delivering turnkey utility, industrial rooftop & ground-mount solar power projects. Request a Solar EPC consultation.",
        "meta_keywords": "Solar EPC Contractors in Chennai, Top Solar EPC Contractors in Chennai, Top 10 Solar EPC Contractors in Chennai, Solar EPC Companies Chennai, Turnkey Solar EPC",
        "h1": "Solar EPC Contractors in Chennai | Turnkey Solar Power Projects",
        "proof_title": "Proven Tamil Nadu Solar Reference: 180 MWp Utility Solar Power Project",
        "proof_text": "Headquartered in Guindy, Chennai, AARAA Infrastructure delivered full civil, structural, and electrical Balance of Plant (BoP) execution for the landmark <strong>180 MWp Utility Solar Power Project in Tuticorin, Tamil Nadu</strong>.",
        "sectors": "Industrial rooftop solar arrays in Sriperumbudur & Oragadam, commercial corporate office rooftop solar, utility-scale ground-mounted solar parks, and high-voltage grid evacuation switchyards."
    },
    {
        "location_key": "karnataka",
        "file_path": "legacy-pages/location/karnataka/solar-epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/karnataka/solar-epc-contractor",
        "location_name": "Karnataka",
        "title": "Solar EPC Contractors in Karnataka | Top Solar EPC Companies",
        "meta_desc": "Explore leading Solar EPC contractors in Karnataka. Proven execution of the 140.6 MW Kudligi Wind-Solar Hybrid Power Project. Request a Solar EPC project consultation.",
        "meta_keywords": "Solar EPC Contractors in Karnataka, Top Solar EPC Contractors in Karnataka, Top 10 Solar EPC Contractors in Karnataka, Solar EPC Companies Karnataka, Hybrid Solar EPC",
        "h1": "Solar EPC Contractors in Karnataka | Turnkey Solar & Hybrid Projects",
        "proof_title": "Verified Landmark Reference: 140.6 MW Wind-Solar Hybrid Power Project, Kudligi",
        "proof_text": "AARAA Infrastructure proved its utility-scale renewable engineering capabilities in Karnataka by executing complete civil foundations, MMS installation, and electrical BoP packages for the <strong>140.6 MW Wind-Solar Hybrid Project in Kudligi, Karnataka</strong>.",
        "sectors": "Utility-scale ground-mounted solar parks, wind-solar hybrid projects, industrial captive solar plants in Bidadi & Peenya, and high-voltage pooling switchyards."
    },
    {
        "location_key": "delhi",
        "file_path": "legacy-pages/location/delhi/solar-epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/delhi/solar-epc-contractor",
        "location_name": "Delhi",
        "title": "Solar EPC Contractors in Delhi | Top Solar EPC Companies",
        "meta_desc": "Explore leading Solar EPC contractors in Delhi. Turnkey commercial, industrial & rooftop solar power plant engineering across Delhi NCR. Request a consultation.",
        "meta_keywords": "Solar EPC Contractors in Delhi, Top Solar EPC Contractors in Delhi, Top 10 Solar EPC Contractors in Delhi, Solar EPC Companies Delhi NCR, Commercial Solar Delhi",
        "h1": "Solar EPC Contractors in Delhi | Turnkey Solar Engineering & EPC",
        "proof_title": "Turnkey Solar Engineering & BoP Capability in Delhi NCR",
        "proof_text": "AARAA Infrastructure provides multi-megawatt turnkey solar EPC services across Delhi, combining DC/AC electrical design, tier-1 module procurement, structural mounting systems, and grid synchronization.",
        "sectors": "Commercial office rooftop solar systems, institutional campus solar arrays, industrial warehouse solar power plants, and grid-connected solar power projects."
    },
    {
        "location_key": "mumbai",
        "file_path": "legacy-pages/location/mumbai/solar-epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/mumbai/solar-epc-contractor",
        "location_name": "Mumbai",
        "title": "Solar EPC Contractors in Mumbai | Top Solar EPC Companies",
        "meta_desc": "Explore leading Solar EPC contractors in Mumbai. Commercial rooftop solar, industrial solar power plants & turnkey solar EPC across Mumbai & Thane. Request consultation.",
        "meta_keywords": "Solar EPC Contractors in Mumbai, Top Solar EPC Contractors in Mumbai, Top 10 Solar EPC Contractors in Mumbai, Solar EPC Companies Mumbai, Rooftop Solar Mumbai",
        "h1": "Solar EPC Contractors in Mumbai | Turnkey Commercial & Industrial Solar",
        "proof_title": "Commercial & Industrial Solar Infrastructure Credentials in Mumbai",
        "proof_text": "With our branch office at WeWork, Oberoi Commerz II, Mumbai, AARAA Infrastructure delivers high-yield commercial rooftop solar installations, industrial plant solar power systems, and high-wind-resistant solar mounting structures across Mumbai, Thane, and Navi Mumbai.",
        "sectors": "Commercial high-rise rooftop solar arrays, corporate campus solar power, industrial manufacturing plant solar installations in Thane/Rabale, and net-metering solar projects."
    },
    {
        "location_key": "andhra-pradesh",
        "file_path": "legacy-pages/location/andhra-pradesh/solar-epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/andhra-pradesh/solar-epc-contractor",
        "location_name": "Andhra Pradesh",
        "title": "Solar EPC Contractors in Andhra Pradesh | Top Solar EPC Companies",
        "meta_desc": "Explore leading Solar EPC contractors in Andhra Pradesh. Turnkey utility-scale solar parks & industrial solar plant construction across Sri City SEZ & AP. Request consultation.",
        "meta_keywords": "Solar EPC Contractors in Andhra Pradesh, Top Solar EPC Contractors in Andhra Pradesh, Top 10 Solar EPC Contractors in AP, Solar EPC Companies Sri City",
        "h1": "Solar EPC Contractors in Andhra Pradesh | Turnkey Utility & Industrial Solar",
        "proof_title": "Utility & Industrial Solar Execution Capability in Andhra Pradesh",
        "proof_text": "AARAA Infrastructure delivers turnkey solar EPC engineering, heavy foundation piling, MMS assembly, and grid evacuation infrastructure for utility solar parks and industrial plants across Andhra Pradesh, leveraging our proximity to Sri City SEZ and industrial corridors.",
        "sectors": "Utility solar PV ground-mounted parks, industrial captive solar power plants in Sri City SEZ, agricultural solar pump arrays, and sub-station evacuation switchyards."
    },
    {
        "location_key": "thoothukudi",
        "file_path": "legacy-pages/location/thoothukudi/solar-epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/thoothukudi/solar-epc-contractor",
        "location_name": "Tuticorin (Thoothukudi)",
        "title": "Solar EPC Contractors in Tuticorin (Thoothukudi) | Top Solar EPC Companies",
        "meta_desc": "Explore leading Solar EPC contractors in Tuticorin (Thoothukudi). Proven execution of the landmark 180 MWp Utility Solar Power Project. Request a Solar EPC consultation.",
        "meta_keywords": "Solar EPC Contractors in Tuticorin, Solar EPC Contractors in Thoothukudi, Top Solar EPC Contractors in Tuticorin, Top 10 Solar EPC Contractors in Thoothukudi, Solar EPC Tuticorin",
        "h1": "Solar EPC Contractors in Tuticorin (Thoothukudi) | Turnkey Solar Projects",
        "proof_title": "Verified Flagship Reference: 180 MWp Utility Solar Power Project, Tuticorin",
        "proof_text": "AARAA Infrastructure served as primary civil, structural, and electrical Balance of Plant (BoP) contractor for the landmark <strong>180 MWp Utility Solar Power Project in Tuticorin (Thoothukudi), Tamil Nadu</strong>, executing heavy coastal foundation piling, anti-corrosive MMS installation, and switchyard construction.",
        "sectors": "Utility-scale ground-mounted solar PV power parks, coastal high-saline solar foundations, port logistics industrial solar roofs, and high-voltage grid switchyards."
    },
    {
        "location_key": "tirunelveli",
        "file_path": "legacy-pages/location/tirunelveli/solar-epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/tirunelveli/solar-epc-contractor",
        "location_name": "Tirunelveli",
        "title": "Solar EPC Contractors in Tirunelveli | Top Solar EPC Companies",
        "meta_desc": "Explore leading Solar EPC contractors in Tirunelveli. Delivering high wind-load solar BoP, industrial solar sheds & utility solar parks across South TN. Request consultation.",
        "meta_keywords": "Solar EPC Contractors in Tirunelveli, Top Solar EPC Contractors in Tirunelveli, Top 10 Solar EPC Contractors in Tirunelveli, Solar EPC Companies Tirunelveli",
        "h1": "Solar EPC Contractors in Tirunelveli | Turnkey Solar Power Engineering",
        "proof_title": "Regional Renewable Energy Reference in South Tamil Nadu",
        "proof_text": "AARAA Infrastructure brings multi-megawatt solar engineering expertise to Tirunelveli, backed by our execution of the <strong>180 MWp Utility Solar Power Project in neighboring Tuticorin (~50 km)</strong> and industrial solar installations across Gangaikondan SIPCOT.",
        "sectors": "Utility solar PV power parks, high wind-shear foundation engineering, industrial manufacturing plant solar roofs, and high-voltage grid evacuation switchyards."
    },
    {
        "location_key": "gadag",
        "file_path": "legacy-pages/location/gadag/solar-epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/gadag/solar-epc-contractor",
        "location_name": "Gadag",
        "title": "Solar EPC Contractors in Gadag | Top Solar EPC Companies",
        "meta_desc": "Explore leading Solar EPC contractors in Gadag, Karnataka. Delivering turnkey solar BoP, wind-solar hybrid & utility solar power projects across North Karnataka.",
        "meta_keywords": "Solar EPC Contractors in Gadag, Top Solar EPC Contractors in Gadag, Top 10 Solar EPC Contractors in Gadag, Solar EPC Companies Gadag, Hybrid Solar Gadag",
        "h1": "Solar EPC Contractors in Gadag | Turnkey Solar & Wind-Solar Hybrid Projects",
        "proof_title": "North Karnataka Renewable Infrastructure Reference",
        "proof_text": "AARAA Infrastructure delivers turnkey solar and hybrid EPC contracting across North Karnataka, supported by our execution of the <strong>140.6 MW Wind-Solar Hybrid Power Project in neighboring Kudligi (~80 km)</strong>.",
        "sectors": "Utility-scale solar & hybrid energy parks, agricultural processing plant solar roofs, industrial solar sheds, and grid evacuation infrastructure."
    },
    {
        "location_key": "kudligi",
        "file_path": "legacy-pages/location/kudligi/solar-epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/kudligi/solar-epc-contractor",
        "location_name": "Kudligi",
        "title": "Solar EPC Contractors in Kudligi | Top Solar EPC Companies",
        "meta_desc": "Explore leading Solar EPC contractors in Kudligi, Karnataka. Proven execution of the 140.6 MW Wind-Solar Hybrid Power Project. Request a Solar EPC consultation.",
        "meta_keywords": "Solar EPC Contractors in Kudligi, Top Solar EPC Contractors in Kudligi, Top 10 Solar EPC Contractors in Kudligi, Solar EPC Companies Kudligi, Hybrid Solar Bellary",
        "h1": "Solar EPC Contractors in Kudligi | Turnkey Utility Solar & Hybrid EPC",
        "proof_title": "Verified Landmark Reference: 140.6 MW Wind-Solar Hybrid Project, Kudligi",
        "proof_text": "AARAA Infrastructure proved its utility-scale renewable engineering capability in Kudligi, Bellary district, by delivering full civil, structural, and electrical BoP packages for the <strong>140.6 MW Wind-Solar Hybrid Power Project</strong>.",
        "sectors": "Wind-solar hybrid power plants, utility solar PV ground-mounted arrays, pooling switchyards, internal collection networks, and heavy equipment civil foundations."
    },
    {
        "location_key": "amaravati",
        "file_path": "legacy-pages/location/amaravati/solar-epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/amaravati/solar-epc-contractor",
        "location_name": "Amaravati",
        "title": "Solar EPC Contractors in Amaravati | Top Solar EPC Companies",
        "meta_desc": "Explore leading Solar EPC contractors in Amaravati. Delivering commercial rooftop solar, institutional solar power & solar EPC projects across AP capital region.",
        "meta_keywords": "Solar EPC Contractors in Amaravati, Top Solar EPC Contractors in Amaravati, Top 10 Solar EPC Contractors in Amaravati, Solar EPC Companies Amaravati",
        "h1": "Solar EPC Contractors in Amaravati | Turnkey Solar Infrastructure Projects",
        "proof_title": "Capital & Regional Renewable Solar EPC Capability in Andhra Pradesh",
        "proof_text": "AARAA Infrastructure provides turnkey solar EPC engineering, rooftop solar installations, ground-mounted solar arrays, and grid integration across Andhra Pradesh capital region and industrial corridors.",
        "sectors": "Civic & institutional building rooftop solar systems, commercial office solar power, industrial manufacturing plant solar roofs, and utility solar infrastructure."
    },
    {
        "location_key": "telangana",
        "file_path": "legacy-pages/location/telangana/solar-epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/telangana/solar-epc-contractor",
        "location_name": "Telangana",
        "title": "Solar EPC Contractors in Telangana | Top Solar EPC Companies",
        "meta_desc": "Explore leading Solar EPC contractors in Telangana. Delivering industrial captive solar plants, commercial rooftop solar & utility solar across TSIIC Hyderabad.",
        "meta_keywords": "Solar EPC Contractors in Telangana, Top Solar EPC Contractors in Telangana, Top 10 Solar EPC Contractors in Telangana, Solar EPC Companies Hyderabad",
        "h1": "Solar EPC Contractors in Telangana | Turnkey Industrial & Utility Solar",
        "proof_title": "Industrial Solar EPC & BoP Credentials in Telangana",
        "proof_text": "AARAA Infrastructure delivers turnkey solar EPC contracting for industrial and pharmaceutical manufacturing clients across Telangana (Hyderabad, Pashamylaram, Patancheru, TSIIC parks), handling solar design, MMS erection, and grid synchronization.",
        "sectors": "Pharma & chemical manufacturing plant industrial solar roofs, automated logistics warehouse solar arrays, utility solar PV ground-mounted parks, and net-metering systems."
    },
    {
        "location_key": "ncr",
        "file_path": "legacy-pages/location/ncr/solar-epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/ncr/solar-epc-contractor",
        "location_name": "NCR",
        "title": "Solar EPC Contractors in NCR | Top Solar EPC Companies",
        "meta_desc": "Explore leading Solar EPC contractors in NCR (Delhi NCR). Industrial warehouse rooftop solar, commercial solar power plants & solar EPC across Noida & Gurugram.",
        "meta_keywords": "Solar EPC Contractors in NCR, Top Solar EPC Contractors in NCR, Top 10 Solar EPC Contractors in Delhi NCR, Solar EPC Noida Gurugram, Industrial Solar NCR",
        "h1": "Solar EPC Contractors in NCR | Turnkey Industrial & Commercial Solar",
        "proof_title": "Industrial & Commercial Solar EPC Credentials in Delhi NCR",
        "proof_text": "AARAA Infrastructure delivers high-capacity industrial rooftop solar systems, automated logistics hub solar power plants, and commercial building solar installations across National Capital Region hubs (Noida, Greater Noida, Gurugram, Faridabad).",
        "sectors": "Logistics distribution hub rooftop solar, automotive manufacturing plant solar systems, electronic assembly facility solar power, and commercial solar microgrids."
    },
    {
        "location_key": "tamil-nadu",
        "file_path": "legacy-pages/location/tamil-nadu/solar-epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/tamil-nadu/solar-epc-contractor",
        "location_name": "Tamil Nadu",
        "title": "Solar EPC Contractors in Tamil Nadu | Top Solar EPC Companies",
        "meta_desc": "Explore leading Solar EPC contractors in Tamil Nadu. Executed 180 MWp Tuticorin Solar Project. Turnkey utility solar, industrial & commercial solar EPC across TN.",
        "meta_keywords": "Solar EPC Contractors in Tamil Nadu, Top Solar EPC Contractors in Tamil Nadu, Top 10 Solar EPC Contractors in Tamil Nadu, Solar EPC Companies TN, Utility Solar TN",
        "h1": "Solar EPC Contractors in Tamil Nadu | Turnkey Utility & Industrial Solar",
        "proof_title": "Statewide Utility & Industrial Solar Infrastructure Credentials",
        "proof_text": "Headquartered in Guindy, Chennai, AARAA Infrastructure executed full Balance of Plant (BoP) scope for the landmark <strong>180 MWp Utility Solar Power Project in Tuticorin</strong>, alongside industrial rooftop solar plants across Sriperumbudur, Hosur, and Coimbatore.",
        "sectors": "Utility-scale ground-mounted solar PV power parks, industrial captive solar plants, commercial corporate rooftop solar arrays, and high-voltage grid evacuation switchyards."
    }
]

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{meta_desc}">
    <meta name="keywords" content="{meta_keywords}">
    <meta name="author" content="AARAA Infrastructure Pvt. Ltd.">
    <title>{title}</title>
    
    <!-- Advanced SEO & Canonical -->
    <link rel="canonical" href="{canonical_url}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    
    <!-- Open Graph -->
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{meta_desc}">
    <meta property="og:image" content="https://www.aaraainfrastructure.com/logo.png">
    <meta property="og:url" content="{canonical_url}">
    <meta property="og:type" content="website">

    <!-- Schema: ConstructionBusiness & Service -->
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "ConstructionBusiness",
      "name": "AARAA Infrastructure Pvt. Ltd. - {location_name} Solar EPC Division",
      "image": "https://www.aaraainfrastructure.com/logo.png",
      "url": "{canonical_url}",
      "telephone": "+918681003111",
      "address": {{
        "@type": "PostalAddress",
        "addressRegion": "{location_name}",
        "addressCountry": "IN"
      }},
      "description": "Leading Solar EPC contractor in {location_name} specializing in turnkey engineering, procurement, and construction for utility-scale solar parks, industrial rooftop solar, and commercial solar power plants."
    }}
    </script>

    <!-- Schema: FAQPage -->
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {{
          "@type": "Question",
          "name": "What type of turnkey solar EPC projects does AARAA handle in {location_name}?",
          "acceptedAnswer": {{
            "@type": "Answer",
            "text": "AARAA Infrastructure handles utility-scale ground-mounted solar power plants, industrial captive rooftop solar systems, commercial solar arrays, and wind-solar hybrid Balance of Plant (BoP) packages across {location_name}."
          }}
        }},
        {{
          "@type": "Question",
          "name": "What objective criteria should be used to evaluate top 10 solar EPC contractors in {location_name}?",
          "acceptedAnswer": {{
            "@type": "Answer",
            "text": "When evaluating top 10 solar EPC contractors in {location_name}, assess turnkey BoP engineering capability, proven multi-megawatt solar references, DISCOM/grid evacuation clearance experience, Tier-1 module procurement networks, and ISO 9001:2015 quality standards."
          }}
        }},
        {{
          "@type": "Question",
          "name": "What makes AARAA Infrastructure a leading Solar EPC contractor in {location_name}?",
          "acceptedAnswer": {{
            "@type": "Answer",
            "text": "AARAA Infrastructure is recognized as a leading Solar EPC contractor in {location_name} due to our execution of landmark mega-projects like the 180 MWp Tuticorin Solar Project and 140.6 MW Kudligi Hybrid Project, tier-1 vendor partnerships, and ISO 9001:2015 certified engineering."
          }}
        }},
        {{
          "@type": "Question",
          "name": "Does AARAA provide single-point turnkey accountability for civil, structural, DC/AC electrical, and grid evacuation packages?",
          "acceptedAnswer": {{
            "@type": "Answer",
            "text": "Yes. As a full-service Solar EPC contractor, we manage end-to-end solar engineering design, tier-1 module/inverter procurement, MMS pile foundations, AC/DC cabling, pooling switchyards, and DISCOM grid commissioning under a single turnkey contract."
          }}
        }}
      ]
    }}
    </script>
    
    <!-- Schema: BreadcrumbList -->
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.aaraainfrastructure.com/"}},
        {{"@type": "ListItem", "position": 2, "name": "Completed Projects", "item": "https://www.aaraainfrastructure.com/completed-projects"}},
        {{"@type": "ListItem", "position": 3, "name": "{location_name} Solar EPC Contractor", "item": "{canonical_url}"}}
      ]
    }}
    </script>

    <link rel="icon" href="https://www.aaraainfrastructure.com/logo.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <style>
        :root {{ --primary: #ba0013; --primary-dark: #8b000e; --text-dark: #1e293b; --text-muted: #64748b; --bg-light: #f8fafc; }}
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{ font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: var(--text-dark); background: #fff; line-height: 1.6; }}
        .container {{ max-width: 1200px; margin: 0 auto; padding: 0 20px; }}
        
        .page-header {{ background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #fff; padding: 60px 0; border-bottom: 4px solid var(--primary); }}
        .badge {{ display: inline-block; background: rgba(186, 0, 19, 0.25); color: #f87171; border: 1px solid rgba(186, 0, 19, 0.5); padding: 4px 14px; border-radius: 20px; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }}
        .page-header h1 {{ font-size: 2.5rem; font-weight: 800; line-height: 1.2; margin-bottom: 16px; }}
        .page-header p {{ font-size: 1.15rem; color: #cbd5e1; max-width: 800px; }}

        .proof-box {{ background: var(--bg-light); border-left: 5px solid var(--primary); padding: 28px; border-radius: 8px; margin: 32px 0; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }}
        .proof-box h3 {{ color: var(--primary); font-size: 1.3rem; margin-bottom: 8px; font-weight: 700; }}

        .grid-2 {{ display: grid; grid-template-columns: 2fr 1fr; gap: 40px; padding: 48px 0; }}
        @media (max-width: 900px) {{ .grid-2 {{ grid-template-columns: 1fr; }} }}
        
        h2 {{ font-size: 1.8rem; font-weight: 700; color: #0f172a; margin: 32px 0 16px 0; }}
        p {{ margin-bottom: 16px; color: #334155; font-size: 1.05rem; }}
        ul {{ margin-bottom: 24px; padding-left: 20px; }}
        li {{ margin-bottom: 8px; color: #334155; }}
        
        .sidebar-card {{ background: var(--bg-light); border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px; position: sticky; top: 20px; }}
        .sidebar-card h3 {{ font-size: 1.25rem; margin-bottom: 16px; color: #0f172a; }}
        .btn-primary {{ display: block; width: 100%; text-align: center; background: var(--primary); color: #fff; text-decoration: none; padding: 14px 20px; border-radius: 8px; font-weight: 700; margin-top: 20px; transition: background 0.2s; }}
        .btn-primary:hover {{ background: var(--primary-dark); }}
        
        .faq-item {{ border-bottom: 1px solid #e2e8f0; padding: 20px 0; }}
        .faq-item h4 {{ font-size: 1.15rem; color: #0f172a; margin-bottom: 8px; font-weight: 600; }}
        
        .internal-links-box {{ background: #0f172a; color: #cbd5e1; padding: 40px 0; margin-top: 60px; }}
        .internal-links-box a {{ color: #94a3b8; text-decoration: none; margin-right: 16px; font-size: 0.9rem; }}
        .internal-links-box a:hover {{ color: #fff; text-decoration: underline; }}
    
        /* Top Brand Header Bar */
        .brand-topbar {{ background: #0b1120; border-bottom: 1px solid #1e293b; padding: 12px 0; }}
        .brand-topbar-inner {{ display: flex; align-items: center; justify-content: space-between; }}
        .brand-logo-link {{ display: flex; align-items: center; gap: 12px; text-decoration: none; color: #fff; font-weight: 700; font-size: 1.1rem; }}
        .brand-logo-img {{ height: 40px; width: auto; object-fit: contain; }}
        .brand-nav-links {{ display: flex; align-items: center; gap: 20px; }}
        .topbar-link {{ color: #94a3b8; text-decoration: none; font-size: 0.9rem; font-weight: 600; transition: color 0.2s; }}
        .topbar-link:hover {{ color: #fff; }}
        .topbar-btn {{ background: var(--primary); color: #fff !important; padding: 6px 16px; border-radius: 6px; }}
        .topbar-btn:hover {{ background: var(--primary-dark); }}
        @media (max-width: 640px) {{ .brand-nav-links {{ display: none; }} }}

        /* Prominent Solar EPC Enquiry Form Styles */
        .epc-enquiry-section {{ background: #0f172a; color: #fff; padding: 60px 0; border-top: 4px solid var(--primary); margin-top: 60px; }}
        .enquiry-card {{ background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 40px; max-width: 960px; margin: 0 auto; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }}
        .enquiry-header {{ text-align: center; margin-bottom: 36px; }}
        .enquiry-badge {{ display: inline-block; background: rgba(186, 0, 19, 0.25); color: #f87171; border: 1px solid rgba(186, 0, 19, 0.5); padding: 4px 16px; border-radius: 20px; font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }}
        .enquiry-header h2 {{ font-size: 2.2rem; color: #fff; margin-bottom: 12px; font-weight: 800; }}
        .enquiry-header p {{ color: #94a3b8; font-size: 1.05rem; max-width: 720px; margin: 0 auto; }}

        .epc-enquiry-form .form-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }}
        @media (max-width: 768px) {{ .epc-enquiry-form .form-grid {{ grid-template-columns: 1fr; }} }}
        
        .form-group {{ display: flex; flex-direction: column; margin-bottom: 16px; }}
        .form-group.full-width {{ grid-column: 1 / -1; }}
        .form-group label {{ font-size: 0.9rem; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; }}
        .form-group label .req {{ color: #f87171; }}
        .form-group input, .form-group select, .form-group textarea {{ background: #0f172a; border: 1px solid #475569; color: #fff; padding: 12px 16px; border-radius: 8px; font-size: 0.95rem; font-family: inherit; transition: border-color 0.2s, box-shadow 0.2s; }}
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {{ outline: none; border-color: #ba0013; box-shadow: 0 0 0 3px rgba(186, 0, 19, 0.3); }}
        .form-group select option {{ background: #0f172a; color: #fff; }}

        .consent-group {{ display: flex; align-items: flex-start; gap: 12px; margin: 20px 0; grid-column: 1 / -1; }}
        .consent-group input[type="checkbox"] {{ accent-color: #ba0013; width: 18px; height: 18px; margin-top: 3px; cursor: pointer; }}
        .consent-group label {{ font-size: 0.85rem; color: #94a3b8; line-height: 1.4; cursor: pointer; }}

        .btn-submit-epc {{ width: 100%; background: linear-gradient(135deg, #ba0013 0%, #8b000e 100%); color: #fff; border: none; padding: 18px 24px; border-radius: 10px; font-weight: 800; font-size: 1.1rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 10px; }}
        .btn-submit-epc:hover {{ background: linear-gradient(135deg, #d30016 0%, #a00010 100%); box-shadow: 0 10px 20px rgba(186, 0, 19, 0.4); transform: translateY(-2px); }}
        .btn-submit-epc:disabled {{ opacity: 0.6; cursor: not-allowed; transform: none; }}

        .form-feedback {{ padding: 16px; border-radius: 8px; margin-bottom: 20px; font-weight: 600; text-align: center; font-size: 0.95rem; grid-column: 1 / -1; }}
        .form-feedback.success {{ background: rgba(34, 197, 94, 0.15); border: 1px solid #22c55e; color: #4ade80; }}
        .form-feedback.error {{ background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #f87171; }}

    </style>
</head>
<body>

    <!-- Top Brand Navbar -->
    <div class="brand-topbar">
        <div class="container brand-topbar-inner">
            <a href="https://www.aaraainfrastructure.com/" class="brand-logo-link" title="AARAA Infrastructure Home">
                <img src="/logo.png" alt="AARAA Infrastructure Logo" class="brand-logo-img">
                <span class="brand-name">AARAA Infrastructure</span>
            </a>
            <div class="brand-nav-links">
                <a href="https://www.aaraainfrastructure.com/completed-projects" class="topbar-link"><i class="fa-solid fa-briefcase"></i> Projects</a>
                <a href="#solar-enquiry-form" class="topbar-link topbar-btn"><i class="fa-solid fa-sun"></i> Request Solar Consultation</a>
            </div>
        </div>
    </div>

    <header class="page-header">
        <div class="container">
            <span class="badge"><i class="fa-solid fa-sun"></i> Turnkey Solar &amp; Renewable EPC</span>
            <h1>{h1}</h1>
            <p>Integrated Solar Engineering Design, Tier-1 Equipment Procurement, High-Wind MMS Piling, AC/DC Integration, and Grid Commissioning across {location_name}.</p>
        </div>
    </header>

    <div class="container grid-2">
        <main>
            <div class="proof-box">
                <h3><i class="fa-solid fa-solar-panel"></i> {proof_title}</h3>
                <p>{proof_text}</p>
            </div>

            <h2>Why AARAA Is a Leading Solar EPC Contractor in {location_name}</h2>
            <p>When renewable energy developers, industrial plant owners, and commercial enterprise managers evaluate turnkey <strong>solar EPC contractors in {location_name}</strong> for capital solar investments, key selection parameters include single-point BoP accountability, proven mega-project references, DISCOM grid clearance experience, and tier-1 component partnerships. Here is why AARAA Infrastructure is recognized among the leading solar engineering and construction providers:</p>
            <ul>
                <li><strong>Single-Source Turnkey Solar EPC Accountability:</strong> Complete integration of solar PV array layout design, tier-1 module/inverter procurement, MMS pile foundations, AC/DC cabling, pooling switchyards, and DISCOM commissioning under a single contract.</li>
                <li><strong>Proven Multi-Megawatt Execution:</strong> Builders of civil, structural, and electrical BoP packages for flagship installations including the 180 MWp Tuticorin Solar Project and 140.6 MW Kudligi Hybrid Project.</li>
                <li><strong>DISCOM &amp; Grid Evacuation Expertise:</strong> Established engineering clearance workflows for State Electricity Boards, TANTRANSCO, KPTCL, TSTRANSCO, MSEDCL, and Central Transmission Utility (CTU) grid interconnections.</li>
                <li><strong>ISO 9001:2015 Quality &amp; Safety Assurance:</strong> Certified quality management systems, structural wind-shear load calculations, pull-out testing, and a zero-compromise site safety record.</li>
            </ul>

            <h2>Leading Solar EPC Contractors to Consider in {location_name} (Evaluation Criteria)</h2>
            <p>When evaluating the <strong>top 10 solar EPC contractors in {location_name}</strong> for utility-scale solar parks or commercial captive power plants, selection should be based on objective technical and execution methodology:</p>
            <ul>
                <li><strong>1. Single-Point Turnkey Accountability:</strong> Integrated design-build responsibility eliminating multi-vendor coordination risks.</li>
                <li><strong>2. Proven Solar BoP Track Record:</strong> Verified experience in delivering high-capacity utility solar parks or industrial rooftop solar plants.</li>
                <li><strong>3. In-House Electrical &amp; Structural Design:</strong> Expert solar PV array modeling (PVsyst), 3D shading analysis, and high-wind MMS foundation engineering.</li>
                <li><strong>4. Tier-1 Procurement Networks:</strong> Direct supply partnerships for ALMM-approved solar modules, Tier-1 central/string inverters, and galvanised steel mounting structures.</li>
                <li><strong>5. DISCOM &amp; CEIG Clearance Expertise:</strong> Established permit workflows for Chief Electrical Inspectorate to Government (CEIG) approvals and net-metering/open-access PPA clearances.</li>
                <li><strong>6. High-Wind Shear Structural Piling:</strong> Precision foundation piling, anti-corrosive MMS coating, and soil pull-out testing for long-term storm resilience.</li>
                <li><strong>7. High-Voltage Switchyard Capability:</strong> Turnkey construction of 33kV / 110kV / 220kV pooling substations and transmission lines.</li>
                <li><strong>8. Financial Solvency &amp; Bank Guarantees:</strong> Strong financial baseline capable of supporting performance bank guarantees (PBG).</li>
                <li><strong>9. Strict Generation &amp; Timeline Guarantees:</strong> Guaranteed Performance Ratio (PR) testing and adherence to critical-path COD timelines.</li>
                <li><strong>10. Comprehensive O&amp;M Support:</strong> Post-commissioning operation &amp; maintenance, SCADA monitoring, module cleaning, and warranty management.</li>
            </ul>

            <h2>Solar EPC Services Offered in {location_name}</h2>
            <p>As a full-service <strong>solar EPC contractor in {location_name}</strong>, AARAA delivers end-to-end solar engineering, procurement, and construction packages:</p>
            <ul>
                <li><strong>Engineering &amp; Solar PV Design:</strong> PVsyst yield simulation, shadow analysis, structural foundation calculations, DC string sizing, and AC single-line diagrams (SLD).</li>
                <li><strong>Tier-1 Equipment Procurement:</strong> Procurement of ALMM-listed Mono-PERC / TOPCon bifacial modules, string/central inverters, SCADA systems, and SCBA fire protection.</li>
                <li><strong>Civil &amp; Mechanical Execution:</strong> Site levelling, MMS pile foundation driving, tracker/fixed-tilt structure assembly, and solar module mounting.</li>
                <li><strong>Electrical &amp; Grid Evacuation:</strong> Underground DC/AC trench cabling, inverter duty transformers, 33kV switchyard erection, and DISCOM grid synchronization.</li>
            </ul>

            <h2>Solar Projects &amp; Sectors Served in {location_name}</h2>
            <p>Our solar engineering division delivers specialized EPC packages across key renewable sectors in {location_name}:</p>
            <p>{sectors}</p>

            <h2>Solar EPC Project Execution Process</h2>
            <p>AARAA executes solar power projects across {location_name} using a disciplined 9-stage engineering workflow:</p>
            <ol style="margin-left: 20px; margin-bottom: 24px; color: #334155;">
                <li><strong>1. Requirement Assessment:</strong> Energy demand profiling, tariff evaluation, and open-access / captive feasibility analysis.</li>
                <li><strong>2. Site Evaluation:</strong> Solar irradiance (GHI) measurement, topography surveying, geotechnical soil pull-out testing, and shadow mapping.</li>
                <li><strong>3. Engineering &amp; Design:</strong> Detailed engineering design, PVsyst simulation, structural wind calculations, and SLD finalization.</li>
                <li><strong>4. Strategic Procurement:</strong> Factory inspection, Tier-1 module/inverter procurement, and logistics dispatch management.</li>
                <li><strong>5. Civil &amp; Foundation Execution:</strong> Site grading, drainage construction, and concrete/rammed pile foundation driving.</li>
                <li><strong>6. Mechanical Installation:</strong> MMS structure erection, torque tightening, and solar module mounting with anti-theft fasteners.</li>
                <li><strong>7. Electrical Integration:</strong> Inverter installation, transformer positioning, HT/LT cable laying, and SCADA integration.</li>
                <li><strong>8. Testing &amp; Commissioning:</strong> Pre-commissioning insulation testing, PR testing, CEIG inspection, and DISCOM grid synchronization.</li>
                <li><strong>9. Handover &amp; O&amp;M:</strong> As-built documentation handover, SCADA monitoring setup, and long-term O&amp;M transition.</li>
            </ol>

            <h2>Frequently Asked Questions</h2>
            <div class="faq-item">
                <h4>What makes AARAA Infrastructure a leading solar EPC contractor in {location_name}?</h4>
                <p>AARAA Infrastructure is recognized as a leading solar EPC contractor in {location_name} due to our execution of multi-megawatt projects like the 180 MWp Tuticorin Solar Project, single-source turnkey accountability, and Tier-1 procurement networks.</p>
            </div>
            <div class="faq-item">
                <h4>What objective criteria should be used to evaluate top 10 solar EPC contractors in {location_name}?</h4>
                <p>Evaluate turnkey BoP design-build capability, proven multi-megawatt solar references, DISCOM/grid evacuation clearance experience, Tier-1 procurement networks, and ISO 9001:2015 safety standards.</p>
            </div>
            <div class="faq-item">
                <h4>Does AARAA manage CEIG approvals, DISCOM net-metering, and open-access approvals in {location_name}?</h4>
                <p>Yes. Our turnkey Solar EPC service includes handling engineering documentation for Chief Electrical Inspectorate to Government (CEIG) approvals, DISCOM net-metering, and group captive open-access PPA clearances.</p>
            </div>
        </main>

        <aside>
            <div class="sidebar-card">
                <h3><i class="fa-solid fa-sun" style="color: var(--primary);"></i> Partner for {location_name} Solar EPC</h3>
                <p>Discuss your utility, industrial, or commercial solar EPC requirements directly with our senior renewable engineering team.</p>
                <a href="#solar-enquiry-form" class="btn-primary">GET A SOLAR EPC PROJECT CONSULTATION</a>
                
                <div style="margin-top: 24px; font-size: 0.85rem; color: var(--text-muted);">
                    <p><i class="fa-solid fa-phone" style="color: var(--primary);"></i> <strong>Direct Line:</strong> +91 868 100 3111</p>
                    <p><i class="fa-solid fa-envelope" style="color: var(--primary);"></i> <strong>Direct Email:</strong> aaraainfrastructure@gmail.com</p>
                    <p><i class="fa-solid fa-shield-halved" style="color: var(--primary);"></i> <strong>Certification:</strong> ISO 9001:2015</p>
                </div>
            </div>
        </aside>
    </div>

    <!-- Prominent Solar EPC Project Enquiry Form -->
    <section class="epc-enquiry-section" id="solar-enquiry-form">
        <div class="container">
            <div class="enquiry-card">
                <div class="enquiry-header">
                    <span class="enquiry-badge"><i class="fa-solid fa-solar-panel"></i> Direct Technical Channel</span>
                    <h2>GET A SOLAR EPC PROJECT CONSULTATION</h2>
                    <p>Submit your utility, industrial, commercial, or hybrid solar project parameters directly to our senior renewable engineering team in {location_name}. Delivered directly to <strong>aaraainfrastructure@gmail.com</strong>.</p>
                </div>

                <form id="solarForm_{location_key}" class="epc-enquiry-form" action="/api/submit" method="POST" novalidate>
                    <input type="hidden" name="_formType" value="Solar EPC Project Consultation">
                    <input type="hidden" name="origin_url" id="origin_url_{location_key}">
                    <input type="hidden" name="page_location" value="{location_name} Solar EPC Page">
                    <input type="hidden" name="utm_source" id="utm_source_{location_key}">
                    <input type="hidden" name="utm_medium" id="utm_medium_{location_key}">
                    <input type="hidden" name="utm_campaign" id="utm_campaign_{location_key}">
                    <input type="hidden" name="utm_term" id="utm_term_{location_key}">
                    <input type="hidden" name="utm_content" id="utm_content_{location_key}">
                    <!-- Anti-spam Honeypot -->
                    <input type="text" name="_honeypot" style="display:none !important;" tabindex="-1" autocomplete="off">

                    <div class="form-grid">
                        <div class="form-group">
                            <label for="name_{location_key}">Full Name <span class="req">*</span></label>
                            <input type="text" id="name_{location_key}" name="name" required placeholder="e.g. Vikram Sharma">
                        </div>
                        
                        <div class="form-group">
                            <label for="company_{location_key}">Company / Organization Name <span class="req">*</span></label>
                            <input type="text" id="company_{location_key}" name="company" required placeholder="e.g. SolarTech Energy Private Limited">
                        </div>

                        <div class="form-group">
                            <label for="email_{location_key}">Email Address <span class="req">*</span></label>
                            <input type="email" id="email_{location_key}" name="email" required placeholder="e.g. vsharma@solartech.com">
                        </div>

                        <div class="form-group">
                            <label for="phone_{location_key}">Phone Number / WhatsApp Number <span class="req">*</span></label>
                            <input type="tel" id="phone_{location_key}" name="phone" required placeholder="e.g. +91 98765 43210">
                        </div>

                        <div class="form-group">
                            <label for="project_location_{location_key}">Project Location <span class="req">*</span></label>
                            <input type="text" id="project_location_{location_key}" name="project_location" required value="{location_name}">
                        </div>

                        <div class="form-group">
                            <label for="project_type_{location_key}">Project Type <span class="req">*</span></label>
                            <select id="project_type_{location_key}" name="project_type" required>
                                <option value="">-- Select Project Type --</option>
                                <option value="Utility-Scale Solar">Utility-Scale Solar</option>
                                <option value="Industrial Solar">Industrial Solar</option>
                                <option value="Commercial Solar">Commercial Solar</option>
                                <option value="Rooftop Solar">Rooftop Solar</option>
                                <option value="Ground-Mounted Solar">Ground-Mounted Solar</option>
                                <option value="Solar Power Plant">Solar Power Plant</option>
                                <option value="Hybrid Renewable Energy">Hybrid Renewable Energy</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="solar_capacity_{location_key}">Solar Capacity / Estimated Capacity</label>
                            <input type="text" id="solar_capacity_{location_key}" name="solar_capacity" placeholder="e.g. 5 MWp / 500 kWp / 100 MWp">
                        </div>

                        <div class="form-group">
                            <label for="project_size_{location_key}">Project Size / Available Land Area</label>
                            <input type="text" id="project_size_{location_key}" name="project_size" placeholder="e.g. 20 Acres / 50,000 Sq.Ft Roof Area">
                        </div>

                        <div class="form-group">
                            <label for="budget_{location_key}">Estimated Project Budget</label>
                            <select id="budget_{location_key}" name="budget">
                                <option value="">-- Select Estimated Budget --</option>
                                <option value="₹2 Cr – ₹10 Cr">₹2 Cr – ₹10 Cr</option>
                                <option value="₹10 Cr – ₹50 Cr">₹10 Cr – ₹50 Cr</option>
                                <option value="₹50 Cr – ₹200 Cr">₹50 Cr – ₹200 Cr</option>
                                <option value="Above ₹200 Cr">Above ₹200 Cr</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="start_date_{location_key}">Expected Project Start Date</label>
                            <input type="date" id="start_date_{location_key}" name="start_date">
                        </div>

                        <div class="form-group full-width">
                            <label for="services_required_{location_key}">Services Required</label>
                            <select id="services_required_{location_key}" name="services_required">
                                <option value="Solar EPC (Complete Turnkey Design + Procurement + Build)">Solar EPC (Complete Turnkey Design + Procurement + Build)</option>
                                <option value="Engineering">Engineering &amp; PVsyst Yield Design Only</option>
                                <option value="Procurement">Procurement (Tier-1 Modules &amp; Inverters)</option>
                                <option value="Construction">Construction &amp; Foundation Piling Only</option>
                                <option value="Turnkey Solar Project">Turnkey Solar Project Execution</option>
                                <option value="Solar Power Plant Installation">Solar Power Plant Installation</option>
                                <option value="Project Management">Project Management &amp; BoP Execution</option>
                                <option value="Testing &amp; Commissioning">Testing &amp; Grid Commissioning</option>
                                <option value="O&amp;M">Operation &amp; Maintenance (O&amp;M)</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group full-width">
                        <label for="description_{location_key}">Project Requirement / Description <span class="req">*</span></label>
                        <textarea id="description_{location_key}" name="description" rows="4" required placeholder="Briefly describe your land availability, DISCOM connectivity status, tariff model, or engineering scope..."></textarea>
                    </div>

                    <div class="form-group full-width">
                        <label for="message_{location_key}">Additional Message / Notes</label>
                        <input type="text" id="message_{location_key}" name="message" placeholder="Any specific substation voltage, module preference (TOPCon/Mono-PERC), or timeline constraints...">
                    </div>

                    <div class="consent-group">
                        <input type="checkbox" id="consent_{location_key}" name="consent" required checked>
                        <label for="consent_{location_key}">I agree to share these solar project parameters with AARAA Infrastructure for technical proposal evaluation. Privacy guaranteed.</label>
                    </div>

                    <div id="formFeedback_{location_key}" class="form-feedback" style="display:none;"></div>

                    <button type="submit" id="submitBtn_{location_key}" class="btn-submit-epc">
                        <i class="fa-solid fa-sun"></i> GET A SOLAR EPC PROJECT CONSULTATION
                    </button>
                </form>
            </div>
        </div>
    </section>

    <footer class="internal-links-box">
        <div class="container">
            <p style="margin-bottom: 12px; font-weight: 700; color: #fff;">Explore Related Infrastructure &amp; Solar Services:</p>
            <a href="https://www.aaraainfrastructure.com/180-mwp-solar-power-project-tuticorin">180 MWp Tuticorin Solar Case Study</a>
            <a href="https://www.aaraainfrastructure.com/140.6_MW_Capacity_Wind–Solar_Hybrid_Power_Project">140.6 MW Kudligi Hybrid Case Study</a>
            <a href="https://www.aaraainfrastructure.com/location/{location_key}/epc-contractor">Turnkey EPC Contractors in {location_name}</a>
            <a href="https://www.aaraainfrastructure.com/completed-projects">All Completed Projects</a>
            <a href="https://www.aaraainfrastructure.com/contact-us">Contact Solar Engineering Team</a>
        </div>
    </footer>

    <!-- Form Handler & Conversion Tracking Script -->
    <script>
    document.addEventListener("DOMContentLoaded", function() {{
        var form = document.getElementById("solarForm_{location_key}");
        if (!form) return;

        // Auto-fill hidden source URL & UTM parameters
        document.getElementById("origin_url_{location_key}").value = window.location.href;
        var urlParams = new URLSearchParams(window.location.search);
        ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach(function(param) {{
            var el = document.getElementById(param + "_{location_key}");
            if (el && urlParams.has(param)) {{
                el.value = urlParams.get(param);
            }}
        }});

        form.addEventListener("submit", async function(e) {{
            e.preventDefault();
            var feedback = document.getElementById("formFeedback_{location_key}");
            var submitBtn = document.getElementById("submitBtn_{location_key}");

            feedback.style.display = "none";
            feedback.className = "form-feedback";

            // Basic Validation
            var name = document.getElementById("name_{location_key}").value.trim();
            var company = document.getElementById("company_{location_key}").value.trim();
            var email = document.getElementById("email_{location_key}").value.trim();
            var phone = document.getElementById("phone_{location_key}").value.trim();
            var projectLoc = document.getElementById("project_location_{location_key}").value.trim();
            var projectType = document.getElementById("project_type_{location_key}").value.trim();
            var description = document.getElementById("description_{location_key}").value.trim();
            var consent = document.getElementById("consent_{location_key}").checked;

            if (!name || !company || !email || !phone || !projectLoc || !projectType || !description) {{
                feedback.className = "form-feedback error";
                feedback.innerText = "Please fill in all required fields marked with an asterisk (*).";
                feedback.style.display = "block";
                return;
            }}

            if (!consent) {{
                feedback.className = "form-feedback error";
                feedback.innerText = "Please check the consent checkbox to proceed.";
                feedback.style.display = "block";
                return;
            }}

            // Disable button to prevent duplicate submissions
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting Solar Project Enquiry...';

            try {{
                var formData = new FormData(form);
                var payload = {{}};
                formData.forEach(function(value, key) {{
                    payload[key] = value;
                }});

                var response = await fetch("/api/submit", {{
                    method: "POST",
                    headers: {{ "Content-Type": "application/json" }},
                    body: JSON.stringify(payload)
                }});

                var result = await response.json();

                if (response.ok && result.success) {{
                    feedback.className = "form-feedback success";
                    feedback.innerText = "Thank you! Your Solar EPC Project Enquiry has been submitted successfully to aaraainfrastructure@gmail.com. (Ref ID: " + (result.submission_id || "AARAA-SOLAR") + "). Our senior renewable engineering team will contact you within 24 hours.";
                    feedback.style.display = "block";
                    form.reset();

                    // Lead Conversion Event Tracking for SEO Analytics
                    if (window.gtag) {{
                        gtag("event", "generate_lead", {{
                            event_category: "Solar_EPC_Enquiry",
                            event_label: "{location_name} Solar EPC Landing Page",
                            value: 1
                        }});
                    }}
                    window.dispatchEvent(new CustomEvent("solar_epc_lead_submitted", {{
                        detail: {{
                            location: "{location_name}",
                            submissionId: result.submission_id,
                            timestamp: new Date().toISOString()
                        }}
                    }}));

                    submitBtn.innerHTML = '<i class="fa-solid fa-check-circle"></i> Solar Enquiry Sent Successfully!';
                }} else {{
                    feedback.className = "form-feedback error";
                    feedback.innerText = result.message || "Failed to submit enquiry. Please try again or call +91 868 100 3111 directly.";
                    feedback.style.display = "block";
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-sun"></i> GET A SOLAR EPC PROJECT CONSULTATION';
                }}
            }} catch (err) {{
                console.error("Submission error:", err);
                feedback.className = "form-feedback error";
                feedback.innerText = "Network connection error. Please try again or email aaraainfrastructure@gmail.com directly.";
                feedback.style.display = "block";
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-sun"></i> GET A SOLAR EPC PROJECT CONSULTATION';
            }}
        }});
    }});
    </script>

</body>
</html>
"""

created_count = 0
updated_count = 0

for page in SOLAR_PAGES_DATA:
    fpath = page["file_path"]
    os.makedirs(os.path.dirname(fpath), exist_ok=True)
    
    html_content = HTML_TEMPLATE.format(**page)
    
    existed = os.path.exists(fpath)
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(html_content)
        
    if existed:
        updated_count += 1
        print(f"ENHANCED existing Solar page: {fpath}")
    else:
        created_count += 1
        print(f"CREATED new Solar page: {fpath}")

print(f"\nDone! Created {created_count} new Solar pages, Enhanced {updated_count} existing Solar pages.")
