import os

NEW_INSTITUTIONAL_URLS = [
    "https://www.aaraainfrastructure.com/location/chennai/institutional-contractor",
    "https://www.aaraainfrastructure.com/location/karnataka/institutional-contractor",
    "https://www.aaraainfrastructure.com/location/delhi/institutional-contractor",
    "https://www.aaraainfrastructure.com/location/mumbai/institutional-contractor",
    "https://www.aaraainfrastructure.com/location/andhra-pradesh/institutional-contractor",
    "https://www.aaraainfrastructure.com/location/thoothukudi/institutional-contractor",
    "https://www.aaraainfrastructure.com/location/tirunelveli/institutional-contractor",
    "https://www.aaraainfrastructure.com/location/gadag/institutional-contractor",
    "https://www.aaraainfrastructure.com/location/kudligi/institutional-contractor",
    "https://www.aaraainfrastructure.com/location/amaravati/institutional-contractor",
    "https://www.aaraainfrastructure.com/location/telangana/institutional-contractor",
    "https://www.aaraainfrastructure.com/location/ncr/institutional-contractor",
    "https://www.aaraainfrastructure.com/location/tamil-nadu/institutional-contractor"
]

sitemap_path = "public/sitemap.xml"

with open(sitemap_path, "r", encoding="utf-8") as f:
    content = f.read()

added_count = 0
new_url_blocks = []

for url in NEW_INSTITUTIONAL_URLS:
    if f"<loc>{url}</loc>" not in content:
        url_block = f"""  <url>
    <loc>{url}</loc>
    <lastmod>2026-09-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>"""
        new_url_blocks.append(url_block)
        added_count += 1

if new_url_blocks:
    insertion = "\n" + "\n".join(new_url_blocks) + "\n</urlset>"
    content = content.replace("</urlset>", insertion)
    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Added {added_count} new canonical Institutional URLs to public/sitemap.xml")
else:
    print("All Institutional URLs already exist in public/sitemap.xml")

