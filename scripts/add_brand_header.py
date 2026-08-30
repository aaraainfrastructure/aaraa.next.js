import os
import glob
import re

HEADER_CSS = """
        /* Top Brand Header Bar */
        .brand-topbar { background: #0b1120; border-bottom: 1px solid #1e293b; padding: 12px 0; }
        .brand-topbar-inner { display: flex; align-items: center; justify-content: space-between; }
        .brand-logo-link { display: flex; align-items: center; gap: 12px; text-decoration: none; color: #fff; font-weight: 700; font-size: 1.1rem; }
        .brand-logo-img { height: 40px; width: auto; object-fit: contain; }
        .brand-nav-links { display: flex; align-items: center; gap: 20px; }
        .topbar-link { color: #94a3b8; text-decoration: none; font-size: 0.9rem; font-weight: 600; transition: color 0.2s; }
        .topbar-link:hover { color: #fff; }
        .topbar-btn { background: var(--primary); color: #fff !important; padding: 6px 16px; border-radius: 6px; }
        .topbar-btn:hover { background: var(--primary-dark); }
        @media (max-width: 640px) { .brand-nav-links { display: none; } }
"""

HEADER_HTML = """
    <!-- Top Brand Navbar -->
    <div class="brand-topbar">
        <div class="container brand-topbar-inner">
            <a href="https://www.aaraainfrastructure.com/" class="brand-logo-link" title="AARAA Infrastructure Home">
                <img src="/logo.png" alt="AARAA Infrastructure Logo" class="brand-logo-img">
                <span class="brand-name">AARAA Infrastructure</span>
            </a>
            <div class="brand-nav-links">
                <a href="https://www.aaraainfrastructure.com/" class="topbar-link"><i class="fa-solid fa-house"></i> Main Website</a>
                <a href="https://www.aaraainfrastructure.com/completed-projects" class="topbar-link"><i class="fa-solid fa-briefcase"></i> Projects</a>
                <a href="https://www.aaraainfrastructure.com/contact-us" class="topbar-link topbar-btn"><i class="fa-solid fa-phone"></i> Contact Us</a>
            </div>
        </div>
    </div>
"""

location_dir = os.path.join(os.getcwd(), "legacy-pages", "location")
html_files = glob.glob(os.path.join(location_dir, "**", "*.html"), recursive=True)

print(f"Found {len(html_files)} HTML files in legacy-pages/location/")

updated_count = 0

for file_path in html_files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    if "brand-topbar" in content:
        continue

    # Add CSS inside <style>
    if "</style>" in content:
        content = content.replace("</style>", HEADER_CSS + "\n    </style>", 1)

    # Add Header HTML after <body>
    if "<body>" in content:
        content = content.replace("<body>", "<body>\n" + HEADER_HTML, 1)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

    updated_count += 1
    print(f"Updated header in: {os.path.relpath(file_path)}")

print(f"Successfully updated brand header in {updated_count} files.")
