import os

PAGES_DATA = [
    {
        "location_key": "karnataka",
        "file_path": "legacy-pages/location/karnataka/epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/karnataka/epc-contractor",
        "location_name": "Karnataka",
        "title": "Top EPC Contractors in Karnataka | Turnkey Industrial & Solar EPC | AARAA",
        "meta_desc": "Explore leading EPC contractors in Karnataka for turnkey solar, industrial & civil projects. Proven execution of 140.6 MW Kudligi hybrid project. Request consultation.",
        "meta_keywords": "EPC Contractors in Karnataka, Top EPC Contractors in Karnataka, Top 10 EPC Contractors in Karnataka, Turnkey EPC Companies Karnataka, Solar EPC Karnataka",
        "h1": "EPC Contractors in Karnataka | Leading Turnkey Industrial & Solar EPC",
        "proof_title": "Verified Karnataka Renewable Reference: 140.6 MW Wind-Solar Hybrid Power Project, Kudligi",
        "proof_text": "AARAA Infrastructure demonstrated utility-scale turnkey EPC engineering in Karnataka by executing civil, structural, and electrical Balance of Plant (BoP) packages for the <strong>140.6 MW Wind-Solar Hybrid Power Project in Kudligi, Karnataka</strong>.",
        "sectors": "Utility solar & hybrid power parks, industrial PEB manufacturing plants in Bidadi & Bengaluru, heavy civil utility infrastructure, and commercial real estate."
    },
    {
        "location_key": "delhi",
        "file_path": "legacy-pages/location/delhi/epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/delhi/epc-contractor",
        "location_name": "Delhi",
        "title": "Top EPC Contractors in Delhi | Turnkey Industrial & Civil EPC | AARAA",
        "meta_desc": "Leading EPC contractors in Delhi providing turnkey industrial, PEB warehouse & commercial EPC execution across Delhi NCR. Request a technical consultation.",
        "meta_keywords": "EPC Contractors in Delhi, Top EPC Contractors in Delhi, Top 10 EPC Contractors in Delhi, Turnkey EPC Companies Delhi NCR, Industrial EPC Contractors Delhi",
        "h1": "EPC Contractors in Delhi | Leading Turnkey Infrastructure & Industrial EPC",
        "proof_title": "Turnkey EPC Engineering Capability in Delhi NCR",
        "proof_text": "AARAA Infrastructure delivers multi-disciplinary EPC contracting services across Delhi, combining structural steel engineering, pre-engineered building (PEB) factory sheds, heavy civil foundations, and corporate interior execution.",
        "sectors": "Pre-engineered industrial warehouses, distribution centers, commercial office buildings, institutional campuses, and civic infrastructure packages."
    },
    {
        "location_key": "mumbai",
        "file_path": "legacy-pages/location/mumbai/epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/mumbai/epc-contractor",
        "location_name": "Mumbai",
        "title": "Top EPC Contractors in Mumbai | Turnkey Commercial & Civil EPC | AARAA",
        "meta_desc": "Leading EPC contractors in Mumbai delivering high-rise corporate office civil framing, commercial fitouts & industrial EPC across Mumbai. Get an EPC project consultation.",
        "meta_keywords": "EPC Contractors in Mumbai, Top EPC Contractors in Mumbai, Top 10 EPC Contractors in Mumbai, Turnkey EPC Companies Mumbai, Corporate Fitouts BKC",
        "h1": "EPC Contractors in Mumbai | Leading Turnkey Commercial & Civil EPC",
        "proof_title": "Commercial & Civil Infrastructure Credentials in Mumbai",
        "proof_text": "With our branch office at WeWork, Oberoi Commerz II, Mumbai, AARAA Infrastructure delivers core-and-shell commercial civil construction, post-tensioned RCC framing, curtain-wall facade engineering, and Grade-A corporate interior fitouts across BKC, Lower Parel, and Navi Mumbai.",
        "sectors": "High-rise commercial office towers, corporate office interiors, industrial PEB units in Thane/Navi Mumbai, and heavy civil utility structures."
    },
    {
        "location_key": "andhra-pradesh",
        "file_path": "legacy-pages/location/andhra-pradesh/epc-contractors.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/andhra-pradesh/epc-contractors",
        "location_name": "Andhra Pradesh",
        "title": "Top EPC Contractors in Andhra Pradesh | Turnkey Industrial & Civil EPC | AARAA",
        "meta_desc": "Leading EPC contractors in Andhra Pradesh providing turnkey industrial plant construction & PEB factory sheds across Sri City SEZ & AP. Request an EPC proposal.",
        "meta_keywords": "EPC Contractors in Andhra Pradesh, Top EPC Contractors in Andhra Pradesh, Top 10 EPC Contractors in Andhra Pradesh, Turnkey EPC Companies AP, Industrial EPC Sri City",
        "h1": "EPC Contractors in Andhra Pradesh | Leading Industrial & Turnkey EPC",
        "proof_title": "Industrial EPC & PEB Execution Credentials in Andhra Pradesh",
        "proof_text": "AARAA Infrastructure delivers turnkey EPC engineering, PEB factory construction, heavy machine foundations, and industrial utility infrastructure across Southern Andhra Pradesh, leveraging our close proximity to Sri City SEZ and the Chennai-Bengaluru industrial corridor.",
        "sectors": "Industrial manufacturing plants in Sri City SEZ, automated logistics warehousing, heavy machine press foundations, and utility infrastructure."
    },
    {
        "location_key": "tuticorin",
        "file_path": "legacy-pages/location/tuticorin/epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/tuticorin/epc-contractor",
        "location_name": "Tuticorin",
        "title": "Top EPC Contractors in Tuticorin | 180 MWp Proven Solar EPC | AARAA",
        "meta_desc": "Leading EPC contractors in Tuticorin (Thoothukudi). Executed the landmark 180 MWp Utility Solar Power Project. Request an EPC project consultation.",
        "meta_keywords": "EPC Contractors in Tuticorin, Top EPC Contractors in Tuticorin, Top 10 EPC Contractors in Tuticorin, Solar EPC Contractors Thoothukudi, Industrial EPC Tuticorin",
        "h1": "EPC Contractors in Tuticorin (Thoothukudi) | Leading Solar & Industrial EPC",
        "proof_title": "Verified Flagship Reference: 180 MWp Utility Solar Power Project, Tuticorin",
        "proof_text": "AARAA Infrastructure served as primary civil, structural, and electrical BoP contractor for the landmark <strong>180 MWp Utility Solar Power Project in Tuticorin (Thoothukudi), Tamil Nadu</strong>, demonstrating heavy coastal foundation piling, anti-corrosive MMS installation, and switchyard construction.",
        "sectors": "Utility solar PV power parks, coastal civil engineering, heavy industrial foundation structures, port logistics warehouses, and precast drainage."
    },
    {
        "location_key": "tirunelveli",
        "file_path": "legacy-pages/location/tirunelveli/epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/tirunelveli/epc-contractor",
        "location_name": "Tirunelveli",
        "title": "Top EPC Contractors in Tirunelveli | Solar & Industrial EPC | AARAA",
        "meta_desc": "Leading EPC contractors in Tirunelveli delivering high wind-load solar BoP, PEB factory sheds & industrial civil packages across South TN. Request technical consultation.",
        "meta_keywords": "EPC Contractors in Tirunelveli, Top EPC Contractors in Tirunelveli, Top 10 EPC Contractors in Tirunelveli, Solar EPC Tirunelveli, Industrial EPC Gangaikondan",
        "h1": "EPC Contractors in Tirunelveli | Leading Solar & Industrial EPC",
        "proof_title": "Regional Renewable & Industrial Execution Reference in South Tamil Nadu",
        "proof_text": "AARAA Infrastructure brings multi-megawatt renewable engineering expertise to Tirunelveli, backed by our execution of the <strong>180 MWp Utility Solar Power Project in neighboring Tuticorin (~50 km)</strong> and industrial PEB execution across Gangaikondan SIPCOT.",
        "sectors": "Utility solar power parks, high wind-shear foundation engineering, industrial manufacturing sheds, and high-voltage grid evacuation switchyards."
    },
    {
        "location_key": "gadag",
        "file_path": "legacy-pages/location/gadag/epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/gadag/epc-contractor",
        "location_name": "Gadag",
        "title": "Top EPC Contractors in Gadag | Solar & Industrial EPC | AARAA",
        "meta_desc": "Leading EPC contractors in Gadag, Karnataka. Delivering turnkey solar BoP, wind-solar hybrid & industrial civil engineering across North Karnataka.",
        "meta_keywords": "EPC Contractors in Gadag, Top EPC Contractors in Gadag, Top 10 EPC Contractors in Gadag, Solar EPC Contractors Gadag, Renewable Energy EPC North Karnataka",
        "h1": "EPC Contractors in Gadag | Leading Solar & Industrial EPC",
        "proof_title": "North Karnataka Renewable Infrastructure Reference",
        "proof_text": "AARAA Infrastructure delivers turnkey solar and industrial EPC contracting across North Karnataka, supported by our execution of the <strong>140.6 MW Wind-Solar Hybrid Power Project in neighboring Kudligi (~80 km)</strong>.",
        "sectors": "Utility-scale solar & hybrid energy parks, agricultural processing plant construction, industrial PEB sheds, and grid evacuation infrastructure."
    },
    {
        "location_key": "kudligi",
        "file_path": "legacy-pages/location/kudligi/epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/kudligi/epc-contractor",
        "location_name": "Kudligi",
        "title": "Top EPC Contractors in Kudligi | 140.6 MW Proven Hybrid EPC | AARAA",
        "meta_desc": "Leading EPC contractors in Kudligi, Karnataka. Proven execution of the 140.6 MW Wind-Solar Hybrid Power Project. Request an EPC project consultation.",
        "meta_keywords": "EPC Contractors in Kudligi, Top EPC Contractors in Kudligi, Top 10 EPC Contractors in Kudligi, Solar EPC Kudligi, Wind Solar Hybrid EPC Bellary",
        "h1": "EPC Contractors in Kudligi | Leading Utility Solar & Hybrid EPC",
        "proof_title": "Verified Landmark Reference: 140.6 MW Wind-Solar Hybrid Project, Kudligi",
        "proof_text": "AARAA Infrastructure proved its utility-scale renewable engineering capability in Kudligi, Bellary district, by delivering full civil, structural, and electrical BoP packages for the <strong>140.6 MW Wind-Solar Hybrid Power Project</strong>.",
        "sectors": "Wind-solar hybrid power plants, utility solar PV arrays, pooling switchyards, internal collection networks, and heavy equipment civil foundations."
    },
    {
        "location_key": "amaravati",
        "file_path": "legacy-pages/location/amaravati/epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/amaravati/epc-contractor",
        "location_name": "Amaravati",
        "title": "Top EPC Contractors in Amaravati | Turnkey Civil & Infrastructure EPC | AARAA",
        "meta_desc": "Leading EPC contractors in Amaravati. Delivering turnkey civil infrastructure, commercial buildings & industrial PEB packages across Andhra Pradesh capital region.",
        "meta_keywords": "EPC Contractors in Amaravati, Top EPC Contractors in Amaravati, Top 10 EPC Contractors in Amaravati, Turnkey EPC Companies AP, Capital Infrastructure Amaravati",
        "h1": "EPC Contractors in Amaravati | Leading Infrastructure & Civil EPC",
        "proof_title": "Capital & Regional Infrastructure EPC Capability in Andhra Pradesh",
        "proof_text": "AARAA Infrastructure provides turnkey EPC contracting, pre-engineered buildings, heavy foundation civil works, and commercial project execution across Andhra Pradesh industrial and urban corridors, backed by robust logistics networks.",
        "sectors": "Civic & institutional infrastructure, commercial office complexes, industrial PEB manufacturing units, and highway/utility drainage infrastructure."
    },
    {
        "location_key": "telangana",
        "file_path": "legacy-pages/location/telangana/epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/telangana/epc-contractor",
        "location_name": "Telangana",
        "title": "Top EPC Contractors in Telangana | Turnkey Industrial & Civil EPC | AARAA",
        "meta_desc": "Leading EPC contractors in Telangana. Delivering turnkey factory building construction, PEB warehouses & industrial EPC across TSIIC Hyderabad. Request consultation.",
        "meta_keywords": "EPC Contractors in Telangana, Top EPC Contractors in Telangana, Top 10 EPC Contractors in Telangana, Turnkey EPC Companies Hyderabad, Industrial EPC TSIIC",
        "h1": "EPC Contractors in Telangana | Leading Industrial & Turnkey EPC",
        "proof_title": "Industrial EPC & PEB Execution Credentials in Telangana",
        "proof_text": "AARAA Infrastructure delivers turnkey EPC contracting for industrial and pharmaceutical clients across Telangana (Hyderabad, Pashamylaram, Patancheru, TSIIC parks), handling factory construction, PEB structures, VNA concrete floors, and heavy press foundations.",
        "sectors": "Pharma & chemical manufacturing plants, automated logistics warehouses, PEB industrial sheds, and commercial infrastructure."
    },
    {
        "location_key": "ncr",
        "file_path": "legacy-pages/location/ncr/epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/ncr/epc-contractor",
        "location_name": "NCR",
        "title": "Top EPC Contractors in NCR | Turnkey Industrial & PEB EPC | AARAA",
        "meta_desc": "Leading EPC contractors in NCR (Delhi NCR). Delivering pre-engineered buildings, factory sheds & logistics warehouses across Noida, Gurugram & Faridabad.",
        "meta_keywords": "EPC Contractors in NCR, Top EPC Contractors in NCR, Top 10 EPC Contractors in Delhi NCR, Industrial EPC Noida Gurugram, PEB Warehouse Builders NCR",
        "h1": "EPC Contractors in NCR | Leading Industrial & Turnkey PEB EPC",
        "proof_title": "Industrial & PEB Warehouse Execution Credentials in Delhi NCR",
        "proof_text": "AARAA Infrastructure delivers high-spec pre-engineered industrial buildings, automated logistics distribution centers, FM2 VNA concrete floors, and heavy machine foundations across National Capital Region hubs (Noida, Greater Noida, Gurugram, Faridabad).",
        "sectors": "Logistics distribution hubs, automotive manufacturing units, electronic assembly plants, commercial fitouts, and heavy civil foundations."
    },
    {
        "location_key": "tamil-nadu",
        "file_path": "legacy-pages/location/tamil-nadu/epc-contractor.html",
        "canonical_url": "https://www.aaraainfrastructure.com/location/tamil-nadu/epc-contractor",
        "location_name": "Tamil Nadu",
        "title": "Top EPC Contractors in Tamil Nadu | Turnkey Civil, Industrial & Solar EPC | AARAA",
        "meta_desc": "Leading EPC contractors in Tamil Nadu. Delivering turnkey desalination civil works, 180 MWp solar BoP & industrial PEB across Tamil Nadu. Get an EPC project consultation.",
        "meta_keywords": "EPC Contractors in Tamil Nadu, Top EPC Contractors in Tamil Nadu, Top 10 EPC Contractors in Tamil Nadu, Turnkey EPC Companies TN, Heavy Civil EPC Chennai",
        "h1": "EPC Contractors in Tamil Nadu | Leading Infrastructure EPC",
        "proof_title": "Statewide Civil, Industrial & Renewable Infrastructure Credentials",
        "proof_text": "Headquartered in Guindy, Chennai, AARAA Infrastructure executed heavy civil foundations for the <strong>400 MLD SWRO Desalination Plant at Perur</strong>, full BoP scope for the <strong>180 MWp Solar Project in Tuticorin</strong>, and industrial PEB plants across Sriperumbudur and Hosur.",
        "sectors": "Desalination & water civil infrastructure, utility solar PV parks, industrial PEB manufacturing plants, corporate fitouts, and precast drainage."
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
      "name": "AARAA Infrastructure Pvt. Ltd. - {location_name} EPC Division",
      "image": "https://www.aaraainfrastructure.com/logo.png",
      "url": "{canonical_url}",
      "telephone": "+918681003111",
      "address": {{
        "@type": "PostalAddress",
        "addressRegion": "{location_name}",
        "addressCountry": "IN"
      }},
      "description": "Leading EPC contractor in {location_name} specializing in turnkey engineering, procurement, and construction for industrial, heavy civil, and renewable projects."
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
          "name": "What type of turnkey EPC projects does AARAA handle in {location_name}?",
          "acceptedAnswer": {{
            "@type": "Answer",
            "text": "AARAA Infrastructure handles large-scale industrial manufacturing plants, pre-engineered steel buildings (PEB), heavy civil infrastructure, commercial complexes, and renewable energy BoP packages across {location_name}."
          }}
        }},
        {{
          "@type": "Question",
          "name": "What objective criteria should be used to evaluate the top 10 EPC contractors in {location_name}?",
          "acceptedAnswer": {{
            "@type": "Answer",
            "text": "When evaluating top 10 EPC contractors in {location_name}, assess single-point turnkey accountability, proven project references, local regulatory permit experience, ISO 9001:2015 quality standards, and in-house engineering capabilities."
          }}
        }},
        {{
          "@type": "Question",
          "name": "What makes AARAA Infrastructure a leading EPC contractor in {location_name}?",
          "acceptedAnswer": {{
            "@type": "Answer",
            "text": "AARAA Infrastructure is recognized as a leading EPC contractor in {location_name} due to our execution of landmark multi-megawatt projects, single-source procurement networks, and certified ISO 9001:2015 quality engineering."
          }}
        }},
        {{
          "@type": "Question",
          "name": "Does AARAA provide single-point accountability for civil, structural, and MEP packages?",
          "acceptedAnswer": {{
            "@type": "Answer",
            "text": "Yes. As a full-service EPC contractor, we manage end-to-end engineering design, vendor procurement, civil construction, MEP integration, and regulatory commissioning under a single turnkey contract."
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
        {{"@type": "ListItem", "position": 3, "name": "{location_name} EPC Contractor", "item": "{canonical_url}"}}
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
        .badge {{ display: inline-block; background: rgba(186, 0, 19, 0.2); color: #f87171; border: 1px solid rgba(186, 0, 19, 0.4); padding: 4px 14px; border-radius: 20px; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }}
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

        /* Prominent EPC Project Enquiry Form Styles */
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
                <a href="#enquiry-form" class="topbar-link topbar-btn"><i class="fa-solid fa-paper-plane"></i> Request Consultation</a>
            </div>
        </div>
    </div>

    <header class="page-header">
        <div class="container">
            <span class="badge">Turnkey Engineering &amp; Construction</span>
            <h1>{h1}</h1>
            <p>Integrated Engineering Design, Strategic Procurement, Heavy Civil Construction, and Turnkey Project Execution across {location_name}.</p>
        </div>
    </header>

    <div class="container grid-2">
        <main>
            <div class="proof-box">
                <h3><i class="fa-solid fa-building-flag"></i> {proof_title}</h3>
                <p>{proof_text}</p>
            </div>

            <h2>Why AARAA Is a Leading EPC Contractor in {location_name}</h2>
            <p>When corporate developers and industrial investors evaluate turnkey <strong>EPC contractors in {location_name}</strong> for high-value infrastructure projects, key selection parameters include single-point accountability, mega-project execution references, safety records, and local regulatory expertise. Here is why AARAA Infrastructure is recognized among the leading engineering and construction providers:</p>
            <ul>
                <li><strong>Single-Source Turnkey EPC Accountability:</strong> Seamless integration of architectural/structural design, material procurement, civil construction, and MEP commissioning under a single contract.</li>
                <li><strong>Proven Project Execution:</strong> Demonstrated delivery of heavy civil foundations, pre-engineered buildings, and multi-megawatt renewable infrastructure.</li>
                <li><strong>Regulatory Permit Workflow Expertise:</strong> Established engineering clearance workflows for local municipal bodies, industrial development boards, and environmental authorities.</li>
                <li><strong>ISO 9001:2015 Quality &amp; Safety Assurance:</strong> Certified quality management systems, rigorous concrete testing, and a zero-compromise site safety record.</li>
            </ul>

            <h2>Evaluation Criteria for Top 10 EPC Contractors in {location_name}</h2>
            <p>When project owners evaluate the <strong>top 10 EPC contractors in {location_name}</strong> for industrial or commercial capital investments, selection should be based on objective technical and commercial methodology:</p>
            <ul>
                <li><strong>1. Single-Point Accountability:</strong> Integrated design-build responsibility eliminating multi-vendor coordination risks.</li>
                <li><strong>2. Proven Project Execution References:</strong> Track record in delivering high-capacity industrial manufacturing assets or utility infrastructure.</li>
                <li><strong>3. In-House Engineering &amp; BIM Capability:</strong> Experienced structural, civil, and MEP engineering design teams.</li>
                <li><strong>4. Strategic Procurement Networks:</strong> Certified supply chains for TMT steel, ready-mix concrete, and electrical switchgear assets.</li>
                <li><strong>5. Statutory &amp; Regulatory Clearance Expertise:</strong> Established permit workflows for local municipal bodies, pollution control boards, and fire safety authorities.</li>
                <li><strong>6. ISO 9001:2015 Quality &amp; Safety Systems:</strong> Certified quality management systems and a zero-compromise site safety record.</li>
                <li><strong>7. Financial Solvency &amp; Bank Guarantees:</strong> Strong financial baseline capable of supporting performance guarantees.</li>
                <li><strong>8. Precision Field Execution:</strong> Deep foundation piling, FM2 VNA industrial flooring, and heavy structural steel erection.</li>
                <li><strong>9. Strict Schedule Milestones:</strong> Adherence to critical-path project delivery timelines.</li>
                <li><strong>10. Post-Commissioning Warranty Support:</strong> Comprehensive O&amp;M handover and long-term asset warranty support.</li>
            </ul>

            <h2>Single-Point Turnkey EPC Lifecycle Execution</h2>
            <p>As a premier multidisciplinary <strong>EPC contractor in {location_name}</strong>, AARAA eliminates multi-vendor fragmentation by controlling the complete project lifecycle:</p>
            <ul>
                <li><strong>Engineering &amp; Design Optimization:</strong> Architectural planning, structural RCC/steel calculations, BIM modeling, and NBC statutory approval management.</li>
                <li><strong>Strategic Procurement:</strong> Vetted material supply chain networks for certified TMT steel, ready-mix concrete, electrical switchgear, and heavy MEP assets.</li>
                <li><strong>Turnkey Construction Execution:</strong> Heavy foundation engineering, deep excavation, structural framing, pre-engineered steel buildings (PEB), and high-grade finishing.</li>
            </ul>

            <h2>Key Sectors Served Across {location_name}</h2>
            <p>Our engineering division delivers specialized EPC packages across core economic sectors in {location_name}:</p>
            <p>{sectors}</p>

            <h2>Frequently Asked Questions</h2>
            <div class="faq-item">
                <h4>What makes AARAA Infrastructure a leading EPC contractor in {location_name}?</h4>
                <p>AARAA Infrastructure is recognized as a leading EPC contractor in {location_name} due to our proven execution of multi-megawatt projects, single-source turnkey accountability, and ISO 9001:2015 quality standards.</p>
            </div>
            <div class="faq-item">
                <h4>What objective criteria should be used to evaluate top 10 EPC contractors in {location_name}?</h4>
                <p>Evaluate turnkey design-build capability, proven local project references, local regulatory permit experience, ISO safety standards, and in-house engineering expertise.</p>
            </div>
            <div class="faq-item">
                <h4>Does AARAA manage statutory building permits and local clearances in {location_name}?</h4>
                <p>Yes. Our turnkey EPC service includes handling engineering documentation for local municipal bodies, industrial development boards, and environmental authorities.</p>
            </div>
        </main>

        <aside>
            <div class="sidebar-card">
                <h3><i class="fa-solid fa-handshake"></i> Partner for {location_name} EPC</h3>
                <p>Discuss your industrial, commercial, or civil EPC requirements directly with our senior engineering team.</p>
                <a href="#enquiry-form" class="btn-primary">Get an EPC Project Consultation</a>
                
                <div style="margin-top: 24px; font-size: 0.85rem; color: var(--text-muted);">
                    <p><i class="fa-solid fa-phone" style="color: var(--primary);"></i> <strong>Direct Line:</strong> +91 868 100 3111</p>
                    <p><i class="fa-solid fa-envelope" style="color: var(--primary);"></i> <strong>Direct Email:</strong> aaraainfrastructure@gmail.com</p>
                    <p><i class="fa-solid fa-shield-halved" style="color: var(--primary);"></i> <strong>Certification:</strong> ISO 9001:2015</p>
                </div>
            </div>
        </aside>
    </div>

    <!-- Prominent EPC Project Enquiry Form -->
    <section class="epc-enquiry-section" id="enquiry-form">
        <div class="container">
            <div class="enquiry-card">
                <div class="enquiry-header">
                    <span class="enquiry-badge"><i class="fa-solid fa-file-signature"></i> Direct Technical Channel</span>
                    <h2>Get an EPC Project Consultation</h2>
                    <p>Submit your industrial, commercial, civil, or renewable EPC project parameters directly to our senior engineering team in {location_name}. Delivered directly to <strong>aaraainfrastructure@gmail.com</strong>.</p>
                </div>

                <form id="epcForm_{location_key}" class="epc-enquiry-form" action="/api/submit" method="POST" novalidate>
                    <input type="hidden" name="_formType" value="EPC Project Consultation">
                    <input type="hidden" name="origin_url" id="origin_url_{location_key}">
                    <input type="hidden" name="page_location" value="{location_name} EPC Page">
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
                            <input type="text" id="name_{location_key}" name="name" required placeholder="e.g. Rajesh Kumar">
                        </div>
                        
                        <div class="form-group">
                            <label for="company_{location_key}">Company / Organization <span class="req">*</span></label>
                            <input type="text" id="company_{location_key}" name="company" required placeholder="e.g. Apex Industrial Solutions">
                        </div>

                        <div class="form-group">
                            <label for="email_{location_key}">Corporate Email <span class="req">*</span></label>
                            <input type="email" id="email_{location_key}" name="email" required placeholder="e.g. rkumar@apexind.com">
                        </div>

                        <div class="form-group">
                            <label for="phone_{location_key}">Phone / WhatsApp <span class="req">*</span></label>
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
                                <option value="Industrial Factory / PEB Warehouse">Industrial Factory / PEB Warehouse</option>
                                <option value="Utility Solar / Wind-Solar Hybrid Power">Utility Solar / Wind-Solar Hybrid Power</option>
                                <option value="Commercial Office Building &amp; Fitouts">Commercial Office Building &amp; Fitouts</option>
                                <option value="Heavy Civil Infrastructure / Water Project">Heavy Civil Infrastructure / Water Project</option>
                                <option value="Complete Turnkey EPC Contract">Complete Turnkey EPC Contract</option>
                                <option value="Other Infrastructure Works">Other Infrastructure Works</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="project_size_{location_key}">Project Size / Area</label>
                            <input type="text" id="project_size_{location_key}" name="project_size" placeholder="e.g. 100,000 Sq.Ft / 50 MWp / 10 MLD">
                        </div>

                        <div class="form-group">
                            <label for="budget_{location_key}">Estimated Budget</label>
                            <select id="budget_{location_key}" name="budget">
                                <option value="">-- Select Estimated Budget --</option>
                                <option value="₹5 Cr – ₹15 Cr">₹5 Cr – ₹15 Cr</option>
                                <option value="₹15 Cr – ₹50 Cr">₹15 Cr – ₹50 Cr</option>
                                <option value="₹50 Cr – ₹150 Cr">₹50 Cr – ₹150 Cr</option>
                                <option value="Above ₹150 Cr">Above ₹150 Cr</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="start_date_{location_key}">Expected Start Date</label>
                            <input type="date" id="start_date_{location_key}" name="start_date">
                        </div>

                        <div class="form-group">
                            <label for="services_required_{location_key}">Services Required</label>
                            <select id="services_required_{location_key}" name="services_required">
                                <option value="Complete Turnkey EPC (Design + Procurement + Build)">Complete Turnkey EPC (Design + Procurement + Build)</option>
                                <option value="Civil &amp; Structural Construction Only">Civil &amp; Structural Construction Only</option>
                                <option value="Balance of Plant (BoP) Execution">Balance of Plant (BoP) Execution</option>
                                <option value="MEP &amp; Interior Fitout Integration">MEP &amp; Interior Fitout Integration</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group full-width">
                        <label for="description_{location_key}">Project Requirement / Description <span class="req">*</span></label>
                        <textarea id="description_{location_key}" name="description" rows="4" required placeholder="Briefly describe your land availability, technical specs, site conditions, or special engineering scope..."></textarea>
                    </div>

                    <div class="form-group full-width">
                        <label for="message_{location_key}">Additional Message / Notes</label>
                        <input type="text" id="message_{location_key}" name="message" placeholder="Any specific statutory approval requirements, reference standards, or timeline constraints...">
                    </div>

                    <div class="consent-group">
                        <input type="checkbox" id="consent_{location_key}" name="consent" required checked>
                        <label for="consent_{location_key}">I agree to share these project parameters with AARAA Infrastructure for technical proposal evaluation. Privacy guaranteed.</label>
                    </div>

                    <div id="formFeedback_{location_key}" class="form-feedback" style="display:none;"></div>

                    <button type="submit" id="submitBtn_{location_key}" class="btn-submit-epc">
                        <i class="fa-solid fa-paper-plane"></i> Get an EPC Project Consultation
                    </button>
                </form>
            </div>
        </div>
    </section>

    <footer class="internal-links-box">
        <div class="container">
            <p style="margin-bottom: 12px; font-weight: 700; color: #fff;">Explore Related Infrastructure Services:</p>
            <a href="https://www.aaraainfrastructure.com/civil-and-pre-engineered-buildings">Civil &amp; PEB Building Solutions</a>
            <a href="https://www.aaraainfrastructure.com/commercial">Commercial Services &amp; Fitouts</a>
            <a href="https://www.aaraainfrastructure.com/completed-projects">All Completed Projects</a>
            <a href="https://www.aaraainfrastructure.com/contact-us">Contact Engineering Team</a>
        </div>
    </footer>

    <!-- Form Handler & Conversion Tracking Script -->
    <script>
    document.addEventListener("DOMContentLoaded", function() {{
        var form = document.getElementById("epcForm_{location_key}");
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
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting Project Enquiry...';

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
                    feedback.innerText = "Thank you! Your EPC Project Enquiry has been submitted successfully to aaraainfrastructure@gmail.com. (Ref ID: " + (result.submission_id || "AARAA-EPC") + "). Our senior engineering team will contact you within 24 hours.";
                    feedback.style.display = "block";
                    form.reset();

                    // Lead Conversion Event Tracking for SEO Analytics
                    if (window.gtag) {{
                        gtag("event", "generate_lead", {{
                            event_category: "EPC_Project_Enquiry",
                            event_label: "{location_name} EPC Landing Page",
                            value: 1
                        }});
                    }}
                    window.dispatchEvent(new CustomEvent("epc_lead_submitted", {{
                        detail: {{
                            location: "{location_name}",
                            submissionId: result.submission_id,
                            timestamp: new Date().toISOString()
                        }}
                    }}));

                    submitBtn.innerHTML = '<i class="fa-solid fa-check-circle"></i> Enquiry Sent Successfully!';
                }} else {{
                    feedback.className = "form-feedback error";
                    feedback.innerText = result.message || "Failed to submit enquiry. Please try again or call +91 868 100 3111 directly.";
                    feedback.style.display = "block";
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Get an EPC Project Consultation';
                }}
            }} catch (err) {{
                console.error("Submission error:", err);
                feedback.className = "form-feedback error";
                feedback.innerText = "Network connection error. Please try again or email aaraainfrastructure@gmail.com directly.";
                feedback.style.display = "block";
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Get an EPC Project Consultation';
            }}
        }});
    }});
    </script>

</body>
</html>
"""

created_count = 0
updated_count = 0

for page in PAGES_DATA:
    fpath = page["file_path"]
    os.makedirs(os.path.dirname(fpath), exist_ok=True)
    
    html_content = HTML_TEMPLATE.format(**page)
    
    existed = os.path.exists(fpath)
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(html_content)
        
    if existed:
        updated_count += 1
        print(f"ENHANCED existing page: {fpath}")
    else:
        created_count += 1
        print(f"CREATED new page: {fpath}")

print(f"\nDone! Created {created_count} new pages, Enhanced {updated_count} existing pages.")
