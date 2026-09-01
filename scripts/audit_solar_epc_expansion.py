import os
import glob
import re

LOCATIONS = [
    "chennai", "karnataka", "delhi", "mumbai", "andhra-pradesh", "tuticorin", "thoothukudi",
    "tirunelveli", "gadag", "kudligi", "amaravati", "telangana", "ncr", "tamil-nadu"
]

print("=== EXPLICIT AUDIT REPORT FOR SOLAR EPC CONTRACTOR EXPANSION ===\n")

for loc in LOCATIONS:
    files = glob.glob(f"legacy-pages/location/{loc}/*.html")
    print(f"Location: {loc.upper()} ({len(files)} existing pages)")
    for fpath in files:
        rel = os.path.relpath(fpath, "legacy-pages").replace("\\", "/")
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Extract title
        title_m = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
        title = title_m.group(1).strip() if title_m else "N/A"
        
        # Extract H1
        h1_m = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.IGNORECASE | re.DOTALL)
        h1 = h1_m.group(1).strip() if h1_m else "N/A"
        
        # Extract Canonical
        canon_m = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']', content, re.IGNORECASE)
        canonical = canon_m.group(1) if canon_m else "N/A"

        # Check if page targets solar
        is_solar = "solar" in fpath.lower() or "solar" in title.lower() or "solar" in h1.lower()
        
        print(f"  - URL: https://www.aaraainfrastructure.com/{rel.replace('.html', '')}")
        print(f"    File: {fpath}")
        print(f"    Is Solar-Focused?: {is_solar}")
        print(f"    Title: {title}")
        print(f"    H1: {h1}")
        print(f"    Canonical: {canonical}")
    if not files:
        print("  - No existing pages found for this location.")
    print("-" * 50)
